<?php
namespace FeedBundle\Strategy;

use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use VoteBundle\Entity\Vote;

class VotedFeedStrategy extends FeedStrategy
{
    function getPosts()
    {
        if(!$this->feedCriteria->getProfileId())throw new BadRequestHttpException('profile id required');

        // получаем войты
        $voteRepositrory = $this->getPostRepository()->getEntityManager()->getRepository(Vote::class);
        // получаем посты из войтов

        $this->posts = $voteRepositrory->getVotedPostsByCriteria($this->feedCriteria);


        return $this->posts;
    }

}