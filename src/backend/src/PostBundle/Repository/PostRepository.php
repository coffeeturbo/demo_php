<?php

namespace PostBundle\Repository;

use AttachmentBundle\Entity\Attachment;
use Doctrine\ORM\NoResultException;
use Doctrine\ORM\QueryBuilder;
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


    private function createIdOrderQB(QueryBuilder $builder, FeedCriteria $criteria)
    {
        $builder->orderBy('p.id', $criteria->getDirection());

        if($cursor = $criteria->getCursor()){
            // desc
            switch(strtolower($criteria->getDirection())){
                case 'desc':
                    $builder->andWhere('p.id < :cursor');
                    break;
                case 'asc':
                    $builder->andWhere('p.id > :cursor');
                    break;

                default:
                    $builder->andWhere('p.id < :cursor');

            }
            $builder->setParameter('cursor', $cursor);
        }
    }

    private function createRatingOrderQB(QueryBuilder $builder, FeedCriteria $criteria)
    {
        $builder->orderBy('p.votesRating', $criteria->getDirection());

        if($cursor = $criteria->getCursor()){
            // desc
            switch(strtolower($criteria->getDirection())){
                case 'desc':
                    $builder->andWhere('p.votesRating < :cursor');
                    break;
                case 'asc':
                    $builder->andWhere('p.votesRating > :cursor');
                    break;

                default:
                    $builder->andWhere('p.votesRating < :cursor');

            }
            $builder->setParameter('cursor', $cursor);
        }
    }

    private function addOrder(QueryBuilder $builder, FeedCriteria $criteria)
    {
        switch(strtolower($criteria->getOrder())){
            case  'id':
                $this->createIdOrderQB($builder, $criteria);
            break;
            case 'votesrating':
                $this->createRatingOrderQB($builder, $criteria);
            break;
            default: throw new NotFoundHttpException(sprintf('unknown order %s', $criteria->getOrder()));
        }
    }


    private function getPostsByCriteria(FeedCriteria $criteria)
    {

        try {
            $qb = $this->createQueryBuilder('p')
                ->select('p');

            $this->addOrder($qb, $criteria);

            if($startDate = $criteria->getStartDate()){
                $qb->andWhere('p.created > :start')
                    ->setParameter('start', $startDate)
                ;
            }

            if($endDate = $criteria->getEndDate()){
                $qb->andWhere('p.created < :end')
                    ->setParameter('end', $endDate)
                ;
            }

            if($profileId = $criteria->getProfileId()){
                $qb->andWhere('p.profile = :profile')
                    ->setParameter('profile', $profileId)
                ;
            }

            $qb->setMaxResults($criteria->getLimit());

            $q = $qb->getQuery();
        } catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("no posts founded"));
        }

        return $q->getResult();
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
            ->addOrderBy('attachments.position', 'ASC')
            ->getQuery();


        return $qb->getResult();
    }

}
