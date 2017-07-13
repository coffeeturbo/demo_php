<?php

namespace AccountBundle\Service;


use AccountBundle\Entity\Account;
use AccountBundle\Event\AccountCreatedEvent;
use AccountBundle\Repository\AccountRepository;
use FOS\UserBundle\Model\UserManager;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class AccountService
{
    /**
     * @var AccountRepository
     */
    private $userManager;
    private $eventDispatcher;

    function __construct(
        UserManager $userManager, 
        EventDispatcherInterface $eventDispatcher
    ) {
        $this->userManager = $userManager;
        $this->eventDispatcher = $eventDispatcher;
    }

    public function createFromArray($data, bool $persist = true) : Account
    {
        $userManager = $this->userManager;

        /** @var Account $account */
        $account = $userManager->createUser();
        $account
            ->setEnabled(true)
            ->setUsername($data['email'])
            ->setEmail($data['email'])
        ;

        if(isset($data['password'])) {
            $account->setPlainPassword($data['password']);
        } else {
            $account->setPassword("");
        }

        if ($persist) {
            $this->create($account);
        }

        return $account;        
    }
    
    public function create(Account $account) : Account
    {
        $this->userManager->updateUser($account);

        $this->eventDispatcher->dispatch(
            AccountCreatedEvent::NAME, 
            new AccountCreatedEvent($account)
        );
        
        return $account;
    }
}