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

        $client = static::createSignInClient(json_encode([
            "username" => $accountData['email'],
            "password" => $accountData['password'],
        ]));

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    public function test400() // 400 Bad request
    {
        $accountData = $this->fixtures->getAccountDataByReference('success-account');

        $test_data = [
            [
                "username" => $accountData['email'] // без пароля
            ],
            [
                "password" => $accountData['password'] // без логина
            ],
            [
                "foo" => 'bar', // с неправильным параметром без правильных параметров
            ],
            [
                "username" => $accountData['email'],    // с неправильным параметром 
                "password" => $accountData['password'], // и правильными параметрами
                "foobar" => $accountData['password']
            ],
            [
                null
            ]
        ];
        foreach ($test_data as $data) {
            $client = static::createSignInClient(json_encode($data));
            $this->assertEquals(400, $client->getResponse()->getStatusCode());
        }
    }

    public function test401() // 401 Unauthorized
    {
        $accountData = $this->fixtures->getAccountDataByReference('success-account');
        $test_data = [
            [
                "username" => $accountData['email'],
                "password" => 'wrong_password', // с неправильным паролем
            ],
            [
                "username" => 'wrong_username', // с неправильным логином
                "password" => $accountData['password'],
            ]
        ];

        foreach ($test_data as $data) {
            $client = static::createSignInClient(json_encode($data));
            $this->assertEquals(401, $client->getResponse()->getStatusCode());
        }
    }
}
