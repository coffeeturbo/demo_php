<?php
namespace ProfileBundle\Tests;

use AppBundle\Tests\BaseTestSetup;
use AccountBundle\DataFixtures\ORM\LoadAccountData;
use ProfileBundle\DataFixtures\ORM\LoadProfileData;
use ProfileBundle\Entity\Profile;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ProfileController extends BaseTestSetup
{
    /** @var  LoadAccountData */
    protected $accountFixtures;

    protected $fixtures;

    protected $profile = [
        "name" => "Имя",
        "alias" => "alias",
        "gender" => "male",
        "birth_date" => "2000-02-20",
    ];

    public function setUp()
    {
        parent::setUp();

        $this->accountFixtures = $accountFixture = new LoadAccountData();
        $this->accountFixtures->setContainer($this->container);
        $accountFixture->load($this->em);

    }

    public function getAuthClient()
    {
        $accountData = $this->accountFixtures->getAccountDataByReference('success-account');
        return $this->client = $this->createAuthenticatedClient($accountData['email'], $accountData['password']);
    }

    public function getSuccessProfile(): Profile
    {
        /** @var LoadProfileData $fixturesProfile */
        $fixturesProfile = $this->fixtures['profile'];

        return $fixturesProfile->getProfileByReference('success-profile');
    }


    public function getBackdropUploadRequestClient(int $profileId, array $params, UploadedFile $file)
    {
        $path = sprintf('/protected/profile/%s/backdrop/upload', $profileId);

        return $this->client->request('POST', $path, $params, [ 'image' => $file ], []);
    }

    public function getBackdropDeleteRequestClient(int $profileId)
    {
        $path = sprintf('/protected/profile/%s/backdrop/delete', $profileId);

        return $this->client->request('DELETE', $path);
    }
}