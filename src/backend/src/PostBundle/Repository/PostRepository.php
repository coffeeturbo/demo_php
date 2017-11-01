<?php

namespace PostBundle\Repository;

use AttachmentBundle\Entity\Attachment;
use Doctrine\ORM\NoResultException;
use FeedBundle\Criteria\FeedCriteria;
use PostBundle\Entity\Post;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use TagBundle\Entity\Tag;

class PostRepository extends \Doctrine\ORM\EntityRepository
{

    public function save(Post $post)
    {
        $em = $this->getEntityManager();
        $tagRep = $em->getRepository(Tag::class);

        $em->persist($post);

        // сохраняем теги
        $tagRep->saveTags($post);

        // сохраняем аттачменты
        $attachmentRep = $em->getRepository(Attachment::class);
        $attachmentRep->saveAttachments($post);

        $em->flush($post);
    }

    public function getPostById(int $postId): Post
    {
        try {
            $qb = $this->createQueryBuilder('p')
                ->select('p')
                ->where('p.id = :id')
                ->setParameter('id', $postId)
                ->getQuery();

            $result = $qb->getSingleResult();
        } catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("post wid id= %s not found", $postId));
        }

        return $result;
    }

    public function getPostWithTagsAndAttachmentsByPostId(int $postId)
    {
        try {
            $qb = $this->createQueryBuilder('p')
                ->select('p', 'tags', 'attachments', 'profile')
                ->leftJoin('p.tags', 'tags')
                ->leftJoin('p.attachments', 'attachments')
                ->leftJoin('p.profile', 'profile')
                ->where('p.id = :id')
                ->setParameter('id', $postId)
            ->getQuery();

            $result = $qb->getSingleResult();
        } catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("post wid id= %s not found", $postId));
        }

        return $result;
    }

    public function getPostWithTagsAndAttachmentsByAlias(string $alias)
    {
        // todo написать метод getWithTagsAndAttachmentsByAlias
    }

    public function getPostsWithTagsAndAttachments(FeedCriteria $criteria)
    {

        try {
            $qb = $this->createQueryBuilder('p')
                ->select('p', 'tags', 'attachments', 'profile')
                ->leftJoin('p.tags', 'tags')
                ->leftJoin('p.attachments', 'attachments')
                ->leftJoin('p.profile', 'profile')
                ->setFirstResult($criteria->getCursor())
                ->setMaxResults($criteria->getLimit())
                ->orderBy('p.'.$criteria->getOrder(), $criteria->getDirection())
                ->getQuery();

            return $qb->getResult();
        } catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("no posts founded"));
        }
    }

    public function getPostsTotal(): int
    {
        $qb = $this->createQueryBuilder('p')
            ->select('count(p)')
            ->getQuery();

        return $qb->getSingleScalarResult();
    }
}
