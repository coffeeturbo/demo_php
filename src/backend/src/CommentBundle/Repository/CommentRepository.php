<?php
namespace CommentBundle\Repository;

use AttachmentBundle\Entity\Attachment;
use CommentBundle\Entity\Comment;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\NoResultException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CommentRepository extends EntityRepository
{
    public function create(Comment $comment)
    {
        $this->save($comment);
    }

    public function save(Comment $comment)
    {
        $em = $this->getEntityManager();
        $em->persist($comment);


        // сохраняем аттачменты
        $attachmentRep = $em->getRepository(Attachment::class);
        $attachmentRep->saveAttachments($comment);
        $em->flush($comment);
    }

    public function getById(int $commentId): Comment
    {
        try {
            $qb = $this->createQueryBuilder('c')
                ->select('c')
                ->where('c.id = :id')
                ->setParameter('id', $commentId)
                ->getQuery();

            $result = $qb->getSingleResult();
        } catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("comment with id= %s not found", $commentId));
        }

        return $result;
    }

    public function delete(Comment $comment)
    {
        // todo set as deleted
        // todo так же удалить все аттачменты
    }
}