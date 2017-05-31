<?php

namespace AcmeBundle\Security;

use AuthBundle\Entity\Account;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\JWTUserToken;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Thruway\Authentication\AbstractAuthProviderClient;

class JwtAuthProvider extends AbstractAuthProviderClient {
    private $doctrine;
    private $jwtManager;
    
    public function __construct(Array $authRealms, JWTManager $jwtManager, Registry $doctrine) {
        parent::__construct($authRealms);
        $this->doctrine = $doctrine;
        $this->jwtManager = $jwtManager;
    }

    public function getMethodName() {
        return 'jwt';
    }

    public function processAuthenticate($requestToken, $extra = null)
    {
        try {
            $token = new JWTUserToken();
            $token->setRawToken($requestToken);
            $payload = $this->jwtManager->decode($token);

            $account = $this->doctrine
                ->getRepository('AuthBundle:Account')
                ->findOneBy(['username' => $payload['username']]);

            if (!$account instanceof Account)
                throw new UnauthorizedHttpException(null, "User not found");
            
            if(!$account->isEnabled() || !$account->isAccountNonExpired() || !$account->isAccountNonLocked() || !$account->isCredentialsNonExpired())
                throw new UnauthorizedHttpException(null, "User blocked");
            
            return ["SUCCESS", (object)["authid" => $payload['username']]];
            
        } catch(JWTDecodeFailureException | UnauthorizedHttpException $e) {
            return ["FAILURE"];
        }
    }
}