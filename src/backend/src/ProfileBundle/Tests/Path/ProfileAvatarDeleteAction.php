<?php
namespace ProfileBundle\Tests\Path;

use PHPUnit\Framework\Assert;
use ProfileBundle\DataFixtures\ORM\LoadProfileData;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Tests\ProfileController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;

class ProfileAvatarDeleteAction extends ProfileController
{
    protected $fixtures;

    protected $filePath = __DIR__.'/../../Resources/avatar/grid-example.png';


    public function setUp()
    {
        parent::setUp();

        $this->fixtures['profile'] = $fixtureProfile = new LoadProfileData();
        $fixtureProfile->setContainer($this->container);
        $fixtureProfile->load($this->em);
    }

    public function getSuccessProfile(): Profile
    {
        /** @var LoadProfileData $fixturesProfile */
        $fixturesProfile = $this->fixtures['profile'];

        return $fixturesProfile->getProfileByReference('success-profile');
    }

    public function getPathRequestClient(int $profileId, array $params, UploadedFile $file)
    {
        $path = sprintf('/protected/profile/%s/avatar/upload', $profileId);

        return $this->client->request('POST', $path, $params, [ 'image' => $file ], []);
    }

    public function requestPath(int $profileId)
    {
        $path = sprintf('/protected/profile/%s/avatar/delete', $profileId);

        return $this->client->request('DELETE', $path);
    }

    public function test200()
    {
        $this->getAuthClient();
        $profile = $this->getSuccessProfile();

        $params = [
            'x' => 0,
            'y' => 0,
            'width' => 200,
            'height' => 200,
        ];


        $file = new UploadedFile($this->filePath, 'grid-example');

        $this->getPathRequestClient($profile->getId(), $params, $file);

        $response = $this->client->getResponse();

        $body = json_decode($response->getContent(), true);


        $avatarOrigin = $body['entity']['avatar']['origin']['storage_path'];
        $avatarCropped = $body['entity']['avatar']['cropped']['storage_path'];
        $avatarMedium = $body['entity']['avatar']['medium']['storage_path'];
        $avatarSmall = $body['entity']['avatar']['small']['storage_path'];


        // Тут удаляем и проверяем
        $this->requestPath($profile->getId());

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $response = $this->client->getResponse();

        $body = json_decode($response->getContent(), true);
        Assert::assertNull($body['entity']['avatar']);
        Assert::assertFileNotExists($avatarOrigin);
        Assert::assertFileNotExists($avatarCropped);
        Assert::assertFileNotExists($avatarMedium);
        Assert::assertFileNotExists($avatarSmall);
    }
}