<?php
namespace FeedBundle\Strategy;

use VoteBundle\Entity\Vote;

class VotedFeedStrategy extends FeedStrategy
{
    function getPosts()
    {
        // получаем войты
        $voteRepositrory = $this->getPostRepository()->getEntityManager()->getRepository(Vote::class);
        // получаем посты из войтов

        $this->posts = $voteRepositrory->getVotedPostsByCriteria($this->feedCriteria);


        return $this->posts;
    }

}