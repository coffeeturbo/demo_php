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


    private function addChildrenComment (&$comments, $children ){

        if(count($comments)==0){
            $comments[] = $children;
        } else{
            foreach($comments as $idx => $comment){
                if($comment['id'] === $children['id']) {
                    $comments[$idx] = $children;
                    break;
                }
            }
        }


    }


    public function addChildComment($parent, $child){
        if(isset($child['parentComment']) && !is_null($child['parentComment']['id'])){
            if($parent['id'] == $child['parentComment']['id']){

                $this->addChildrenComment($parent['childrenComments'], $child);
                return true;
            }

        }

        return false;
    }

    public function clearDuplicateCommentsFromTree(array &$comments): ?array
    {


        return (new ChainBuilder($comments))->buildChain();


//        foreach($comments as  $comment){
//            foreach($comments as $idx => $childComment){
//                if($this->addChildComment($childComment, $comment )){
//
//
//                    unset($comments[$idx]);
//                    continue(2);
//                }
//
//            }
//        }






        // убираем дубли комментариев из основного дерева
//        foreach($comments as $id => $comment){
//            /** @var $comment Comment */
//
//            if(is_array($comment)){
//
//                if($comment['level']!== 0){
//                    unset($comments[$id]);
//                    continue;
//                }
//
//            } elseif($comment instanceof Comment){
//                if($comment->getLevel() !== 0){
//                    unset($comments[$id]);
//                    continue;
//                }
//            }
//        }
    }

    public function increaseCommentsTotalTree(Comment $comment)
    {

        $parentComments = $this->getParentCommentsByComment($comment);

        dump($parentComments);
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
            if($parentComment = $comment->getParentComment()){
                $comment = $this->commentRepository->getById($parentComment->getId());
                $parentComments[] = $comment;
            }

        } while($comment->getParentComment());

        return $parentComments;
    }


    public function updateComments(array $comments)
    {
        $this->getCommentRepository()->updateComments($comments);
    }

}