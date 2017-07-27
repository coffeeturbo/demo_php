<?php
namespace ProfileBundle\Tests\Path;

use PHPUnit\Framework\Assert;
use ProfileBundle\DataFixtures\ORM\LoadProfileData;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Tests\ProfileController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;

class ProfileBackdropControllerTest extends ProfileController
{

    protected $filePath = __DIR__ . '/../../Resources/backdrop/1600x400.jpg';
    protected $fixtures;

    public function setUp()
    {
        parent::setUp();

        $this->fixtures['profile'] = $fixtureProfile = new LoadProfileData();
        $fixtureProfile->setContainer($this->container);
        $fixtureProfile->load($this->em);
    }

    public function tearDown()
    {

    }

    public function getSuccessProfile(): Profile
    {
        /** @var LoadProfileData $fixturesProfile */
        $fixturesProfile = $this->fixtures['profile'];

        return $fixturesProfile->getProfileByReference('success-profile');
    }

    public function getPathRequestClient(int $profileId, array $params, UploadedFile $file)
    {
        $path = sprintf('/protected/profile/%s/backdrop/upload', $profileId);

        return $this->client->request('POST', $path, $params, [ 'image' => $file ], []);
    }

    public function test200()
    {
        $this->getAuthClient();
        $profile = $this->getSuccessProfile();

        $params = [
            'y' => 200,
        ];


        $file = new UploadedFile($this->filePath, 'grid-example');

        $this->getPathRequestClient($profile->getId(), $params, $file);

        $response = $this->client->getResponse();

        $body = json_decode($response->getContent(), true);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        Assert::assertFileExists($body['entity']['backdrop']['storage_path']);
    }
}