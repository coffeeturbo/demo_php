<?php

namespace CommentBundle\Comment;

interface ParentCommentAbleEntity
{
    public function getParentComment(): ?CommentAbleEntity;
    public function getParentCommentId(): ?int;
    public function setParentComment(?CommentAbleEntity $entity);
    public function setLevel(int $level);
    public function getLevel():int;
}