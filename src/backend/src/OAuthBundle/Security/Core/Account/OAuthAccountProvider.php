<?php

namespace OAuthBundle\Security\Core\Account;

use AccountBundle\Entity\Account;
use FOS\UserBundle\Model\User;
use FOS\UserBundle\Model\UserManagerInterface;
use HWI\Bundle\OAuthBundle\OAuth\ResourceOwner\FacebookResourceOwner;
use HWI\Bundle\OAuthBundle\OAuth\ResourceOwner\VkontakteResourceOwner;
use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use HWI\Bundle\OAuthBundle\Security\Core\Exception\AccountNotLinkedException;
use HWI\Bundle\OAuthBundle\Security\Core\User\FOSUBUserProvider;
use ProfileBundle\Service\ProfileService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class OAuthAccountProvider extends FOSUBUserProvider
{
    private $profileService;
    
    public function __construct(ProfileService $profileService, UserManagerInterface $userManager, array $properties)
    {
        parent::__construct($userManager, $properties);
        $this->profileService = $profileService;
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
                $account = $this->userManager->createUser();
                $account->setEnabled(true);
                $account->setUsername($response->getEmail());
                $account->setEmail($response->getEmail());
                $account->setRoles([Account::ROLE_CREATED]);
                $account->setPassword('');
            }

            $profileData = [
                "name" => $response->getLastName() . " " . $response->getFirstName()
            ];
            
            if($response->getResourceOwner() instanceof FacebookResourceOwner) {
                sprintf("http://graph.facebook.com/%s/picture?width=7000&height=7000", $response->getUsername()); 
            };

            if($response->getResourceOwner() instanceof VkontakteResourceOwner) {
                // Try set alias from vk
                if(!empty($response->getResponse()["response"][0]["screen_name"])) {
                    $alias = $response->getResponse()["response"][0]["screen_name"];
                    try {
                        $this->profileService->getByAlias($alias);
                    } catch (NotFoundHttpException $e) {
                        $profileData["alias"] = $alias;
                    }
                }
            }
            $this->connect($account, $response);
            $this->profileService->createFromArray($profileData, $account, true);
        }

        return $account;
    }
}