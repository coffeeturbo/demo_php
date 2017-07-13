<?php
namespace OAuthBundle\Event;


use AccountBundle\Entity\Account;
use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use Symfony\Component\EventDispatcher\Event;

class OAuthRegisteredEvent extends Event
{
    const NAME = "oauth.registered";
    
    private $response;
    private $account;
    
    function __construct(UserResponseInterface $response, Account $account)
    {
        $this->response = $response;
        $this->account = $account;
    }

    public function getResponse(): UserResponseInterface
    {
        return $this->response;
    }

    public function getAccount(): Account
    {
        return $this->account;
    }
}