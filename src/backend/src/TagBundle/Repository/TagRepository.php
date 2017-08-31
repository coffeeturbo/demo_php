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

    public function search(string $query): ?array
    {
        return  $this->createQueryBuilder('t')
            ->where('t.name LIKE :query')
            ->setParameter('query', '%'.$query.'%')
            ->setMaxResults(5)
            ->getQuery()->getResult()
            ;

    }
}