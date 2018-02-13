<?php

namespace PostBundle\Repository;

use AttachmentBundle\Entity\Attachment;
use Doctrine\ORM\NoResultException;
use FeedBundle\Criteria\FeedCriteria;
use PostBundle\Entity\Post;
use PostBundle\Repository\Command\AddOrder;
use PostBundle\Repository\Command\AddTags;
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


    private function getHotPosts(FeedCriteria $criteria)
    {
        try {

            $startDate = new \DateTime();
            $startDate->sub(new \DateInterval('P900D'));
            $criteria->setStartDate($startDate);


            $cursorWhere='';
            if($cursor = $criteria->getCursor()){
                $cursorWhere = sprintf("WHERE p.id < %s", $cursor);
            }

            $q = sprintf("SELECT
                            p,
                        (
                              (p.votesPositive + p.votesNegative) 
                              / (CURRENT_TIMESTAMP() - (p.created))*3600
                        ) AS rating_speed
                        
                        FROM %s p
                        %s
                        ORDER BY rating_speed DESC
                        "
                , Post::class, $cursorWhere);

            $q = $this->getEntityManager()->createQuery($q);


            $q->setMaxResults($criteria->getLimit());


        } catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("no posts founded"));
        }

        // получаем из смешанного массива не смешанный

        return array_map(function(array $post){
            return $post[0];
        }, $q->getResult());
    }

    private function getPostsByCriteria(FeedCriteria $criteria)
    {
        try {
            $qb = $this->createQueryBuilder('p')
                ->select('p', 'tags')
                ->leftJoin('p.tags', 'tags')
            ;

            AddOrder::addOrder($qb, $criteria);
            AddTags::addOrder($qb,$criteria);

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

    public function getPostsWithTagsAndAttachments(FeedCriteria $criteria)
    {

        $posts = [];

        switch($criteria->getOrder()){
            case 'hot':
                $posts =  $this->getHotPosts($criteria);
                break;
            default:
                $posts = $this->getPostsByCriteria($criteria);
        }


        $postIds = array_map(function(Post $post){
            return $post->getId();
        }, $posts);

        $qb = $this->createQueryBuilder('p')
            ->select('p', 'tags', 'attachments')
            ->leftJoin('p.tags', 'tags')
            ->leftJoin('p.attachments', 'attachments')
            ->where('p.id IN (:postIds)')
            ->setParameter('postIds', $postIds)
            ->addOrderBy('attachments.position', 'ASC');


        $query =  $qb->getQuery();

        $postsWithAttachments = $query->getResult();

        array_merge_recursive( $posts, $postsWithAttachments);


        return $posts;
    }

    public function getAttachmentsAndTagsByPosts(array $posts)
    {
        $postIds = array_map(function(Post $post){
            return $post->getId();
        }, $posts);

        $qb = $this->createQueryBuilder('p')
            ->select('p', 'tags', 'attachments')
            ->leftJoin('p.tags', 'tags')
            ->leftJoin('p.attachments', 'attachments')
            ->where('p.id IN (:postIds)')
            ->setParameter('postIds', $postIds)
            ->addOrderBy('attachments.position', 'ASC');


        $query =  $qb->getQuery();

        $postsWithAttachments = $query->getResult();

        array_merge_recursive( $posts, $postsWithAttachments);


        return $posts;
    }

    public function searchAdditions($query){
        return  $this->createQueryBuilder('p')
            ->select('p.id, p.title')
            ->where('p.title LIKE :query')
            ->setParameter('query', '%'.$query.'%')
            ->orderBy('p.votesRating','DESC')
            ->setMaxResults(5)
            ->getQuery()->getArrayResult()
            ;
    }


    public function searchFull($query, $cursor = null){
        $qb = $this->createQueryBuilder('p')
            ->select('p')
            ->where('p.title LIKE :query')
            ->setParameter('query', '%'.$query.'%')
            ->orderBy('p.id','DESC')
            ->setMaxResults(20);

            if($cursor) {
                $qb->andWhere('p.id < :cursor')
                ->setParameter('cursor', $cursor)
                ;

            }

            $posts = $qb->getQuery()->getResult();

        return $this->getAttachmentsAndTagsByPosts($posts);
    }

}
