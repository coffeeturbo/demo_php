<?php

namespace AuthBundle\Tests;

use AuthBundle\DataFixtures\ORM\LoadAccountData;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SignInControllerTest extends WebTestCase
{

    /** @var \Doctrine\ORM\EntityManager */
    private $em;
    private $accountsData;

    /**
     * {@inheritDoc}
     */
    protected function setUp()
    {
        self::bootKernel();
        
        $this->em = static::$kernel->getContainer()
            ->get('doctrine')
            ->getManager();
        
//        $fixtures = new LoadAccountData();
//        $fixtures->load($this->em);
//        $this->accountsData = $fixtures->accountsData; 
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
        echo $client->getResponse()->getContent();die;
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        //$this->assertContains('Welcome to Symfony', $crawler->filter('#container h1')->text());
    }
}
