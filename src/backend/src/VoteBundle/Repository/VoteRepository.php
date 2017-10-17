<?php
namespace VoteBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NoResultException;
use ProfileBundle\Entity\Profile;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use VoteBundle\Entity\Vote;
use VoteBundle\Entity\VoteContentType\VoteContentTypePost;

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


}