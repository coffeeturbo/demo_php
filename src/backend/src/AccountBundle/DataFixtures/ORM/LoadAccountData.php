<?php

namespace AccountBundle\DataFixtures\ORM;

use AccountBundle\Entity\Account;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use FOS\UserBundle\Model\UserManager;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadAccountData extends AbstractFixture
    implements FixtureInterface, ContainerAwareInterface, OrderedFixtureInterface
{

    static protected $accountsData = [
        'success-account' => [
            "email" => "testuser1@domain.com",
            "password" => "4zFBLC32",
            "roles" => [],
            'reference' => 'success-account'
        ],

        'success-account-2' => [
            "email" => "testuser2@domain.com",
            "password" => "4zFBLC32",
            "roles" => [],
            'reference' => 'success-account-2'
        ]
    ];

    protected $accounts;


    /**
     * @var ContainerInterface
     */
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {
        /** @var UserManager $userManager */
        $userManager = $this->container->get('fos_user.user_manager');

        foreach (self::$accountsData as $data) {
            $account = $userManager->createUser();
            $account->setEnabled(true)
                ->setPlainPassword($data['password'])
                ->setUsername($data['email'])
                ->setEmail($data['email'])
                ->setRoles($data['roles']);

            if (isset($data['reference'])) {
                $this->addAccountReference($data['reference'], $account);
            }

            $userManager->updateUser($account);
        }
    }


    static public function getAccountDataByReference($ref)
    {
        return self::$accountsData[$ref] ?? self::$accountsData[$ref];
    }

    public function getAccountByReference($ref): Account
    {
        return $this->accounts[$ref] ?? $this->accounts[$ref];
    }

    public function addAccountReference($ref, $accoount)
    {
        if (isset($this->accounts[$ref])) throw new Exception("account already exists");

        $this->accounts[$ref] = $accoount;
    }

    public function getOrder()
    {
        return 10;
    }
}