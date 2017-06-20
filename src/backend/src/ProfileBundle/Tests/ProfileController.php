<?php
namespace ProfileBundle\Tests;

use AppBundle\Tests\BaseTestSetup;
use AccountBundle\DataFixtures\ORM\LoadAccountData;

class ProfileController extends BaseTestSetup
{
    /** @var  LoadAccountData */
    protected $accountFixtures;

    protected $profile = [
        "name" => "Имя",
        "alias" => "alias",
        "gender" => "male",
        "birth_date" => "2000-02-20",
    ];

    public function setUp()
    {
        parent::setUp();

        $this->accountFixtures = $accountFixture = new LoadAccountData();
        $this->accountFixtures->setContainer($this->container);
        $accountFixture->load($this->em);

    }

    public function getAuthClient()
    {
        $accountData = $this->accountFixtures->getAccountDataByReference('success-account');
        return $this->client = $this->createAuthenticatedClient($accountData['email'], $accountData['password']);
    }
}