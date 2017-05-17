<?php

namespace AuthBundle\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\StringInput;

class SignInControllerTest extends WebTestCase
{
    protected static $application;
    private $accountsData;

    protected function setUp()
    {
        self::getApplication()->run(new StringInput('doctrine:database:create --quiet'));
        self::getApplication()->run(new StringInput('doctrine:schema:update --force --quiet'));
        self::getApplication()->run(new StringInput('doctrine:fixtures:load --purge-with-truncate --quiet'));
    }

    protected static function getApplication()
    {
        if (null === self::$application) {
            $client = static::createClient();

            self::$application = new Application($client->getKernel());
            self::$application->setAutoExit(false);
        }

        return self::$application;
    }

    public function testIndex()
    {
       $client = static::createClient();

        $client->request('POST', '/auth/sign-in', [], [], ['content-type' => 'application/json'], json_encode(
        [
            "username"=>"testuser1@domain.com",
            "password"=>"4zFBLC"
        ]
        ));

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        //$this->assertContains('Welcome to Symfony', $crawler->filter('#container h1')->text());
    }
}
