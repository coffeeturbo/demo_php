<?php
namespace AuthBundle\Tests;


use Doctrine\ORM\Tools\SchemaTool;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

abstract class BaseTestSetup extends WebTestCase
{
    protected $client;
    protected $container;
    protected $em;

    public function setUp()
    {
        $this->client = static::createClient();
        $this->container = $this->client->getContainer();

        $this->em = static::$kernel->getContainer()
            ->get('doctrine.orm.default_entity_manager');

        if (!isset($metadatas)) {
            $metadatas = $this->em->getMetadataFactory()->getAllMetadata();
        }

        $schemaTool = new SchemaTool($this->em);
        $schemaTool->dropDatabase();
        if (!empty($metadatas)) {
            $schemaTool->createSchema($metadatas);
        }

    }
}