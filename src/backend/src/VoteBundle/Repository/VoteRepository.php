<?php
namespace VoteBundle\Repository;

use Doctrine\ORM\EntityRepository;
use VoteBundle\Entity\Vote;

class VoteRepository extends EntityRepository
{
    public function save(Vote $vote)
    {
        $em = $this->getEntityManager();
        $em->persist($vote);
        $em->flush($vote);
    }
}