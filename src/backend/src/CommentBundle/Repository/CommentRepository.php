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


    public function markAsDeleted(Comment $comment)
    {
        // todo set as deleted
        $comment->markAsDeleted();
        $comment->markUpdated();

        $em = $this->getEntityManager();
        $em->persist($comment);
        $em->flush();
        // todo так же удалить все аттачменты
    }

    public function delete(){}

    public function getCommentsByPost(int $postId)
    {
        try {
            $qb = $this->createQueryBuilder('c')
                ->select('c', 'p', 'childrenComments', 'parentComment', 'attachments')
                ->join('c.profile', 'p')
                ->leftJoin('c.childrenComments', 'childrenComments')
                ->leftJoin('c.parentComment', 'parentComment')
                ->leftJoin('c.attachments', 'attachments')
                ->orderBy('attachments.position', 'ASC')
                ->where('c.post = :id')
                ->setParameter('id', $postId)
                ->getQuery()
            ;

            $result = $qb->getResult();



        } catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("comment with id= %s not found", $postId));
        }

        return $result;
    }

    public function getPostCommentsByProfile(int $profileId)
    {
        try {
            $qb = $this->createQueryBuilder('c')
                ->select('c', 'p', 'childrenComments', 'parentComment')
                ->join('c.profile', 'p')
                ->leftJoin('c.childrenComments', 'childrenComments')
                ->leftJoin('c.parentComment', 'parentComment')
                ->where('c.profile = :id')
                ->setParameter('id', $profileId)
                ->getQuery()
            ;

            $result = $qb->getResult();
        } catch(NoResultException $e){
            throw new NotFoundHttpException(sprintf("comments with profileId = %s not found", $profileId));
        }

        return $result;
    }
}