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
    private $parentId;
    private $profile;

    public function __construct()
    {
        $this->attachments = new ArrayCollection();
        $this->created = new \DateTime();
        $this->markUpdated();
    }

    public function getParentId()
    {
        return $this->parentId;
    }

    public function setParentId($parentId)
    {
        $this->parentId = $parentId;
    }
    public function getId()
    {
        return $this->id;
    }

    public function getProfile(): Profile
    {
        return $this->profile;
    }
}