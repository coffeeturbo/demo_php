<?php

namespace CommentBundle\Comment;

interface ParentCommentAbleEntity
{
    public function getParentComment(): ?CommentAbleEntity;
    public function getParentCommentId(): ?int;
    public function setParentComment(?CommentAbleEntity $entity);
}