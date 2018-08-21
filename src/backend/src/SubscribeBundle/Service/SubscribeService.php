<?php
namespace SubscribeBundle\Service;

use ProfileBundle\Service\ProfileService;
use SubscribeBundle\Entity\Subscribe;
use SubscribeBundle\Entity\SubscribeType\SubscribeProfileType;
use SubscribeBundle\Event\SubscribeEvent;
use SubscribeBundle\Repository\SubscribeRepository;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SubscribeService
{
    private $profileService;
    private $subscribeRepository;
    private $eventDispatcher;


    public function __construct(ProfileService $profileService, SubscribeRepository $repository,
    EventDispatcherInterface $dispatcher)
    {
        $this->profileService = $profileService;
        $this->subscribeRepository = $repository;
        $this->eventDispatcher = $dispatcher;
    }


    public function profileSubscribe(int $profileId)
    {
        $profile = $this->profileService->getCurrentProfile();
        $targetProfile = $this->profileService->getProfileRepository()->find($profileId);

        if(is_null($targetProfile)) throw new NotFoundHttpException("Profile $profileId not found");

        // ищим существующий

        $subscribe = new Subscribe(new SubscribeProfileType(), $profile, $profileId);

        $dub = $this->subscribeRepository->isExistsSubscribe($subscribe);
        if ($dub) throw new ConflictHttpException('Subscribe already Exists');

        $this->subscribeRepository->create($subscribe);

        $this->eventDispatcher->dispatch(
            SubscribeEvent::SUBSCRIBE_CREATED,
            new SubscribeEvent($subscribe)

        );

        return $subscribe;
    }

    public function profileUnSubscribe(int $profileId)
    {
        $profile = $this->profileService->getCurrentProfile();
        $targetProfile = $this->profileService->getProfileRepository()->find($profileId);

        if(is_null($targetProfile)) throw new NotFoundHttpException("Profile $profileId not found");

        // ищим существующий
        $subscribe = new Subscribe(new SubscribeProfileType(), $profile, $profileId);

        $existsSubscribe = $this->subscribeRepository->isExistsSubscribe($subscribe);
        dump($existsSubscribe);
        if(is_null($existsSubscribe)) throw new NotFoundHttpException("subscribe not found ");

        $this->subscribeRepository->delete($existsSubscribe);


        $this->eventDispatcher->dispatch(
            SubscribeEvent::SUBSCRIBE_DELETED,
            new SubscribeEvent($subscribe)

        );
        return true;
    }

    public function listSubscribes()
    {
        $profile = $this->profileService->getCurrentProfile();

        return $this->subscribeRepository->findBy(['profile' => $profile]);
    }

    public function updateSubscribedTarget(Subscribe $subscribe)
    {
        switch($subscribe->getType()->getIntCode()){
            case SubscribeProfileType::INT_CODE:{
                dump($subscribe);
                $profileId = $subscribe->getTargetId();
                $profile= $this->profileService->getById($profileId);
                $profile->increaseSubscribers();
                $this->profileService->save($profile);
            }
        }
    }

    public function updateUnSubscribedTarget(Subscribe $subscribe)
    {
        switch($subscribe->getType()->getIntCode()){
            case SubscribeProfileType::INT_CODE:{
                dump($subscribe);
                $profileId = $subscribe->getTargetId();
                $profile= $this->profileService->getById($profileId);
                $profile->decreaseSubscribers();
                $this->profileService->save($profile);
            }
        }
    }
}