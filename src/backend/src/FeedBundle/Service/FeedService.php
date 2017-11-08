<?php
namespace FeedBundle\Service;

use Doctrine\ORM\NoResultException;
use PostBundle\Entity\Post;
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

        $posts = $this->getProfilePosts($profile, $limit, $offset);

        $postIds = array_map(function(Post $post){
            return $post->getId();
        }, $posts);

        $qb = $this->postRepository->createQueryBuilder('p')
            ->select('p', 'tags', 'attachments')
            ->leftJoin('p.tags', 'tags')
            ->leftJoin('p.attachments', 'attachments')
            ->where('p.id IN (:postIds)')
            ->setParameter('postIds', $postIds)
            ->orderBy('p.id', 'DESC')
            ->getQuery();


        return $qb->getResult();
    }

    private function getProfilePosts(Profile $profile, int $limit, int $offset = 0)
    {
        try {
            $qb = $this->postRepository->createQueryBuilder('p')
                ->select('p')
                ->where('p.profile = :profile')
                ->orderBy('p.id', 'DESC')
                ->setParameter('profile', $profile)
                ->setFirstResult($offset)
                ->setMaxResults($limit)
                ->getQuery();

        } catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("no posts founded for profile %s", $profile->getId()));
        }

        return $qb->getResult();
    }

}