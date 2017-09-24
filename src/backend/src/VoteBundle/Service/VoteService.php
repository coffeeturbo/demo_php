<?php
namespace VoteBundle\Service;

use VoteBundle\Entity\Vote;
use VoteBundle\Repository\VoteRepository;

class VoteService
{
    private $voteRepository;

    public function __construct(VoteRepository $voteRepository)
    {
        $this->voteRepository = $voteRepository;
    }

    public function create(Vote $vote)
    {
        $this->voteRepository->save($vote);
    }

}