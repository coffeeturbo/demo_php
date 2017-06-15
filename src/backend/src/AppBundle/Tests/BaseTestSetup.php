<?php
namespace AppBundle\Tests;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\SchemaTool;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\BrowserKit\Client;

abstract class BaseTestSetup extends WebTestCase
{
    /** @var  Client */
    protected $client;
    protected $container;

    /** @var  EntityManagerInterface */
    protected $em;

    public function setUp()
    {
        $this->client = static::createClient();
        $this->container = static::createClient()->getContainer();

        $this->em = $this->container->get('doctrine.orm.default_entity_manager');

        $metadatas = $this->em->getMetadataFactory()->getAllMetadata();

        $schemaTool = new SchemaTool($this->em);
        $schemaTool->dropDatabase();
        $schemaTool->createSchema($metadatas);

    }

    protected function createAuthenticatedClient($username = 'user', $password = 'password')
    {
        $body = [
            "username" => $username,
            "password" => $password
        ];
        
        $header = ['HTTP_Accept' => 'application/json']; 
        
        $client = static::createSignInClient(json_encode($body), $header);

        $body = json_decode($client->getResponse()->getContent(), true);

        $client = static::createClient();
        $client->setServerParameter('HTTP_Authorization', sprintf('Bearer %s', $body['token'] ?? null));

        return $client;
    }

    static protected function createSignInClient($body, Array $headers = [])
    {
        $client = static::createClient();
        $client->request('POST', '/auth/sign-in', [], [], $headers, $body);

        return $client;
    }

    public function recursiveEquals(array $expects, array $actual){
        foreach($expects as $index => $value){

            if(isset($actual[$index])) $this->assertEquals($value, $actual[$index], "index not equals:  ".$index);
        }
    }
}