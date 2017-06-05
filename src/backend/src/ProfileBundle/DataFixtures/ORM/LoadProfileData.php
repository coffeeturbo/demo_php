<?php
namespace ProfileBundle\DataFixtures\ORM;

use AuthBundle\DataFixtures\ORM\LoadAccountData;
use AuthBundle\Entity\Account;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class LoadProfileData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{

    /** @var  ContainerInterface */
    private $container;

    protected $profileData = [
        'success-profile' =>
            [
                "first_name" => "Имя",
                "last_name" => "Фамилия",
                "patronymic" => "Отчество",
                "alias" => "alias",
                "nickname" => "nickName",
                "gender" => "male",
                "birth_date" => "20-02-2000",
            ]
    ];

    public function load(ObjectManager $manager)
    {

        $profileData = $this->profileData['success-profile'];

        $account = $manager->getRepository(Account::class)
            ->findOneBy(['email' => LoadAccountData::getAccountDataByReference('success-account')['email']]);

        $profileService = $this->container->get('profile.service');
        $profile = $profileService->createProfileFromArray($profileData, $account);
        $profileService->saveProfile($profile);

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