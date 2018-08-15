<?php
namespace SubscribeBundle\Service;

use ProfileBundle\Service\ProfileService;
use SubscribeBundle\Entity\Subscribe;
use SubscribeBundle\Entity\SubscribeType\SubscribeProfileType;
use SubscribeBundle\Repository\SubscribeRepository;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SubscribeService
{
    private $profileService;
    private $subscribeRepository;


    public function __construct(ProfileService $profileService, SubscribeRepository $repository)
    {
        $this->profileService = $profileService;
        $this->subscribeRepository = $repository;
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

        return true;
    }
}