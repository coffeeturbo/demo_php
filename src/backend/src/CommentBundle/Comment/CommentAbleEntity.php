<?php
namespace CommentBundle\Comment;

interface CommentAbleEntity
{
    public function getId();
    public function getCommentsTotal(): int;
    public function setCommentsTotal(int $total);
    public function getComments(): ?array;
    public function increaseCommentsTotal();
    public function decreaseCommentsTotal();
}