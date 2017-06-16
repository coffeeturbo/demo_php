<?php
namespace ProfileBundle\DataFixtures\ORM;

use AccountBundle\DataFixtures\ORM\LoadAccountData;
use AccountBundle\Entity\Account;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use ProfileBundle\Entity\Profile;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadProfileData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{

    /** @var  ContainerInterface */
    private $container;

    static protected $profileData = [
        'success-profile' =>
            [
                "name" => "Имя",
                "alias" => "alias",
                "gender" => "male",
                "birth_date" => "20-02-2000",
            ],
        'success-profile-2' =>
            [
                "name" => "Имя",
                "alias" => "alias2",
                "gender" => "male",
                "birth_date" => "20-02-2000",
            ],

    ];

    static protected $profile;

    public function load(ObjectManager $manager)
    {
        $profileData = self::$profileData['success-profile'];
        $profileData['birth_date'] = \DateTime::createFromFormat(Profile::BIRTH_DATE_FORMAT, $profileData['birth_date']);
        $profileData['gender'] = Profile\Gender::createFromStringCode($profileData['gender']);

        $account = $manager->getRepository(Account::class)
            ->findOneBy(['email' => LoadAccountData::getAccountDataByReference('success-account')['email']]);

        $profileService = $this->container->get('profile.service');
        $profile = $profileService->createFromArray($profileData, $account, true);

        self::$profile['success-profile'] = $profile;

        // создаём 2ой профиль
        $profileData2 = self::$profileData['success-profile-2'];
        $profileData2['birth_date'] = \DateTime::createFromFormat(Profile::BIRTH_DATE_FORMAT, $profileData2['birth_date']);
        $profileData2['gender'] = Profile\Gender::createFromStringCode($profileData2['gender']);

        $account2 = $manager->getRepository(Account::class)
            ->findOneBy(['email' => LoadAccountData::getAccountDataByReference('success-account-2')['email']]);

        $profileService = $this->container->get('profile.service');
        $profile2 = $profileService->createFromArray($profileData2, $account2, true);

        self::$profile['success-profile-2'] = $profile2;
    }

    static public function getProfileByReference($ref): Profile
    {
        return self::$profile[$ref] ?? self::$profile[$ref];
    }

    public function getOrder()
    {
        return 11;
    }

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }
}