<?php
namespace AuthBundle\Tests;

use AppBundle\Tests\BaseTestSetup;
use AuthBundle\DataFixtures\ORM\LoadAccountData;

class SignUpControllerTest extends BaseTestSetup
{

    protected static $application;
    /** @var  LoadAccountData */
    protected $fixtures;

    public function setUp()
    {
        parent::setUp();

        $this->fixtures = $fixture = new LoadAccountData();
        $this->fixtures->setContainer($this->container);
        $fixture->load($this->em);
    }

    static protected function createSignUpClient(array $headers,string $body){
        $client = static::createClient();
        $client->request('PUT', '/auth/sign-up', [], [], $headers, $body);

        return $client;
    }

    public function test200()
    {

        $client = static::createSignUpClient( [
            'HTTP_ACCEPT' => 'application/json'
        ], json_encode([
            "email" => 'newtestaccount@domain.ru',
            "password" => 'successPasswd12',
        ]));

        $token = json_decode($client->getResponse()->getContent(), true)['token'];

        $this->assertNotNull($token, 'Token null');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }


    public function testBadAccountPassword400()
    {
        $accountData = $this->fixtures->getAccountDataByReference('success-account');

        $client = static::createSignUpClient( [
            'HTTP_ACCEPT' => 'application/json'
        ], json_encode([
            "email" => "21".$accountData['email'],
            "password" => '26261Jj',
        ]));

        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }

    public function testUserExist409()
    {
        $accountData = $this->fixtures->getAccountDataByReference('success-account');

        $client = static::createSignUpClient( [
            'HTTP_ACCEPT' => 'application/json'
        ], json_encode([
            "email" => $accountData['email'],
            "password" => $accountData['password'],
        ]));

        $this->assertEquals(409, $client->getResponse()->getStatusCode());
    }

}