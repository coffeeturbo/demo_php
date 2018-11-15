<?php
namespace PostBundle\Tests;

use AccountBundle\DataFixtures\ORM\LoadAccountData;
use AppBundle\Tests\BaseTestSetup;
use ProfileBundle\DataFixtures\ORM\LoadProfileData;
use ProfileBundle\Entity\Profile;

class PostController extends BaseTestSetup
{
    /** @var  LoadAccountData */
    protected $accountFixtures;

    protected $fixtures;

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

    public function getSuccessProfile(): Profile
    {
        /** @var LoadProfileData $fixturesProfile */
        $fixturesProfile = $this->fixtures['profile'];

        return $fixturesProfile->getProfileByReference('success-profile');
    }
}