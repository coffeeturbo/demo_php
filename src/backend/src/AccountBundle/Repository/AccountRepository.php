<?php

namespace AccountBundle\Repository;

use AccountBundle\Entity\Account;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AccountRepository extends EntityRepository
{
    public function save(Account $account)
    {
        $em = $this->getEntityManager();

        $em->persist($account);
        $em->flush($account);
    }

    public function findOneByEmail(string $email): ?Account
    {
        /** @var Account $account */
        $account = $this->findOneBy(['email' => $email]);
        if(is_null($account)) throw new NotFoundHttpException('this email is not found');

        return $account;
    }
}