<?php
namespace VoteBundle\Rating;

interface RatingableEntity
{
    public function getVotesRating(): int;
    public function increaseVotesRating(int $inc);
    public function decreaseVotesRating(int $dec);
}