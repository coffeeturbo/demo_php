<?php

namespace AccountBundle\EventListener;

use AccountBundle\Event\AccountCreatedEvent;
use AccountBundle\Repository\AccountRepository;
use ProfileBundle\Event\ProfileCreatedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class RoleListener implements EventSubscriberInterface
{
    private $accountRepository;

    function __construct(AccountRepository $accountRepository)
    {
        $this->accountRepository = $accountRepository;
    }

    static public function getSubscribedEvents()
    {
        return [
            AccountCreatedEvent::NAME => 'addRoleCreated', 
            ProfileCreatedEvent::NAME => 'addRoleRegistered'
        ];
    }
    
    public function addRoleCreated(AccountCreatedEvent $event)
    {
        $account = $event->getAccount();
        $account->addRole($account::ROLE_CREATED);
        $this->accountRepository->save($account);
    }

    public function addRoleRegistered(ProfileCreatedEvent $event)
    {
        $account = $event->getProfile()->getAccount();
        $account->addRole($account::ROLE_REGISTERED);
        $this->accountRepository->save($account);
    }
}