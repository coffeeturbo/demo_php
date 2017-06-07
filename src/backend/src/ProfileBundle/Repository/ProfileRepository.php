<?php

namespace ProfileBundle\Repository;

use Doctrine\ORM\EntityRepository;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Exception\ProfileNotFoundException;

/**
 * @DOTO: Добавить метод восстановления профиля. Если дата удаления более 7 дней выбрасывать ошибку.
 */
class ProfileRepository extends EntityRepository
{
    public function saveProfile(Profile $profile)
    {
        $em = $this->getEntityManager();

        $em->persist($profile);
        $em->flush([$profile]);

        return $profile;
    }

    /**
     * @DOTO: Сделать фейковое удаление! (Также добавить метод восстановления в течение 7 дней.)
     * @param Profile $profile
     * @return Profile
     */
    public function deleteProfile(Profile $profile)
    {
        $em = $this->getEntityManager();

        $em->remove($profile);
        $em->flush([$profile]);

        return $profile;
    }

    public function getProfileById(int $id)
    {
        $profile = $this->findOneBy(['id' => $id]);

        if (is_null($profile)) {
            throw new ProfileNotFoundException(sprintf("Profile with id: %s not found", $id));
        }

        return $profile;
    }

    public function getProfileByAlias(string $alias)
    {
        $profile = $this->findOneBy(['alias' => $alias]);

        if (is_null($profile)) {
            throw new ProfileNotFoundException(sprintf("Profile with alias: %s not found", $alias));
        }

        return $profile;
    }

    public function getAccountProfiles(int $accountId): ?array
    {
        return $this->findBy(['account' => $accountId], null);
    }

}