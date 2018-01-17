<?php
namespace CommentBundle\Comment;

use CommentBundle\Entity\Comment;

trait ParentCommentAbleEntityTrait
{
    private $parentCommentId;
    /** @var  Comment */
    private $parentComment;
    private $level = 0;

    public function getParentCommentId(): ?int
    {
        return $this->parentCommentId ;
    }

    public function setParentCommentId(?int $parentCommentId)
    {
        $this->parentCommentId = $parentCommentId;
        return $this;
    }

    public function getParentComment(): ?CommentAbleEntity
    {
        return $this->parentComment;
    }

    public function setParentComment(?CommentAbleEntity $parentComment)
    {
        $this->parentComment = $parentComment;
        return $this;
    }

    public function getLevel(): int
    {
        return $this->level;
    }

    public function setLevel(int $level)
    {
        $this->level = $level;
        return $this;
    }
}