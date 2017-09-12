<?php

namespace PostBundle\Repository;

use AttachmentBundle\Entity\Attachment;
use Doctrine\ORM\NoResultException;
use PostBundle\Entity\Post;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use TagBundle\Entity\Tag;

class PostRepository extends \Doctrine\ORM\EntityRepository
{

    public function save(Post $post)
    {
        $em = $this->getEntityManager();
        $tagRep = $em->getRepository(Tag::class);

        $attachmentRep = $em->getRepository(Attachment::class);

        $em->persist($post);

        // сохраняем теги
        $tagRep->saveTags($post);

        $attachmentRep->saveAttachments($post);

        $em->flush($post);
    }


    public function getWithTagsAndAttachmentsById(int $id)
    {
        try{
            $qb = $this->createQueryBuilder('p')
                ->select('p', 'tags', 'attachments')
                ->leftJoin('p.tags', 'tags')
                ->leftJoin('p.attachments', 'attachments')
                ->where('p.id = :id')
                ->setParameter('id', $id)
                ->getQuery();

                $result = $qb->getSingleResult();
        }catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("post wid id= %s not found", $id));
        }

        return $result;
    }

    public function getWithTagsAndAttachmentsByAlias(string $alias)
    {
        // todo написать метод getWithTagsAndAttachmentsByAlias
    }
}
