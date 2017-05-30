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
        $client = static::createSignInClient(json_encode([
            "username" => $username,
            "password" => $password
        ]));

        $token = json_decode($client->getResponse()->getContent(), true)['token'];

        $client = static::createClient();
        $client->setServerParameter('Authorization', sprintf('Bearer %s', $token ?? null));



        return $client;
    }

    static protected function createSignInClient($body, Array $headers = [])
    {
        $client = static::createClient();


        $headers =
            [
                'HTTP_X_CUSTOM_VAR' =>
                    [
                        'CONTENT_TYPE' => 'application/json',
                        'Accept' => 'application/json',
                    ]
        ];



        $client->request('POST', '/auth/sign-in', [], [], $headers, $body);

//        print_r($client->getRequest()->headers);
//        die;




        return $client;
    }

    final public function request($method, $uri, array $parameters = array(), array $files = array(), array $server = array(), $content = null, $changeHistory = true)
    {
        $client = static::createClient();
        $client->request($method, $uri, $parameters = array(), $files = array(), $server = array(), $content = null, $changeHistory = true);

        return $client;
    }

}