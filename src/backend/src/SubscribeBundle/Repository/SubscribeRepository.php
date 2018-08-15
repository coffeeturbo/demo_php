<?php
namespace SubscribeBundle\Repository;

use Doctrine\ORM\EntityRepository;
use SubscribeBundle\Entity\Subscribe;

class SubscribeRepository extends EntityRepository
{

    public function create(Subscribe $subscribe)
    {
        $em = $this->getEntityManager();

        $em->persist($subscribe);
        $em->flush();


    }

    public function isExistsSubscribe(Subscribe $subscribe)
    {
        $dub = $this->findOneBy([
            'targetId' => $subscribe->getTargetId(),
            'profile' => $subscribe->getProfile(),
            'type' => $subscribe->getType()->getIntCode()
        ]);

        return $dub;
    }

    public function delete(Subscribe $subscribe)
    {
        $em = $this->getEntityManager();

        $em->remove($subscribe);
        $em->flush();
    }
}