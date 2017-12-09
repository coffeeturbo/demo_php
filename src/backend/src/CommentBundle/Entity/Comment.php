<?php
namespace CommentBundle\Entity;

use AppBundle\Entity\ModifyDateEntityInterface;
use AppBundle\Entity\ModifyDateEntityTrait;
use AttachmentBundle\Entity\AttachmentableEntity;
use AttachmentBundle\Entity\AttachmentableEntityTrait;
use Doctrine\Common\Collections\ArrayCollection;
use ProfileBundle\Entity\Profile;
use VoteBundle\Rating\RatingableEntity;
use VoteBundle\Rating\RatingableEntityTrait;
use VoteBundle\Vote\VoteableEntity;
use VoteBundle\Vote\VoteableEntityTrait;

class Comment implements ModifyDateEntityInterface, RatingableEntity, AttachmentableEntity, VoteableEntity
{

    use ModifyDateEntityTrait, RatingableEntityTrait, AttachmentableEntityTrait, VoteableEntityTrait;

    private $id;
    private $postId;


    private $parentId;
    private $profile;

    public function __construct()
    {
        $this->attachments = new ArrayCollection();
        $this->created = new \DateTime();
        $this->markUpdated();
    }


    public function getPostId(): int
    {
        return $this->postId;
    }

    public function setPostId(int $postId): self
    {
        $this->postId = $postId;
        return $this;
    }

    public function getParentId(): ?int
    {
        return $this->parentId;
    }

    public function setParentId($parentId): self
    {
        $this->parentId = $parentId;
        return $this;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setProfile(Profile $profile)
    {
        $this->profile = $profile;
        return $this;
    }
    public function getProfile(): Profile
    {
        return $this->profile;
    }
}