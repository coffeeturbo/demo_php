<?php
namespace ProfileBundle\Service;

use AccountBundle\Entity\Account;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Entity\Profile\Gender;
use ProfileBundle\Entity\Profile\Gender\NoneGender;
use ProfileBundle\Event\ProfileEvent;
use ProfileBundle\Event\ProfileEvents;
use ProfileBundle\Exception\InvalidBirthDateException;
use ProfileBundle\Exception\ProfilesLimitException;
use ProfileBundle\Repository\ProfileRepository;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileService
{
    private $profileRepository;
    private $eventDispatcher;
    private $profilesLimit;
    private $minAge;
    private $maxAge;

    public function __construct(
        ProfileRepository $profileRepository, 
        EventDispatcherInterface $eventDispatcher, 
        int $profilesLimit,
        int $minAge,
        int $maxAge
    ) {
        $this->profileRepository = $profileRepository;
        $this->eventDispatcher = $eventDispatcher;
        $this->profilesLimit = $profilesLimit;
        $this->minAge = $minAge;
        $this->maxAge = $maxAge;
    }

    public function createProfileFromArray(array $request, Account $account, bool $persist = false): Profile
    {
        $profile = new Profile();
        $profile->setAccount($account)
            ->setName($request['name'] ?? null)
            ->setAlias($request['alias'] ?? null)
            ->setGender(Gender::createFromStringCode($request['gender'] ?? NoneGender::STRING_CODE))
            ->setBirthDate(isset($request['birth_date']) ? \DateTime::createFromFormat(Profile::BIRTH_DATE_FORMAT, $request['birth_date']) : null);
        ;

        if($persist) {
            $this->createProfile($profile);
        }

        return $profile;
    }

    public function createProfile(Profile $profile): Profile
    {
        // проверяем есть ли у акккаунта уже профайл
        $profiles = $this->getAccountProfiles($profile->getAccount()->getId());

        if(count($profiles) >= $this->profilesLimit) throw new ProfilesLimitException("The limit of account profiles has been Exceeded");

        // проверяем валидность даты рождения
        if($profile->getBirthDate() instanceof \DateTime) {
            $this->validateBirthDate($profile->getBirthDate());
        }
        
        $this->saveProfile($profile);

        $this->eventDispatcher->dispatch(
            ProfileEvents::PROFILE_CREATED,
            new ProfileEvent($profile)
        );

        return $profile;
    }

    public function updateProfileFromArray(Profile $profile, Account $account, bool $persist = false, array $updateData): Profile
    {

        // todo проверяем принадлежит ли профиль этому аккаунту либо является ли профиль админом
        if(($profile->getAccount()->getId() !== $account->getId()) ){
            throw new AccessDeniedException(sprintf("account %s has no access to modify profile %s",
                $profile->getAccount()->getId(),
                $profile->getId()
            ));
        }

        $profile
            ->setName($updateData['name'] ?? $profile->getName())
            ->setAlias($updateData['alias'] ?? $profile->getAlias())
            ->setGender(
                isset($updateData['gender']) ?
                Gender::createFromStringCode($updateData['gender']) : $profile->getGender()

            )
            ->setBirthDate(
                isset($updateData['birth_date']) ?
                \DateTime::createFromFormat(Profile::BIRTH_DATE_FORMAT, $updateData['birth_date']):
                    $profile->getBirthDate()
            );

        if($persist) $this->saveProfile($profile);

        return $profile;
    }


    public function saveProfile(Profile $profile): Profile
    {
        return $this->profileRepository->saveProfile($profile);
    }

    public function getAccountProfiles(int $accountId){
        return $this->profileRepository->getAccountProfiles($accountId);
    }

    public function getProfileByIdRequest(Request $request)
    {
        $json_request = json_decode($request->getContent());

        return $this->getProfileById($json_request->profile_id);
    }

    public function getProfileById($id)
    {
        $profile = $this->profileRepository->find($id);
        if(is_null($profile)) throw new NotFoundHttpException(sprintf('Profile %s not found', $id));
        return $profile;
    }

    public function deleteProfile(Profile $profile)
    {
        return $this->profileRepository->deleteProfile($profile);
    }
    
    public function validateBirthDate(\DateTime $birthday) {
        if ($birthday instanceof \DateTime) {
            $age = $birthday->diff(new \DateTime())->y;

            if ($age < $this->minAge) {
                throw new InvalidBirthDateException(sprintf("Unacceptable age '%s': yonger then ", $age, $this->minAge));
            }

            if ($age > $this->maxAge) {
                throw new InvalidBirthDateException(sprintf("Unacceptable age '%s': older then %s", $age, $this->maxAge));
            }
        }
    }
}