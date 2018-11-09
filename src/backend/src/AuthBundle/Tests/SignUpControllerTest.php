<?php
namespace AuthBundle\Tests;

use AccountBundle\DataFixtures\ORM\LoadAccountData;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\SchemaTool;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SignUpControllerTest extends WebTestCase
{

    private $client;
    private $container;
    private $em;

    public function getEntityManager(): EntityManagerInterface{
        if(is_null($this->em)){
            $this->em= $this->getContainer()->get('doctrine.orm.default_entity_manager');
        }
        return $this->em;
    }

    public function getContainer()
    {
        if(is_null($this->container))
            $this->container = $this->getClient()->getContainer();
        return $this->container;
    }

    public function getClient()
    {
        if(is_null($this->client)){
            $this->client = self::createClient();
        }
        return $this->client;
    }



    public function setUp()
    {
        parent::setUp();

        // чистим базу
        $metadatas = $this->getEntityManager()->getMetadataFactory()->getAllMetadata();
        $schemaTool = new SchemaTool($this->getEntityManager());
        $schemaTool->dropDatabase();
        $schemaTool->createSchema($metadatas);


        $fixture = new LoadAccountData();
        $fixture->setContainer($this->getContainer());
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
            "name" => 'Adam Jons',
            "email" => 'newtestaccount@domain.ru',
            "password" => 'successPasswd12',
        ]));

        $token = json_decode($client->getResponse()->getContent(), true)['token'];

        $this->assertNotNull($token, 'Token null');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

}