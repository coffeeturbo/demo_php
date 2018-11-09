<?php
namespace AppBundle\Tests;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\SchemaTool;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\BrowserKit\Client;
use Symfony\Component\DependencyInjection\ContainerInterface;

abstract class BaseTestSetup extends WebTestCase
{
    /** @var  Client */
    protected $client;
    /** @var  ContainerInterface */
    protected $container;

    /** @var  EntityManagerInterface */
    protected $em;

    public function setUp()
    {
        $this->client = static::createClient();
        // Удаляем базу и создаем
        $container = $this->getContainer();


        $this->em = $container->get('doctrine.orm.default_entity_manager');

        $metadatas = $this->em->getMetadataFactory()->getAllMetadata();


        $schemaTool = new SchemaTool($this->em);
        $schemaTool->dropDatabase();
        $schemaTool->createSchema($metadatas);

    }

    protected function getContainer(): ContainerInterface
    {

        if(is_null($this->container)){
            $this->container = static::createClient()->getContainer();
        }

        return $this->container;
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