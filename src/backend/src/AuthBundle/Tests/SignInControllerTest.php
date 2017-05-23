<?php

namespace AuthBundle\Tests;

use AuthBundle\DataFixtures\ORM\LoadAccountData;

class SignInControllerTest extends BaseTestSetup
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

    public function test200()
    {
        $accountData = $this->fixtures->getAccountDataByReference('success-account');

        $client = static::createClient();

        $client->request('POST', '/auth/sign-in', [], [], ['content-type' => 'application/json'], json_encode(
            [
                "username" => $accountData['email'],
                "password" => $accountData['password'],
            ]
        ));

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function test400()
    {
        $client = static::createClient();
        $client->request('POST', '/auth/sign-in', [], [], ['content-type' => 'application/json'], json_encode(
            [
                "username" => '',
                "password" => '',
            ]
        ));

        $this->assertEquals(400, $client->getResponse()->getStatusCode());
    }

    public function test401()
    {
        $accountData = $this->fixtures->getAccountDataByReference('success-account');

        $client = static::createClient();
        $client->request('POST', '/auth/sign-in', [], [], ['content-type' => 'application/json'], json_encode(
            [
                "username" => $accountData['email'],
                "password" => 'wrong_password',
            ]
        ));

        $this->assertEquals(401, $client->getResponse()->getStatusCode());
    }
}
