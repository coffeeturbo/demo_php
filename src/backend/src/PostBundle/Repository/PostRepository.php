<?php

namespace PostBundle\Repository;

use AttachmentBundle\Entity\Attachment;
use Doctrine\ORM\NoResultException;
use FeedBundle\Criteria\Criteria;
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

        $em->flush();
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


    private function getPostsByCriteria(Criteria $criteria)
    {
        try {
            $qb = $this->createQueryBuilder('p')
                ->select('p')
                ->orderBy('p.'.$criteria->getOrder(), $criteria->getDirection())
                ->setFirstResult($criteria->getCursor())
                ->setMaxResults($criteria->getLimit())
                ->getQuery();

        } catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("no posts founded"));
        }

        return $qb->getResult();
    }

    public function getPostWithTagsAndAttachmentsByPostId(int $postId)
    {
        try {
            $qb = $this->createQueryBuilder('p')
                ->select('p', 'tags', 'attachments', 'profile')
                ->leftJoin('p.tags', 'tags')
                ->leftJoin('p.attachments', 'attachments')
                ->orderBy('attachments.position', 'ASC')
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

        $posts = $this->getPostsByCriteria($criteria);

        $postIds = array_map(function(Post $post){
            return $post->getId();
        }, $posts);

        $qb = $this->createQueryBuilder('p')
            ->select('p', 'tags', 'attachments')
            ->leftJoin('p.tags', 'tags')
            ->leftJoin('p.attachments', 'attachments')
            ->where('p.id IN (:postIds)')
            ->setParameter('postIds', $postIds)
            ->orderBy('p.'.$criteria->getOrder(), $criteria->getDirection())
            ->getQuery();


        return $qb->getResult();
    }

}
