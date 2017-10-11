<?php
namespace VoteBundle\Rating;

trait RatingableEntityTrait
{
    private $votesRating = 0;

    public function increaseVotesRating(int $inc)
    {
        $this->votesRating += $inc;
    }

    public function decreaseVotesRating(int $dec)
    {
        $this->votesRating -= $dec;
    }

    public function getVotesRating(): int
    {
        return $this->votesRating;
    }
}