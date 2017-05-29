<?php
namespace ProfileBundle\Service;

use AuthBundle\Entity\Account;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Entity\Profile\Gender;
use ProfileBundle\Repository\ProfileRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileService
{

    private $profileRepository;

    public function __construct(ProfileRepository $profileRepository)
    {
        $this->profileRepository = $profileRepository;
    }

    public function createProfileFromRequest(Request $request, Account $account): Profile
    {
        $json_request = json_decode($request->getContent());

        $profile = new Profile();
        $profile->setAccount($account)
            ->setName($json_request->name)
            ->setGender(Gender::createFromIntCode($json_request->gender))
            ->setBirthDate(\DateTime::createFromFormat(Profile::BIRTH_DATE_FORMAT, $json_request->birthDate))
        ;

        return $profile;
    }

    public function saveProfile(Profile $profile): Profile
    {
        return $this->profileRepository->saveProfile($profile);
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