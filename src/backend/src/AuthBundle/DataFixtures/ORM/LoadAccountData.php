<?php
namespace AuthBundle\DataFixtures\ORM;

use AuthBundle\Entity\Account;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use FOS\UserBundle\Model\UserManager;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadAccountData extends AbstractFixture implements FixtureInterface, ContainerAwareInterface
{

    protected $accountsData = [
        'success-account' =>
            [
                "email" => "testuser1@domain.com", "password"=>"4zFBLC", "roles"=>[], 'reference' => 'success-account'
            ],
    ];

    protected $accounts;



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

            if(isset($data['reference'])){
                $this->addAccountReference($data['reference'], $account);
            }

            $userManager->updateUser($account);
        }
    }


    public function getAccountDataByReference($ref)
    {
        return $this->accountsData[$ref] ?? $this->accounts[$ref];
    }
    public function getAccountByReference($ref): Account
    {
        return $this->accounts[$ref] ?? $this->accounts[$ref];
    }

    public function addAccountReference($ref, $accoount )
    {
        if(isset($this->accounts[$ref])) throw new Exception("account already exists");

        $this->accounts[$ref] = $accoount;
    }

}

