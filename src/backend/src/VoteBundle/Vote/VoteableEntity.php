<?php
namespace VoteBundle\Vote;

use VoteBundle\Entity\VoteContentType\VoteContentType;

interface VoteableEntity
{
    public function getId();
    public function getType(): VoteContentType;

    public function getVotesRating(): int;

    public function getVotesNegative(): int;
    public function getVotesPositive(): int;

    public function attachVote(VoteEntity $entity);

}