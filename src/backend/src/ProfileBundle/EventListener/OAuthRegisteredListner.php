<?php

namespace ProfileBundle\EventListener;

use HWI\Bundle\OAuthBundle\OAuth\ResourceOwner\FacebookResourceOwner;
use HWI\Bundle\OAuthBundle\OAuth\ResourceOwner\VkontakteResourceOwner;
use OAuthBundle\Event\OAuthRegisteredEvent;
use ProfileBundle\Service\ProfileService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class OAuthRegisteredListner implements EventSubscriberInterface
{
    private $profileService;

    function __construct(ProfileService $profileService)
    {
        $this->profileService= $profileService;
    }

    static public function getSubscribedEvents()
    {
        return [
            OAuthRegisteredEvent::NAME => 'createProfile', 
        ];
    }
    
    public function createProfile(OAuthRegisteredEvent $event)
    {
        $response = $event->getResponse();
        $account = $event->getAccount();
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
        $this->profileService->createFromArray($profileData, $account, true);
    }
}