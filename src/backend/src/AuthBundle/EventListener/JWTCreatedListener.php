<?php

namespace AuthBundle\EventListener;

use AuthBundle\Entity\Account;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Service\ProfileService;

class JWTCreatedListener
{
    private $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function onJWTCreated(JWTCreatedEvent $event)
    {
        /** @var Account $account */
        $account = $event->getUser();

        /**
         * @DOTO Use getCurrentProfile instead getAccountProfiles, when implemented
         * @var Profile[] $profiles 
         */
        $profiles = $this->profileService->getAccountProfiles($account->getId());

        if(!!$profiles) {
            return;
        }

        $profile = $profiles[0];

        $event->setData(array_merge(
            $event->getData(), [
                'profile_id' => $profile->getId()
            ]
        ));
    }
}