<?php
namespace VoteBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NoResultException;
use FeedBundle\Criteria\FeedCriteria;
use PostBundle\Entity\Post;
use ProfileBundle\Entity\Profile;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use VoteBundle\Entity\Vote;
use VoteBundle\Entity\VoteContentType\VoteContentTypeComment;
use VoteBundle\Entity\VoteContentType\VoteContentTypePost;
use VoteBundle\Entity\VoteType\VoteTypeAll;

class VoteRepository extends EntityRepository
{
    public function save(Vote $vote)
    {
        $em = $this->getEntityManager();
        $em->persist($vote);
        $em->flush($vote);
    }

    public function remove(Vote $vote)
    {
        $em = $this->getEntityManager();
        $em->remove($vote);
        $em->flush();
    }


    public function getVotesByPostIds(array $postIds, Profile $profile){
        try{
            $votes = $this->findBy([
                'profile' => $profile->getId(),
                'contentType' => VoteContentTypePost::INT_CODE,
                'contentId' => $postIds,
            ]);
        } catch(NoResultException $e){
            return new NotFoundHttpException();
        }

        return $votes;

    }

    public function getVoteByPost(Post $post, Profile $profile): ?Vote
    {
        $vote = $this->findOneBy([
            'profile' => $profile->getId(),
            'contentType' => $post->getType()->getIntCode(),
            'contentId' => $post->getId(),
        ]);

        return $vote instanceof Vote ? $vote : null;
    }

    public function getVotesByCommentIds(array $commentIds, Profile $profile)
    {
        try{
            $votes = $this->findBy([
                'profile' => $profile->getId(),
                'contentType' => VoteContentTypeComment::INT_CODE,
                'contentId' => $commentIds,
            ]);
        } catch(NoResultException $e){
            return new NotFoundHttpException();
        }

        return $votes;
    }

    public function getByCriteria(FeedCriteria $criteria)
    {
        $qb = $this->createQueryBuilder('p')
            ->select('p')
        ;

        // todo тут не доделал

        $qb->orderBy('p.id', $criteria->getDirection());



        if($cursor = $criteria->getCursor()){
            // desc
            $vote = $this->getEntityManager()
                ->getRepository('VoteBundle:Vote')->find($cursor);

            switch(strtolower($criteria->getDirection())){
                case 'desc':
                    $qb->andWhere('p.id < :cursor');
                    break;
                case 'asc':
                    $qb->andWhere('p.id < :cursor');
                    break;

                default:
                    $qb->andWhere('p.id < :cursor');

            }

//            $qb->setParameter('created', $vote->getCreated());
            $qb->setParameter('cursor', $cursor);
        }


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

        if($type = $criteria->getVoteType()){
            if(!$type instanceof VoteTypeAll){
                $qb->andWhere('p.type = :type')
                    ->setParameter('type', $type->getIntCode())
                ;
            }


        }

        $qb->andWhere('p.contentType = :content_type')
            ->setParameter('content_type', VoteContentTypePost::INT_CODE)
        ;


        $qb->setMaxResults($criteria->getLimit());

        $q = $qb->getQuery();
        return  $q->getResult();
    }


    public function getVotedPostsByCriteria(FeedCriteria $contentCriteria){
        try{

            $votes = $this->getByCriteria($contentCriteria);

            // находим посты к лайкам
            $postIds = array_map(function(Vote $vote){
                return $vote->getContentId();
            }, $votes);



            $postRep = $this->getEntityManager()->getRepository(Post::class);


            // прикрепляем лайки к постам
            $posts = $postRep->findBy(['id' => $postIds]);

            // формируем массив постов в том порядке в котором лайкнуты посты
            $postsByIds = array_map(function($id) use ($posts){
                foreach($posts as $dbPost){
                    /** @var $dbPost Post */
                    if($id === $dbPost->getId()) return $dbPost;
                }
            }, $postIds);

            array_walk($postsByIds, function(Post $post) use ($votes){
                /** @var Vote $vote */
                foreach($votes as $vote) {
                    if($post->getId() === $vote->getContentId()){
                        $post->setVote($vote);
                        break;
                    }
                }
            });

        } catch(NoResultException $e){
            return new NotFoundHttpException();
        }

        return $postsByIds;
    }

    public function getVotedContentByCriteria(FeedCriteria $contentCriteria)
    {
        try{

            $criteria = [
                'profile' => $contentCriteria->getProfileId(),
            ];

            if($type=$contentCriteria->getVoteType())
                $criteria = array_merge($criteria, ['type' => $type->getIntCode()]);

//            if($contentType = $contentCriteria->getContentType())
//                $criteria = array_merge($criteria, ['contentType' => $contentType->getIntCode()]);

            $votes = $this->findBy($criteria);

            $postIds = array_map(function(Vote $vote){
                return $vote->getContentId();
            }, $votes);

            $postRep = $this->getEntityManager()->getRepository(Post::class);

            $posts = $postRep->findBy(['id' => $postIds]);

            array_walk($posts, function(Post $post) use ($votes){
                /** @var Vote $vote */
                foreach($votes as $vote) {
                    if($post->getId() === $vote->getContentId()){
                        $post->setVote($vote);
                        break;
                    }
                }
            });

        } catch(NoResultException $e){
            return new NotFoundHttpException();
        }

        return $posts;
    }


}