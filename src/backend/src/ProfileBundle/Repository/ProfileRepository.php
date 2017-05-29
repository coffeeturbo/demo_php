<?php
namespace ProfileBundle\Repository;

use Doctrine\ORM\EntityRepository;
use ProfileBundle\Entity\Profile;

class ProfileRepository extends EntityRepository
{
    public function saveProfile(Profile $profile)
    {
        $em = $this->getEntityManager();

        $em->persist($profile);
        $em->flush([$profile]);

        return $profile;
    }

    public function deleteProfile(Profile $profile)
    {
        $em = $this->getEntityManager();

        $em->remove($profile);
        $em->flush([$profile]);

        return $profile;
    }

}