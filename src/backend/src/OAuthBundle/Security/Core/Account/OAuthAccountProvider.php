<?php

namespace OAuthBundle\Security\Core\Account;

use AccountBundle\Entity\Account;
use FOS\UserBundle\Model\User;
use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use HWI\Bundle\OAuthBundle\Security\Core\Exception\AccountNotLinkedException;
use HWI\Bundle\OAuthBundle\Security\Core\User\FOSUBUserProvider;

class OAuthAccountProvider extends FOSUBUserProvider
{
    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
        try {
            $user = parent::loadUserByOAuthUserResponse($response);
        } catch (AccountNotLinkedException $e) {
            $user = $this->userManager->findUserByUsernameOrEmail($response->getEmail());
            if(!$user instanceof User) {
                $user = $this->userManager->createUser();
                $user->setEnabled(true);
                $user->setUsername($response->getEmail());
                $user->setEmail($response->getEmail());
                $user->setRoles([Account::ROLE_CREATED]);
                $user->setPassword('');
            }
            $this->connect($user, $response);
        }

        return $user;
    }
}