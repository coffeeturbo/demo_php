<?php

namespace OAuthBundle\Handler;

use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler as LexikAuthenticationSuccessHandler;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Router;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class OAuthSuccessHandler extends LexikAuthenticationSuccessHandler
{
    private $router;

    public function __construct(JWTManager $jwtManager, EventDispatcherInterface $dispatcher, Router $router)
    {
        parent::__construct($jwtManager, $dispatcher);
        $this->router = $router;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        $response = parent::onAuthenticationSuccess($request, $token);
        return new RedirectResponse($this->router->generate('get_token', json_decode($response->getContent(), true)));
    }
}