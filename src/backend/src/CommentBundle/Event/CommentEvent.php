<?php
namespace CommentBundle\Event;

use CommentBundle\Entity\Comment;
use Symfony\Component\EventDispatcher\Event;

class CommentEvent extends Event
{
    private $comment;

    public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }

    public function getComment(): Comment
    {
        return $this->comment;
    }
}