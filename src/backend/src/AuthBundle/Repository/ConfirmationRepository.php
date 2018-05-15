<?php
namespace AuthBundle\Repository;

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
}