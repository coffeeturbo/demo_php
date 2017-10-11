<?php

namespace VoteBundle\Vote;

use PostBundle\Entity\Post;
use VoteBundle\Entity\VoteContentType\VoteContentType;
use VoteBundle\Entity\VoteContentType\VoteContentTypePost;

trait VoteableEntityTrait
{
    private $votesPositive = 0;
    private $votesNegative = 0;

    public function getVotesPositive(): int
    {
        return $this->votesPositive;
    }

    public function getVotesNegative(): int
    {
        return $this->votesNegative;
    }


    public function getType(): VoteContentType
    {
        if($this instanceof Post) return new VoteContentTypePost();
        throw new \Exception("unknown type votable entity type");
    }


    public function increaseVotesNegative()
    {
        $this->votesNegative++;
    }

    public function decreaseVotesNegative()
    {
        $this->votesNegative--;
    }

    public function increaseVotesPositive()
    {
        $this->votesPositive++;
    }

    public function decreaseVotesPositive()
    {
        $this->votesPositive--;
    }
}