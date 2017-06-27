<?php

namespace ProfileBundle\Repository;

use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityRepository;
use ProfileBundle\Entity\Profile;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @TODO: Добавить метод восстановления профиля. Если дата удаления более 7 дней выбрасывать ошибку.
 */
class ProfileRepository extends EntityRepository
{
    public function save(Profile $profile)
    {
        try {
            $em = $this->getEntityManager();
            $em->persist($profile);
            $em->flush([$profile]);

        } catch (UniqueConstraintViolationException $e) {
            throw new ConflictHttpException("Can't save profile. Duplicate entry.");
        }

        return $profile;
    }

    /**
     * @TODO: Сделать фейковое удаление! (Также добавить метод восстановления в течение 7 дней.)
     * @param Profile $profile
     * @return Profile
     */
    public function delete(Profile $profile): Profile
    {
        $em = $this->getEntityManager();

        $em->remove($profile);
        $em->flush([$profile]);

        return $profile;
    }

    public function getById(int $id): Profile
    {
        $profile = $this->findOneBy(['id' => $id]);

        if (!$profile instanceof Profile) {
            throw new NotFoundHttpException(sprintf('Profile with id `%s` not found', $id));
        }

        return $profile;
    }

    public function getByAlias(string $alias): Profile
    {
        $profile = $this->findOneBy(['alias' => $alias]);

        if (!$profile instanceof Profile) {
            throw new NotFoundHttpException(sprintf('Profile with alias `%s` not found', $alias));
        }

        return $profile;
    }

    public function getByAccountId(int $accountId): ?array
    {
        return $this->findBy(['account' => $accountId]);
    }
}