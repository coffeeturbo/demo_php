<?php

namespace AuthBundle\EventListener;

use AccountBundle\Entity\Account;
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

        if(count($profiles) == 0) {
            return;
        }

        $profile = $profiles[0];

        $event->setData(array_merge(
            $event->getData(), [
                'profile_id' => $profile->getId(),
                'profile_alias' => $profile->getAlias()
            ]
        ));
    }
}