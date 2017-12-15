<?php
namespace CommentBundle\Comment;

use Doctrine\Common\Collections\ArrayCollection;
use PostBundle\Entity\Post;

trait CommentAbleEntityTrait
{

    private $post;
    private $childrenComments;
    private $commentsTotal = 0;

    public function __construct()
    {
        $this->childrenComments = new ArrayCollection();
    }

    public function getPost(): Post
    {
        return $this->post;
    }

    public function setPost(Post $post)
    {
        $this->post = $post;
    }

    public function getCommentsTotal(): int
    {
        return $this->commentsTotal;
    }

    public function increaseCommentsTotal(){
        $this->commentsTotal++;
        return $this;
    }

    public function decreaseCommentsTotal(){
        $this->commentsTotal--;
        return $this;
    }

    public function setCommentsTotal(int $total)
    {
        $this->commentsTotal = $total;
        return $this;
    }

    public function getComments(): ?array
    {
        return $this->childrenComments->toArray();
    }


}