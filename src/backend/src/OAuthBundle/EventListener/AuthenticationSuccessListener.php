<?php

namespace OAuthBundle\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Router;

class AuthenticationSuccessListener
{
    private $router;
    
    function __construct(Router $router)
    {
        $this->router = $router; 
    }

    public function redirectOnSuccess(AuthenticationSuccessEvent $event)
    {
        return new RedirectResponse($this->router->generate('get_token', $event->getData()));
    }
}