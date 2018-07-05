<?php
namespace AuthBundle\Repository;

use AccountBundle\Entity\Account;
use AuthBundle\Entity\Confirmation;
use Doctrine\ORM\EntityRepository;

class ConfirmationRepository extends EntityRepository
{
    public function save(Confirmation $confirmation)
    {

        $em = $this->getEntityManager();
        $em->persist($confirmation);
        $em->flush();
    }


    public function wasteConfirmation(Confirmation $confirmation)
    {
        $confirmation->setWasted(true);

        $this->save($confirmation);
    }

    public function countWastedConfirmation(Account $account)
    {
        $qb = $this->createQueryBuilder('c');

        $q = $qb->select('count(c.id)')
            ->where('c.wasted = :waste')
            ->andWhere('c.account = :account')
            ->setParameters([
                'waste'=> true,
                'account'=> $account
            ])
            ->getQuery()
        ;

        return $q->getSingleScalarResult();
    }

}