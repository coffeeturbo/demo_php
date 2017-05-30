<?php
namespace AppBundle\Tests;

use Doctrine\ORM\Tools\SchemaTool;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

abstract class BaseTestSetup extends WebTestCase
{
    protected $client;
    protected $container;
    protected $em;

    public function setUp()
    {
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
}