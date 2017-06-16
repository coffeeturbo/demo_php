<?php

namespace AccountBundle\Service;


use AccountBundle\Entity\Account;
use AccountBundle\Event\AccountCreatedEvent;
use AccountBundle\Repository\AccountRepository;
use FOS\UserBundle\Model\UserManager;
use ProfileBundle\Service\ProfileService;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;

class AccountService
{
    /**
     * @var AccountRepository
     */
    private $accountRepository;
    private $userManager;
    private $profileService;
    private $eventDispatcher;
    private $passwordEncoder;

    function __construct(
        AccountRepository $accountRepository, 
        UserManager $userManager, 
        ProfileService $profileService, 
        EventDispatcherInterface $eventDispatcher,
        UserPasswordEncoder $passwordEncoder
    ) {
        $this->accountRepository = $accountRepository;
        $this->userManager = $userManager;
        $this->profileService = $profileService;
        $this->eventDispatcher = $eventDispatcher;
        $this->passwordEncoder = $passwordEncoder;
    }

    public function createFromArray($data) : Account
    {
        $userManager = $this->userManager;

        /** @var Account $account */
        $account = $userManager->createUser();
        $account
            ->setEnabled(true)
            ->setPlainPassword($data['password'])
            ->setUsername($data['email'])
            ->setEmail($data['email'])
        ;

        return $this->create($account);
    }
    
    public function create(Account $account) : Account
    {
        $this->userManager->updateUser($account);

        $this->eventDispatcher->dispatch(
            AccountCreatedEvent::NAME, 
            new AccountCreatedEvent($account)
        );
        
        return $account;
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