<?php
namespace CommentBundle\Repository;

use CommentBundle\Entity\Comment;
use Doctrine\ORM\EntityRepository;

class CommentRepository extends EntityRepository
{
    public function create(Comment $comment)
    {
        $em = $this->getEntityManager();
        $em->persist($comment);
        $em->flush($comment);
    }
}