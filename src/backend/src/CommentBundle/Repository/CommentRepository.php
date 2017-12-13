<?php
namespace CommentBundle\Repository;

use AttachmentBundle\Entity\Attachment;
use CommentBundle\Entity\Comment;
use Doctrine\ORM\EntityRepository;

class CommentRepository extends EntityRepository
{
    public function create(Comment $comment)
    {
        $em = $this->getEntityManager();
        $em->persist($comment);


        // сохраняем аттачменты
        $attachmentRep = $em->getRepository(Attachment::class);
        $attachmentRep->saveAttachments($comment);
        $em->flush($comment);
    }

    public function save(Comment $comment)
    {
        $this->create($comment);
    }
}