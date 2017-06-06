<?php
namespace ProfileBundle\Tests\Path;

use ProfileBundle\DataFixtures\ORM\LoadProfileData;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Tests\ProfileController;
use Symfony\Component\HttpFoundation\Response;

class ProfileGetByIdActionTest extends ProfileController
{
    protected $fixtures;
    public function setUp()
    {
        parent::setUp();

        $this->fixtures['profile'] = $fixtureProfile = new LoadProfileData();
        $fixtureProfile->setContainer($this->container);
        $fixtureProfile->load($this->em);
    }

    public function getSuccessProfile(): Profile
    {

        return $this->fixtures['profile']->getProfileByReference('success-profile');
    }

    public function getPathRequestClient($id)
    {
        return $this->client->request('GET', sprintf('/profile/%s/get-by-id', $id), [], [], []);
    }

    public function test200()
    {
        $this->getAuthClient();
        $profile = $this->getSuccessProfile();
        $this->getPathRequestClient($profile->getId());

        $response = $this->client->getResponse();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->recursiveEquals(json_decode($response->getContent(), true)['entity'], $this->profile);
    }

    public function test404()
    {
        $this->getAuthClient();
        $this->getPathRequestClient(9999999);

        $response = $this->client->getResponse();

        $this->assertEquals(Response::HTTP_NOT_FOUND, $response->getStatusCode());
    }
}