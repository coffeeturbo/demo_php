<?php
namespace CommentBundle\Comment;

trait ParentCommentAbleEntityTrait
{
    private $parentCommentId;
    private $parentComment;

    public function getParentCommentId(): ?int
    {
        return $this->parentCommentId;
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
}