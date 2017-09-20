<?php
namespace FeedBundle\Service;

use Doctrine\ORM\NoResultException;
use PostBundle\Repository\PostRepository;
use ProfileBundle\Entity\Profile;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FeedService
{
    private $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function getProfileFeed(Profile $profile, int $limit, int $offset = 0)
    {
        try {
            $qb = $this->postRepository->createQueryBuilder('p')
                ->select('p', 'tags', 'attachments', 'profile')
                ->leftJoin('p.tags', 'tags')
                ->leftJoin('p.attachments', 'attachments')
                ->leftJoin('p.profile', 'profile')
                ->where('profile = :profile')
                ->setParameter('profile', $profile)
                ->setFirstResult($offset)
                ->setMaxResults($limit)
                ->getQuery();

        } catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("no posts founded", $id));
        }

        return $qb->getResult();
    }




    public function getProfileFeedTotal(Profile $profile)
    {
        $q = $this->postRepository
            ->createQueryBuilder('p')
            ->select('count(p)')
            ->where('p.profile = :profile')
            ->setParameter('profile', $profile)
            ->getQuery();

        return $q->getSingleScalarResult();
    }
}