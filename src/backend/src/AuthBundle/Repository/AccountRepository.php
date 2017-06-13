<?php

namespace AuthBundle\Repository;

use AuthBundle\Entity\Account;
use Doctrine\ORM\EntityRepository;

class AccountRepository extends EntityRepository
{
    public function save(Account $account)
    {
        $em = $this->getEntityManager();

        $em->persist($account);
        $em->flush($account);
    }
}
