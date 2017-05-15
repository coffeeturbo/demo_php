<?php
namespace AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use FOS\UserBundle\Model\UserManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadAccountData implements FixtureInterface, ContainerAwareInterface
{

    /**
     * @var ContainerInterface
     */
    private $container;
    
    public function setContainer(ContainerInterface $container = null) {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {
        $data = [
            ["email"=>"testuser1@domain.com","password"=>"4zFBLC", "roles"=>[]],
            ["email"=>"testuser2@domain.com","password"=>"UjqjCB", "roles"=>[]],
            ["email"=>"testuser3@domain.com","password"=>"GhuxMb", "roles"=>[]]
        ];

        /** @var UserManager $userManager */
        $userManager = $this->container->get('fos_user.user_manager');

        foreach ($data as $row) {
            $account = $userManager->createUser();
            $account->setEnabled(true);
            $account->setPlainPassword($row['password']);
            $account->setUsername($row['email']);
            $account->setEmail($row['email']);
            $account->setRoles($row['roles']);
            $userManager->updateUser($account);
        }
    }
}

