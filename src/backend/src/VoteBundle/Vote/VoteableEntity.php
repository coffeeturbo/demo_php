<?php
namespace VoteBundle\Vote;

use ProfileBundle\Entity\Profile;
use VoteBundle\Entity\VoteContentType\VoteContentType;

interface VoteableEntity
{
    public function getId();
    public function getType(): VoteContentType;

    public function getProfile(): Profile;

    public function getVotesRating(): int;
    public function increaseVotesRating(int $inc);
    public function decreaseVotesRating(int $dec);

    public function getVotesNegative(): int;
    public function getVotesPositive(): int;

    public function increaseVotesNegative();
    public function decreaseVotesNegative();

    public function increaseVotesPositive();
    public function decreaseVotesPositive();

}