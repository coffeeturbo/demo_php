<?php

namespace VoteBundle\Vote;

use CommentBundle\Entity\Comment;
use PostBundle\Entity\Post;
use VoteBundle\Entity\Vote;
use VoteBundle\Entity\VoteContentType\VoteContentType;
use VoteBundle\Entity\VoteContentType\VoteContentTypeComment;
use VoteBundle\Entity\VoteContentType\VoteContentTypePost;

trait VoteableEntityTrait
{
    private $votesPositive = 0;
    private $votesNegative = 0;
    private $vote;

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
        if($this instanceof Comment) return new VoteContentTypeComment();
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

    public function getVote(): ?VoteEntity
    {
        return $this->vote;
    }


    public function setVote(VoteEntity $vote)
    {
        $this->vote = $vote;
    }
}