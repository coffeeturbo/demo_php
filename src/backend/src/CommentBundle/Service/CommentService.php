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


    public function clearDuplicateCommentsFromTree(array $comments)
    {
        // убираем дубли комментариев из основного дерева
        foreach($comments as $id => $comment){
            /** @var $comment Comment */

            if($comment->getLevel() !== 0){
                unset($comments[$id]);
                continue;
            }
        }
    }

    public function increaseCommentsTotalTree(Comment $comment)
    {

        $parentComments = $this->getParentCommentsByComment($comment);


        // увеличиваем в этом дереве количество комментариев
        array_walk($parentComments, function(Comment $comment){
            $comment->increaseCommentsTotal();
        });


        // сохраняем в базе
        $this->updateComments($parentComments);


    }

    public function decreaseCommentsTotalTree(Comment $comment)
    {
        $parentComments = $this->getParentCommentsByComment($comment);


        // уменьшаем в этом дереве количество комментариев
        array_walk($parentComments, function(Comment $comment){
            $comment->decreaseCommentsTotal();
        });


        // сохраняем в базе
        $this->updateComments($parentComments);
    }

    private function getParentCommentsByComment(Comment $comment){
        // получаем дерево комментариев
        $parentComments = [];
        do {
            if($comment->getParentCommentId()){
                $comment = $this->commentRepository->getById($comment->getParentCommentId());
                $parentComments[] = $comment;
            }

        } while($comment->getParentCommentId());

        return$parentComments;
    }


    public function updateComments(array $comments)
    {
        $this->getCommentRepository()->updateComments($comments);
    }

}