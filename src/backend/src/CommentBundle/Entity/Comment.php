<?php
namespace CommentBundle\Entity;

use AppBundle\Delete\DeleteAble;
use AppBundle\Delete\DeleteTrait;
use AppBundle\Entity\ModifyDateEntityInterface;
use AppBundle\Entity\ModifyDateEntityTrait;
use AttachmentBundle\Entity\AttachmentableEntity;
use AttachmentBundle\Entity\AttachmentableEntityTrait;
use CommentBundle\Comment\CommentAbleEntity;
use CommentBundle\Comment\CommentAbleEntityTrait;
use CommentBundle\Comment\ParentCommentAbleEntity;
use CommentBundle\Comment\ParentCommentAbleEntityTrait;
use Doctrine\Common\Collections\ArrayCollection;
use PostBundle\Entity\Post;
use ProfileBundle\Entity\Profile;
use VoteBundle\Rating\RatingableEntity;
use VoteBundle\Rating\RatingableEntityTrait;
use VoteBundle\Vote\VoteableEntity;
use VoteBundle\Vote\VoteableEntityTrait;

class Comment implements ModifyDateEntityInterface, RatingableEntity,
    AttachmentableEntity,
    VoteableEntity,
    CommentAbleEntity,
    ParentCommentAbleEntity,
    DeleteAble
{

    use ModifyDateEntityTrait,
        RatingableEntityTrait,
        AttachmentableEntityTrait,
        VoteableEntityTrait,
        CommentAbleEntityTrait,
        ParentCommentAbleEntityTrait,
        DeleteTrait
        ;

    private $id;
    private $profile;


    private $post;
    public function getPost(): Post
    {
        return $this->post;
    }

    public function setPost(Post $post)
    {
        $this->post = $post;
    }

    public function __construct()
    {
        $this->attachments = new ArrayCollection();
        $this->childrenComments = new ArrayCollection();
        $this->created = new \DateTime();
        $this->markUpdated();
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