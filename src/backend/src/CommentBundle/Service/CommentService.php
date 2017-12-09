<?php
namespace CommentBundle\Service;

use CommentBundle\Entity\Comment;
use CommentBundle\Repository\CommentRepository;

class CommentService
{

    private $commentRepository;

    public function __construct(CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    public function create(Comment $comment)
    {
        $this->commentRepository->create($comment);
    }
}