<?php
namespace AuthBundle\Tests;

use Doctrine\ORM\Tools\SchemaTool;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

error_reporting(0);
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
        $client = static::createSignInClient(json_encode([
            "username" => $username,
            "password" => $password
        ]));

        $body = json_decode($client->getResponse()->getContent(), true)['token'];

        $client = static::createClient();
        $client->setServerParameter('Authorization', sprintf('Bearer %s', $body['token'] ?? null));

        return $client;

    }

    protected static function createSignInClient($body, Array $headers = [])
    {
        $client = static::createClient();
        $client->request('POST', '/auth/sign-in', [], [], $headers, $body);

        return $client;
    }

}