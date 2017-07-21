<?php

namespace ProfileBundle\Service;

use AccountBundle\Entity\Account;
use AuthBundle\Service\AuthService;
use AvatarBundle\Parameter\UploadedImageParameter;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Entity\Profile\Gender\NoneGender;
use ProfileBundle\Event\ProfileCreatedEvent;
use ProfileBundle\Repository\ProfileRepository;
use ProfileBundle\Service\Strategy\ProfileAvatarStrategy;
use ProfileBundle\Service\Strategy\ProfileBackdropStrategy;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class ProfileService
{
    private $profileRepository;
    private $authService;
    private $eventDispatcher;
    private $profilesLimit;

    /** @var  ContainerInterface */
    private $container;
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function __construct(
        ProfileRepository $profileRepository,
        AuthService $authService,
        EventDispatcherInterface $eventDispatcher,
        int $profilesLimit
    ) {
        $this->profileRepository = $profileRepository;
        $this->authService = $authService;
        $this->eventDispatcher = $eventDispatcher;
        $this->profilesLimit = $profilesLimit;
    }

    public function getById($id): Profile
    {
        return $this->profileRepository->getById($id);
    }

    public function getByAlias($alias): Profile
    {
        return $this->profileRepository->getByAlias($alias);
    }

    public function getByAccountId(int $accountId): ?array
    {
        return $this->profileRepository->getByAccountId($accountId);
    }

    public function createFromArray(array $request, Account $account, bool $persist = false): Profile
    {
        $profile = new Profile();
        $profile->setAccount($account)
            ->setName($request['name'])
            ->setAlias($request['alias'] ?? null)
            ->setGender($request['gender'] ?? new NoneGender())
            ->setBirthDate($request['birth_date'] ?? null)
        ;

        if ($persist) {
            $this->create($profile);
        }

        return $profile;
    }

    public function create(Profile $profile): Profile
    {
        $profiles = $this->getByAccountId($profile->getAccount()->getId());

        if(count($profiles) >= $this->profilesLimit) {
            throw new AccessDeniedHttpException(
                sprintf("The maximum number of profiles allowed in your account is %s", $this->profilesLimit)
            );
        }

        $this->save($profile);
        $this->eventDispatcher->dispatch(ProfileCreatedEvent::NAME, new ProfileCreatedEvent($profile));

        return $profile;
    }

    public function update(Profile $profile): Profile
    {
        $account = $this->authService->getAccount();

        if($profile->getAccount()->getId() !== $account->getId()) {
            throw new AccessDeniedHttpException("Account has no access for profile changes");
        }

        $this->save($profile);

        return $profile;
    }
    
    public function save(Profile $profile): Profile {
        return $this->profileRepository->save($profile);
    }

    public function uploadAvatar(Profile $profile, UploadedImageParameter $imageParameter)
    {

        $strategy = $this->container->get('profile.service.strategy.avatar_strategy');

        $strategy->setEntity($profile);

        $strategy->generateImage($profile, $imageParameter);


        $this->profileRepository->save($profile);
    }

    public function deleteAvatar(Profile $profile): Profile
    {
        $this->container->get('avatar.service')->deleteImage($profile);

        $this->container->get('profile.service')->save($profile);

        return $profile;
    }

    public function uploadBackdrop(Profile $profile, UploadedImageParameter $parameter): Profile
    {
        $absolutePath = $this->container->getParameter('profile.backdrop.absolute_path');
        $webPath = $this->container->getParameter('profile.backdrop.web_path');

        $backdropStrategy = new ProfileBackdropStrategy($profile, $absolutePath, $webPath);

        $this->container->get('profile.backdrop.service')->uploadImage($parameter, $backdropStrategy);
        $this->profileRepository->save($profile);

        return $profile;
    }


    public function deleteBackdrop(Profile $profile)
    {

    }

    public function markDelete(Profile $profile)
    {
        // todo is_deleted
    }

    public function delete(Profile $profile)
    {
        return $this->profileRepository->delete($profile);
    }
}