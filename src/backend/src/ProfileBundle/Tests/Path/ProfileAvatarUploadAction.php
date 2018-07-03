<?php
namespace ProfileBundle\Tests\Path;

use PHPUnit\Framework\Assert;
use ProfileBundle\DataFixtures\ORM\LoadProfileData;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Tests\ProfileController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Response;

class ProfileAvatarUploadAction extends ProfileController
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

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        Assert::assertFileExists($body['entity']['avatar']['origin']['storage_path']);
        Assert::assertFileExists($body['entity']['avatar']['cropped']['storage_path']);
        Assert::assertFileExists($body['entity']['avatar']['medium']['storage_path']);
        Assert::assertFileExists($body['entity']['avatar']['small']['storage_path']);

        // после удаления профиля нужно удалять все связанные файлы
        $dbProfile = $this->container->get('profile.service')->getById($profile->getId());
        $this->container->get('avatar.service')->deleteImage($dbProfile);
    }

    public function test404()
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

        $this->getPathRequestClient(99999, $params, $file);

        $response = $this->client->getResponse();

        $this->assertEquals(Response::HTTP_NOT_FOUND, $response->getStatusCode());

        // после удаления профиля нужно удалять все связанные файлы
        $this->container->get('avatar.service')->deleteImage($profile);
    }

}