<?php
namespace VoteBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use ProfileBundle\Entity\Profile;
use VoteBundle\Entity\VoteContentType\VoteContentType;
use VoteBundle\Entity\VoteType\VoteType;
use VoteBundle\Vote\VoteableEntity;
use VoteBundle\Vote\VoteEntity;

class Vote implements VoteEntity
{
    private $id;
    private $type;
    private $profile;

    private $contentType;
    private $contentId;


    private $voteableEntity;

    public function __construct(Profile $profile, VoteableEntity $entity, VoteType $type = null)
    {
        $this->profile = $profile;
        $this->setVoteableEntity($entity);

        $this->type =  isset($type) ? $type->getIntCode() : null;
    }

    public function getVoteableEntity(): VoteableEntity
    {
        return $this->voteableEntity;
    }

    public function setVoteableEntity(VoteableEntity $entity): self
    {
        $this->voteableEntity = $entity;

        $this->contentId = $entity->getId();

        $this->contentType = (VoteContentType::createFromObject($entity))->getIntCode();

        return $this;
    }

    public function _construct()
    {
        $this->profile = new ArrayCollection();
    }

    public function getProfile(): Profile
    {
        return $this->profile;
    }

    public function setProfile(Profile $profile): self
    {
        $this->profile = $profile;
        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getType(): VoteType
    {
        return  VoteType::createFromIntCode($this->type);
    }

    public function setType(VoteType $type): self
    {
        $this->type = $type->getIntCode();
        return $this;
    }


    public function getContentId(): int
    {
        return $this->contentId;
    }
    /*
    public function getContentType(): VoteContentType
    {
        return VoteContentType::createFromIntCode($this->contentType);
    }

    public function setContentType(VoteContentType $contentType): self
    {
        $this->contentType = $contentType->getIntCode();
        return $this;
    }

    public function setContentId(int $contentId): self
    {
        $this->contentId = $contentId;
        return $this;
    }*/



}