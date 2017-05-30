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

        $request = [
            "first_name" => "Имя",
            "last_name" => "Фамилия",
            "patronymic" => "Отчество",
            "alias" => "alias",
            "nickname" => "nickName",
            "gender" => "male",
            "birth_date" => "20-02-2000",
        ];

        $body = json_encode($request);

        $client->request('PUT', '/protected/profile/create', [], [], [], $body);
        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $result = json_decode($client->getResponse()->getContent(), true);

        $this->recursiveEquals($request, $result['entity']);
    }

    public function recursiveEquals(array $expects, array $actual){
        foreach($expects as $index => $value){
            $this->assertEquals($value, $actual[$index], "index not equals:  ".$index);
        }
    }
}