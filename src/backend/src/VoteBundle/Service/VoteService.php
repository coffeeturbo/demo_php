<?php
namespace VoteBundle\Service;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use VoteBundle\Entity\Vote;
use VoteBundle\Entity\VoteContentType\VoteContentType;
use VoteBundle\Entity\VoteContentType\VoteContentTypeComment;
use VoteBundle\Entity\VoteContentType\VoteContentTypePost;
use VoteBundle\Entity\VoteType\VoteTypeNegative;
use VoteBundle\Entity\VoteType\VoteTypePositive;
use VoteBundle\Event\VoteEvent;
use VoteBundle\Event\VoteEvents;
use VoteBundle\Repository\VoteRepository;
use VoteBundle\Vote\VoteableEntity;
use VoteBundle\Vote\VoteEntity;

class VoteService
{
    private $voteRepository;
    private $eventDispatcher;
    private $postVoteWeight;
    private $commentVoteWeight;

    public function __construct(
        VoteRepository $voteRepository,
        int $postVoteWeight,
        int $commentVoteWeight,
        EventDispatcherInterface $eventDispatcher)
    {
        $this->voteRepository = $voteRepository;
        $this->eventDispatcher = $eventDispatcher;
        $this->postVoteWeight = $postVoteWeight;
        $this->commentVoteWeight = $commentVoteWeight;
    }

    public function findVote(Vote $vote): ?Vote
    {
       $existsVote = $this->voteRepository->findOneBy([
           'profile' => $vote->getProfile(),
           'contentId' => $vote->getVoteableEntity()->getId(),
           'contentType' => $vote->getVoteableEntity()->getType()->getIntCode(),
       ]);

       return ($existsVote instanceof Vote) ? $existsVote : null;
    }

    public function create(Vote $vote)
    {

        $this->voteRepository->save($vote);

        $this->eventDispatcher->dispatch(
            VoteEvents::VOTE_CREATED,
            new VoteEvent($vote)

        );

    }

    public function attachVote(VoteableEntity $entity, VoteEntity $vote)
    {
        $voteWeight = $this->countVoteWeight($entity->getType());

        switch($vote->getType()->getIntCode()){
            case VoteTypePositive::INT_CODE:
                $entity->increaseVotesRating($voteWeight);
                $entity->increaseVotesPositive();
                break;

            case VoteTypeNegative::INT_CODE:
                $entity->decreaseVotesRating($voteWeight);
                $entity->increaseVotesNegative();
            break;
        }
    }



    public function detach()
    {

    }

    private function countVoteWeight(VoteContentType $type): int{

        switch($type->getIntCode()){
            case VoteContentTypePost::INT_CODE:
                return 1* $this->postVoteWeight;
            case VoteContentTypeComment::INT_CODE:
                return 1 * $this->commentVoteWeight;

            default: return 1;
        }

    }

}