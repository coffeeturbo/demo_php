<?php
namespace AuthBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use FOS\UserBundle\Model\UserManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadAccountData implements FixtureInterface, ContainerAwareInterface
{

    public $accountsData = [
        ["email"=>"testuser1@domain.com","password"=>"4zFBLC", "roles"=>[]],
        ["email"=>"testuser2@domain.com","password"=>"UjqjCB", "roles"=>[]],
        ["email"=>"testuser3@domain.com","password"=>"GhuxMb", "roles"=>[]]
    ];
    
    /**
     * @var ContainerInterface
     */
    private $container;
    
    public function setContainer(ContainerInterface $container = null) {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {
        /** @var UserManager $userManager */
        $userManager = $this->container->get('fos_user.user_manager');

        foreach ($this->accountsData as $data) {
            $account = $userManager->createUser();
            $account->setEnabled(true);
            $account->setPlainPassword($data['password']);
            $account->setUsername($data['email']);
            $account->setEmail($data['email']);
            $account->setRoles($data['roles']);
            $userManager->updateUser($account);
        }
    }
}

