<?php

namespace AuthBundle\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SignInControllerTest extends WebTestCase
{
    public function testIndex()
    {
        $client = static::createClient();

        $crawler = $client->request('POST', '/api/auth/sign-in', [], [], ['content-type' => 'application/json'], json_encode(
            [
                "username"=>"admin",
                "password"=>"lolipop",
                "dont_remember"=>false
            ]
        ));
        
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        //$this->assertContains('Welcome to Symfony', $crawler->filter('#container h1')->text());
    }
}
