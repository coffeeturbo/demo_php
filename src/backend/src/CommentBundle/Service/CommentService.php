<?php
namespace CommentBundle\Service;

use CommentBundle\Entity\Comment;
use CommentBundle\Event\CommentEvent;
use CommentBundle\Event\CommentEvents;
use CommentBundle\Repository\CommentRepository;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CommentService
{

    private $commentRepository;
    private $eventDispatcher;

    public function __construct(CommentRepository $commentRepository,
        EventDispatcherInterface $eventDispatcher
    ){
        $this->eventDispatcher = $eventDispatcher;
        $this->commentRepository = $commentRepository;
    }

    public function create(Comment $comment)
    {

        $this->commentRepository->create($comment);

        $this->eventDispatcher->dispatch(
            CommentEvents::COMMENT_CREATED,
            new CommentEvent($comment)
        );
    }

    public function save(Comment $comment)
    {
        $this->commentRepository->save($comment);
    }


    public function markAsDeleted(Comment $comment)
    {

        $this->commentRepository->markAsDeleted($comment);

        // удаляем дочерние коменты
        if($comment->getComments()){
            foreach($comment->getComments() as $nestedComment){
                $this->markAsDeleted($nestedComment);
            }
        }

        $this->eventDispatcher->dispatch(
            CommentEvents::COMMENT_DELETED,
            new CommentEvent($comment)
        );
    }

    public function delete(){
        $this->commentRepository->delete();
    }

    public function getCommentRepository()
    {
        return $this->commentRepository;
    }

}