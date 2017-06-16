<?php
namespace AccountBundle\Event;

use AccountBundle\Entity\Account;
use Symfony\Component\EventDispatcher\Event;

class AccountCreatedEvent extends Event
{
    const NAME = "account.created";
    
    private $account;
    
    function __construct(Account $account)
    {
        $this->account = $account;
    }

    public function getAccount(): Account
    {
        return $this->account;
    }
}