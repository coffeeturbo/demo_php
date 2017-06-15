<?php
namespace ProfileBundle\Tests\Path;

use AccountBundle\Entity\Account;
use ProfileBundle\Tests\ProfileController;
use Symfony\Component\HttpFoundation\Response;

class ProfileCreateActionTest extends ProfileController
{

    protected $fixtures;

    public function setUp()
    {
        parent::setUp();

//        $this->fixtures['profile'] = $fixtureProfile = new LoadProfileData();
//        $fixtureProfile->setContainer($this->container);
//        $fixtureProfile->load($this->em);
    }

    public function getPathRequestClient($json)
    {
        return $this->client->request('PUT', '/protected/profile/create', [], [], [], json_encode($json));
    }

    public function test200()
    {
        $this->getAuthClient();
        $this->getPathRequestClient($this->profile);
        $response = $this->client->getResponse();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $result = json_decode($response->getContent(), true);

        $this->recursiveEquals($this->profile, $result['entity']);
    }

    public function test200AddAccountRoleRegisteredListener()
    {
        $this->getAuthClient();
        $this->getPathRequestClient($this->profile);
        $response = $this->client->getResponse();
        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $result = json_decode($response->getContent(), true);
        $accountId = $result['entity']['account_id'];
        $this->assertTrue(is_int($accountId));

        /** @var Account $account */
        $account = $this->em->getRepository(Account::class)->find($accountId);

        $this->assertTrue(in_array($account::ROLE_REGISTERED, $account->getRoles()));
    }

    public function test401()
    {
        $this->getPathRequestClient($this->profile);
        $response = $this->client->getResponse();

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
    }

    public function testExceedLimitProfiles403()
    {
        $this->getAuthClient();
        $this->getPathRequestClient($this->profile);
        $this->client->getResponse();

        $this->getPathRequestClient($this->profile);
        $response = $this->client->getResponse();

        $this->assertEquals(Response::HTTP_FORBIDDEN, $response->getStatusCode());
    }

}