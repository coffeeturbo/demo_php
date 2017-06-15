<?php
namespace AccountBundle\EventListener;

use AccountBundle\Repository\AccountRepository;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Event\ProfileEvent;
use ProfileBundle\Event\ProfileEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class AddAccountRoleRegisteredListener implements EventSubscriberInterface
{
    private $accountRepository;

    public function __construct(AccountRepository $accountRepository)
    {
        $this->accountRepository = $accountRepository;
    }

    static public function getSubscribedEvents()
    {
        return [
            ProfileEvents::PROFILE_CREATED => 'onNewProfile'
        ];
    }

    public function onNewProfile(ProfileEvent $event)
    {
        $this->addAccountRoleRegisteredRole($event->getProfile());
    }

    protected function addAccountRoleRegisteredRole(Profile $profile)
    {
        $account = $profile->getAccount();
        $account->addRole($account::ROLE_REGISTERED);
        $this->accountRepository->save($account);
    }
}