<?php
namespace ProfileBundle\Tests\Path;


use ProfileBundle\DataFixtures\ORM\LoadProfileData;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Tests\ProfileController;
use Symfony\Component\HttpFoundation\Response;

class ProfileUpdateActionTest extends ProfileController
{
    protected $fixtures;

    static protected $newProfileData = [
        "first_name" => "Нимя",
        "last_name" => "Намилия",
        "patronymic" => "Нотчество",
        "alias" => "nalias",
        "nickname" => "nnickName",
        "gender" => "female",
        "birth_date" => "20-02-2002",
    ];


    public function setUp()
    {
        parent::setUp();

        $this->fixtures['profile'] = $fixtureProfile = new LoadProfileData();
        $fixtureProfile->setContainer($this->container);
        $fixtureProfile->load($this->em);
    }

    public function getPathRequestClient(int $profileId, $json)
    {
        $path = sprintf('/protected/profile/%s/update', $profileId);

        return $this->client->request('POST', $path, [], [], [], json_encode($json));
    }

    public function getSuccessProfile(): Profile
    {

        return $this->fixtures['profile']->getProfileByReference('success-profile');
    }

    public function getSuccessProfile2(): Profile
    {

        return $this->fixtures['profile']->getProfileByReference('success-profile-2');
    }

    public function test200()
    {
        $this->getAuthClient();
        $profile = $this->getSuccessProfile();

        $this->getPathRequestClient($profile->getId(), self::$newProfileData);

        $response = $this->client->getResponse();

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->recursiveEquals(json_decode($response->getContent(), true)['entity'], self::$newProfileData);
    }

    public function test401()
    {
        $profile = $this->getSuccessProfile();
        $this->getPathRequestClient($profile->getId(), self::$newProfileData);
        $response = $this->client->getResponse();

        $this->assertEquals(Response::HTTP_UNAUTHORIZED, $response->getStatusCode());
    }


    public function test403()
    {
        $this->getAuthClient();
        $profile = $this->getSuccessProfile2();

        $this->getPathRequestClient($profile->getId(), self::$newProfileData);

        $response = $this->client->getResponse();

        $this->assertEquals(Response::HTTP_FORBIDDEN, $response->getStatusCode());
    }

    public function test404()
    {
        $this->getAuthClient();
        $this->getPathRequestClient(999999, self::$newProfileData);

        $response = $this->client->getResponse();
        $this->assertEquals(Response::HTTP_NOT_FOUND, $response->getStatusCode());
    }
}