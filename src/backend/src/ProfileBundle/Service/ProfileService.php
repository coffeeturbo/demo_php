<?php
namespace ProfileBundle\Service;

use AuthBundle\Entity\Account;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Entity\Profile\Gender;
use ProfileBundle\Exception\ProfilesLimitException;
use ProfileBundle\Repository\ProfileRepository;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileService
{
    const PROFILES_LIMIT = 1;

    private $profileRepository;

    public function __construct(ProfileRepository $profileRepository)
    {
        $this->profileRepository = $profileRepository;
    }

    public function createProfileFromArray(array $request, Account $account, bool $persist = false): Profile
    {
        $profile = new Profile();
        $profile->setAccount($account)
            ->setFirstName($request['first_name'] ?? null)
            ->setLastName($request['last_name'] ?? null)
            ->setPatronymic($request['patronymic'] ?? null)
            ->setAlias($request['alias'] ?? null)
            ->setNickName($request['nickname'] ?? null)
            ->setGender(Gender::createFromStringCode($request['gender']))
            ->setBirthDate(\DateTime::createFromFormat(Profile::BIRTH_DATE_FORMAT, $request['birth_date']));
        ;
        if($persist) $this->saveProfile($profile);

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
            ->setFirstName($updateData['first_name' ?? $profile->getFirstName()])
            ->setLastName($updateData['last_name'] ?? $profile->getLastName())
            ->setPatronymic($updateData['patronymic'] ?? $profile->getPatronymic())
            ->setAlias($updateData['alias'] ?? $profile->getAlias())
            ->setNickName($updateData['nickname'] ?? $profile->getNickName())
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
        // проверяем есть ли у акккаунта уже профайл
        $profiles = $this->getAccountProfiles($profile->getAccount()->getId());

        if(count($profiles) >= self::PROFILES_LIMIT) throw new ProfilesLimitException("The limit of account profiles has been Exceeded");

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
}