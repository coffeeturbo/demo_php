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
        "name" => "Нимя",
        "alias" => "nalias",
        "gender" => "female",
        "birth_date" => "2002-02-20",
    ];

    public function setUp()
    {
        parent::setUp();

        $this->fixtures['profile'] = $fixtureProfile = new LoadProfileData();
        $fixtureProfile->setContainer($this->container);
        $fixtureProfile->load($this->em);
    }

    public function getPathRequestClient(int $profileId, $json, $method = "PUT")
    {
        $path = sprintf('/protected/profile/%s/update', $profileId);

        return $this->client->request($method, $path, [], [], [], json_encode($json));
    }

    public function getSuccessProfile(): Profile
    {
        /** @var LoadProfileData $fixturesProfile */
        $fixturesProfile = $this->fixtures['profile'];

        return $fixturesProfile->getProfileByReference('success-profile');
    }

    public function getSuccessProfile2(): Profile
    {
        /** @var LoadProfileData $fixturesProfile */
        $fixturesProfile = $this->fixtures['profile'];

        return $fixturesProfile->getProfileByReference('success-profile-2');
    }

    public function testPut200()
    {
        $this->getAuthClient();
        $profile = $this->getSuccessProfile();

        $this->getPathRequestClient($profile->getId(), self::$newProfileData);

        $response = $this->client->getResponse();
        $body = json_decode($response->getContent(), true);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->recursiveEquals($body['entity'], self::$newProfileData);
    }
    
    public function testPatch200()
    {
        $this->getAuthClient();
        $profile = $this->getSuccessProfile();
        $data = self::$newProfileData;
        unset($data['name']);

        $this->getPathRequestClient($profile->getId(), $data, "PATCH");

        $response = $this->client->getResponse();
        $body = json_decode($response->getContent(), true);
        
        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
        $this->assertEquals($body['entity']['name'], $profile->getName());
        $this->recursiveEquals($body['entity'], $data);
        
    }
    
    public function test400()
    {
        $this->getAuthClient();
        $profile = $this->getSuccessProfile();

        $date = new \DateTime();
        $date->modify('-200 years');

        $invalidData = [
            "gender" => "fooBar",
            "birth_date" => $date->format(Profile::BIRTH_DATE_FORMAT),
        ];
        
        $this->getPathRequestClient($profile->getId(), $invalidData);
        $response = $this->client->getResponse();

        $body = json_decode($response->getContent(), true);

        $this->assertArrayHasKey("name", $body['errors'], 'Required field name test not passed.'); // required
        $this->assertArrayHasKey("birth_date", $body['errors'], 'Too old age test not passed.'); // too old
        $this->assertArrayHasKey("gender", $body['errors'], 'Invalid gender test not passed.'); // invalid
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());

        
        $date = new \DateTime();
        $date->modify('-2 years');
        $invalidData["birth_date"] = $date->format(Profile::BIRTH_DATE_FORMAT);

        $this->getPathRequestClient($profile->getId(), $invalidData);
        $response = $this->client->getResponse();

        $body = json_decode($response->getContent(), true);

        $this->assertArrayHasKey("birth_date", $body['errors'], 'Too young age test not passed.');
        $this->assertEquals(Response::HTTP_BAD_REQUEST, $response->getStatusCode());
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