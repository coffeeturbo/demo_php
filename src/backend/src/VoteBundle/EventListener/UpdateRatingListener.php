<?php
namespace VoteBundle\EventListener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use VoteBundle\Event\VoteEvent;
use VoteBundle\Event\VoteEvents;
use VoteBundle\Service\VoteService;

class UpdateRatingListener implements EventSubscriberInterface
{

    private $voteService;

    public static function getSubscribedEvents()
    {
        return [
            VoteEvents::VOTE_CREATED => 'onNewVote',
            VoteEvents::VOTE_DELETED => 'onDeleteVote'
        ];
    }

    public function __construct(VoteService $voteService)
    {
        $this->voteService = $voteService;
    }

    public function onNewVote(VoteEvent $event)
    {
        $vote = $event->getVote();

        $profile = $vote->getVoteableEntity()->getProfile();

        $this->voteService->attachVoteToProfile($vote, $profile);
    }

    public function onDeleteVote(VoteEvent $event)
    {
        $vote = $event->getVote();

        $profile = $vote->getVoteableEntity()->getProfile();

        $this->voteService->detachVoteFromProfile($vote, $profile);
    }

}