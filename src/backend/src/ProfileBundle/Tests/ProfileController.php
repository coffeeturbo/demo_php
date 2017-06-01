<?php
namespace ProfileBundle\Tests;

use AppBundle\Tests\BaseTestSetup;
use AuthBundle\DataFixtures\ORM\LoadAccountData;

class ProfileController extends BaseTestSetup
{
    /** @var  LoadAccountData */
    protected $accountFixtures;

    protected $profile = [
        "first_name" => "Имя",
        "last_name" => "Фамилия",
        "patronymic" => "Отчество",
        "alias" => "alias",
        "nickname" => "nickName",
        "gender" => "male",
        "birth_date" => "20-02-2000",
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