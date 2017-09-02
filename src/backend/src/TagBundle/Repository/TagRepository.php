<?php
namespace TagBundle\Repository;

use Doctrine\ORM\EntityRepository;
use TagBundle\Entity\AbstractTaggable;
use TagBundle\Entity\Tag;
use TagBundle\Tag\TaggableEntityInterface;

class TagRepository extends EntityRepository
{
    public function create(Tag $tag)
    {

        $em =  $this->getEntityManager();
        $em->persist($tag);
        $em->flush();
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

        foreach($entityTags as $tag)
        {
            /** @var $tag Tag */
            $oldTag = $this->findOneByName($tag->getName());

            if($oldTag ) {
                $entityTags->removeElement($tag);
                $entityTags->add($oldTag);
            } else {
                $this->create($tag);
                $em->persist($tag);
            }

        }
    }
}