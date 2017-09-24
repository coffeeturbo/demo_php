<?php
namespace VoteBundle\Vote;

use VoteBundle\Entity\VoteType\VoteType;

interface VoteEntity
{
    public function getId();
    public function getType(): VoteType;
    public function setType(VoteType $type);
//    public function getContentId();
//    public function getContentType();

    public function getVoteableEntity();
    public function setVoteableEntity(VoteableEntity $entity);
}