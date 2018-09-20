<?php
namespace TagBundle\Repository;

use Doctrine\ORM\EntityRepository;
use PostBundle\Entity\Post;
use TagBundle\Entity\AbstractTaggable;
use TagBundle\Entity\Tag;

class TagRepository extends EntityRepository
{
    public function create(Tag $tag)
    {
        $em =  $this->getEntityManager();
        $em->persist($tag);
        $em->flush($tag);
        return $tag;
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

    public function findOneByName(string $name)
    {
        return $this->findOneBy(['name' => $name]);
    }

    public function saveTags(AbstractTaggable $entity){
        $em = $this->getEntityManager();

        $entityTags = $entity->getTags();

        foreach($entityTags->toArray() as $tag)
        {
            /** @var $tag Tag */
            $oldTag = $this->findOneByName($tag->getName());

            if( $oldTag ) {
                $entityTags->removeElement($tag);
                $entityTags->add($oldTag);
            } else {
                $em->persist($tag);
            }
        }

    }

    public function getTopTagsWithCount($limit)
    {

        $postRep = $this->getEntityManager()
            ->getRepository(Post::class);


        $postRep->createQueryBuilder('p')
            ->select('p','p.')
            ->join('p.t','tags')
        ;

        return  $this->createQueryBuilder('t')
            ->select('t.name, count(*)')
            ->join('post.')
            ->setMaxResults(5)
            ->getQuery()->getResult()
            ;
    }
}