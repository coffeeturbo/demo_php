<?php
namespace CommentBundle\Comment;

use PostBundle\Entity\Post;

interface CommentAbleEntity
{
    public function getCommentsTotal(): int;
    public function setCommentsTotal(int $total);
    public function getComments(): ?array;
    public function setPost(Post $post);
    public function getPost(): Post;

    public function increaseCommentsTotal();
    public function decreaseCommentsTotal();

}