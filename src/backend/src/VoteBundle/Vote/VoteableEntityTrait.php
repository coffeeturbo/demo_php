<?php

namespace VoteBundle\Vote;

use PostBundle\Entity\Post;
use VoteBundle\Entity\VoteContentType\VoteContentType;
use VoteBundle\Entity\VoteContentType\VoteContentTypePost;
use VoteBundle\Entity\VoteType\VoteTypeNegative;
use VoteBundle\Entity\VoteType\VoteTypePositive;

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

    public function attachVote(VoteEntity $entity)
    {

        // TODO Добавить вес лайка и вес дизлайка
        switch($entity->getType()->getIntCode()){
            case VoteTypePositive::INT_CODE:
                $this->votesRating += 1;
                $this->votesPositive++;
            break;

            case VoteTypeNegative::INT_CODE:
                $this->votesRating -= 1;
                $this->votesNegative++;
            break;
        }

        return $this;
    }

    public function getType(): VoteContentType
    {
        if($this instanceof Post) return new VoteContentTypePost();
        throw new \Exception("unknown type votable entity type");
    }
}