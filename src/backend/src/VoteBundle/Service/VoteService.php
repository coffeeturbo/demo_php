<?php
namespace VoteBundle\Service;

use ProfileBundle\Entity\Profile;
use ProfileBundle\Repository\ProfileRepository;
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
    private $profileRepository;

    public function __construct(
        VoteRepository $voteRepository,
        int $postVoteWeight,
        int $commentVoteWeight,
        EventDispatcherInterface $eventDispatcher,
        ProfileRepository $profileRepository
    ){
        $this->voteRepository = $voteRepository;
        $this->eventDispatcher = $eventDispatcher;
        $this->postVoteWeight = $postVoteWeight;
        $this->commentVoteWeight = $commentVoteWeight;
        $this->profileRepository = $profileRepository;
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

    public function delete(Vote $vote)
    {
        // todo сделать проверку на хозяина поста или модератора

        $this->voteRepository->remove($vote);

        $this->eventDispatcher->dispatch(
            VoteEvents::VOTE_DELETED,
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

    public function detach(VoteableEntity $entity, Vote $vote)
    {
        $voteWeight = $this->countVoteWeight($entity->getType());

        switch($vote->getType()->getIntCode()){
            case VoteTypePositive::INT_CODE:
                $entity->decreaseVotesRating($voteWeight);
                $entity->decreaseVotesPositive();
                break;

            case VoteTypeNegative::INT_CODE:
                $entity->increaseVotesRating($voteWeight);
                $entity->decreaseVotesNegative();
                break;
        }
    }

    public function attachVoteToProfile(Vote $vote, Profile $profile)
    {
        $voteWeight = $this->countVoteWeight($vote->getVoteableEntity()->getType());

        switch($vote->getType()->getIntCode()){
            case VoteTypePositive::INT_CODE:
                $profile->increaseVotesRating($voteWeight);
                break;
            case VoteTypeNegative::INT_CODE:
                $profile->decreaseVotesRating($voteWeight);
                break;
            default:
                throw new \Exception(
                    sprintf("unknown vote type %s", $vote->getType()->getStringCode())
                );

        }

        $this->profileRepository->save($profile);
    }

    public function detachVoteFromProfile(Vote $vote, Profile $profile)
    {
        $voteWeight = $this->countVoteWeight($vote->getVoteableEntity()->getType());
        switch($vote->getType()->getIntCode()){
            case VoteTypePositive::INT_CODE:
                $profile->decreaseVotesRating($voteWeight);
                break;
            case VoteTypeNegative::INT_CODE:
                $profile->increaseVotesRating($voteWeight);
                break;
            default:
                throw new \Exception(
                    sprintf("unknown vote type %s", $vote->getType()->getStringCode())
                );

        }

        $this->profileRepository->save($profile);
    }

    private function countVoteWeight(VoteContentType $type): int
    {

        switch($type->getIntCode()){
            case VoteContentTypePost::INT_CODE:
                return 1* $this->postVoteWeight;
            case VoteContentTypeComment::INT_CODE:
                return 1 * $this->commentVoteWeight;

            default: return 1;
        }

    }

}