<?php

namespace AuthBundle\Service;


use AccountBundle\Entity\Account;
use AccountBundle\Repository\AccountRepository;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthService
{
    private $accountRepository;
    private $account;
    private $passwordEncoder;
    
    function __construct(
        AccountRepository $accountRepository,
        UserPasswordEncoder $passwordEncoder,
        TokenStorage $tokenStorage
    ) {
        $token = $tokenStorage->getToken();
        
        if($token instanceof TokenInterface) {
            if($token->getUser() instanceof UserInterface){
                $this->account = $token->getUser();
            }
        }

        $this->accountRepository = $accountRepository;
        $this->passwordEncoder = $passwordEncoder;
    }

    public function getAccount(): ?Account
    {
        return $this->account;
    }


    public function validateCredentials($username, $password): Account
    {
        /** @var Account $account */
        $account = $this->accountRepository
            ->findOneBy(['username' => $username]);

        if (!$account instanceof Account)
            throw new UnauthorizedHttpException(null, "User not found");

        if (!$this->passwordEncoder->isPasswordValid($account, $password))
            throw new UnauthorizedHttpException(null, "Wrong password");

        return $account;
    }    
}