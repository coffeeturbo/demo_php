<?php
namespace VoteBundle\EventListener;

use ProfileBundle\Repository\ProfileRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use VoteBundle\Event\VoteEvent;
use VoteBundle\Event\VoteEvents;

class UpdateRatingListener implements EventSubscriberInterface
{

    private $profileRepository;

    public static function getSubscribedEvents()
    {
        return [
            VoteEvents::VOTE_CREATED => 'onNewVote'
        ];
    }

    public function __construct(ProfileRepository $profileRepository)
    {
        $this->profileRepository = $profileRepository;
    }

    public function onNewVote(VoteEvent $event)
    {
        $vote = $event->getVote();

        $profile = $vote->getVoteableEntity()->getProfile();

        $profile->ratingIncrease();

        $this->profileRepository->save($profile);

    }

}