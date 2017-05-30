<?php
namespace ProfileBundle\Tests;

use AppBundle\Tests\BaseTestSetup;
use AuthBundle\DataFixtures\ORM\LoadAccountData;

class ProfileControllerTest extends BaseTestSetup
{
    /** @var  LoadAccountData */
    protected $accountFixtures;

    public function setUp()
    {
        parent::setUp();

        $this->accountFixtures = $accountFixture = new LoadAccountData();
        $this->accountFixtures->setContainer($this->container);
        $accountFixture->load($this->em);

    }

    public function test200()
    {

        $accountData = $this->accountFixtures->getAccountDataByReference('success-account');

        $client = $this->createAuthenticatedClient($accountData['email'], $accountData['password']);

        $body = json_encode([
            "first_name" => "Имя",
            "last_name" => "Фамилия",
            "patronymic" => "Отчество",
            "alias" => "alias",
            "nickname" => "nickName",
            "gender" => "2",
            "birth_date" => "20-02-2000",
        ]);


        $token = $client->getServerParameter('Authorization');

        $client->request('PUT', '/protected/profile/create', [],[], [
            'Authorization' => $token
        ], $body);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}