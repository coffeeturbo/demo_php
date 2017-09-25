<?php

namespace VoteBundle\Vote;

use PostBundle\Entity\Post;
use VoteBundle\Entity\VoteContentType\VoteContentType;
use VoteBundle\Entity\VoteContentType\VoteContentTypePost;

trait VoteableEntityTrait
{
    private $votesRating = 0;
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

    public function getVotesRating(): int
    {
        return $this->votesRating;
    }


    public function getType(): VoteContentType
    {
        if($this instanceof Post) return new VoteContentTypePost();
        throw new \Exception("unknown type votable entity type");
    }

    public function increaseVotesRating(int $inc)
    {
        $this->votesRating += $inc;
    }

    public function decreaseVotesRating(int $dec)
    {
        $this->votesRating -= $dec;
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