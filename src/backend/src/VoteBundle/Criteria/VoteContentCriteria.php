<?php
namespace VoteBundle\Criteria;

use FeedBundle\Criteria\Criteria;
use VoteBundle\Entity\VoteContentType\VoteContentType;
use VoteBundle\Entity\VoteType\VoteType;

class VoteContentCriteria extends Criteria
{

    private $contentType;
    private $voteType;
    private $profileId;

    public function __construct($limit, $cursor, VoteContentType $contentType, VoteType $voteType,int $profileId = null)
    {
        parent::__construct($limit, $cursor);

        $this->profileId = $profileId;
        $this->contentType = $contentType;
        $this->voteType = $voteType;
    }

    public function getContentType(): VoteContentType
    {
        return $this->contentType;
    }

    public function setContentType(VoteContentType $contentType)
    {
        $this->contentType = $contentType;
    }

    public function getVoteType(): VoteType
    {
        return $this->voteType;
    }

    public function setVoteType(VoteType $voteType)
    {
        $this->voteType = $voteType;
    }

    public function getProfileId(): ?int
    {
        return $this->profileId;
    }

    public function setProfileId(int $profileId)
    {
        $this->profileId = $profileId;
    }
}