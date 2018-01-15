<?php
namespace CommentBundle\Comment;

use CommentBundle\Entity\Comment;
use Doctrine\Common\Collections\ArrayCollection;

trait CommentAbleEntityTrait
{


    private $childrenComments;
    private $commentsTotal = 0;

    public function __construct()
    {
        $this->childrenComments = new ArrayCollection();
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

    public function addComment(Comment $comment)
    {

        $idx = $this->childrenComments->indexOf($comment);

        if($idx === false) $this->childrenComments->add($comment);
        return $this;
    }

    public function getComments(): ?array
    {
        return $this->childrenComments->toArray();
    }


}