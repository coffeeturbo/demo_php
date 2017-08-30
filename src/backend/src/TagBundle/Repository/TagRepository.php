<?php
namespace TagBundle\Repository;

use Doctrine\ORM\EntityRepository;
use TagBundle\Entity\Tag;

class TagRepository extends EntityRepository
{
    public function create(Tag $tag)
    {
        $em =  $this->getEntityManager();
        $em->persist($tag);
        $em->flush($tag);
    }

    public function delete()
    {

    }
}