<?php

namespace OAuthBundle\Security\Core\Account;

use AccountBundle\Entity\Account;
use AccountBundle\Service\AccountService;
use FOS\UserBundle\Model\UserManagerInterface;
use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use HWI\Bundle\OAuthBundle\Security\Core\Exception\AccountNotLinkedException;
use HWI\Bundle\OAuthBundle\Security\Core\User\FOSUBUserProvider;
use OAuthBundle\Event\OAuthRegisteredEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class OAuthAccountProvider extends FOSUBUserProvider
{
    private $eventDispatcher;
    private $accountService;

    public function __construct(
        EventDispatcherInterface $eventDispatcher,
        AccountService $accountService,
        UserManagerInterface $userManager, 
        array $properties)
    {
        parent::__construct($userManager, $properties);
        $this->eventDispatcher = $eventDispatcher;
        $this->accountService = $accountService;
    }


    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
        try {
            // Смотрим привязан ли аккаунт (почта)?
            $account = parent::loadUserByOAuthUserResponse($response);
        } catch (AccountNotLinkedException $e) {
            // Если не привязан возможно данная почта уже зарегестрирована
            $account = $this->userManager->findUserByUsernameOrEmail($response->getEmail()); 
            
            if(!$account instanceof Account) {
                $account = $this->accountService->createFromArray([
                    "email" => $response->getEmail()
                ], false);
            }

            $this->connect($account, $response);

            $this->eventDispatcher->dispatch(
                OAuthRegisteredEvent::NAME,
                new OAuthRegisteredEvent($response, $account)
            );
        }

        return $account;
    }
}