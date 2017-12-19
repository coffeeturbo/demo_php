<?php
namespace CommentBundle\EventListener;

use CommentBundle\Entity\Comment;
use CommentBundle\Event\CommentEvent;
use CommentBundle\Event\CommentEvents;
use CommentBundle\Service\CommentService;
use PostBundle\Service\PostService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UpdateCommentsTotalListener implements EventSubscriberInterface
{

    private $postService;
    private $commentService;

    public function __construct(
        PostService $postService,
        CommentService $commentService)
    {
        $this->commentService = $commentService;
        $this->postService = $postService;
    }

    public static function getSubscribedEvents()
    {
       return [
           CommentEvents::COMMENT_CREATED => [
               ['updateIncreaseComment'],
               ['updateIncreasePost'],

           ],
           CommentEvents::COMMENT_DELETED => [
               ['onDeleteCommentDecrease'],
               ['onDeletePostDecrease'],
           ]
       ];
    }

    public function updateIncreaseComment(CommentEvent $event)
    {
        $comment = $event->getComment();


        if($comment->getParentCommentId()){
            $parentComment = $comment->getParentComment();

            $parentComment->increaseCommentsTotal();

            if($parentComment instanceof Comment){
                $this->commentService->save($parentComment);
            }
        }

    }

    public function updateIncreasePost(CommentEvent $event)
    {
        $comment = $event->getComment();

        $post = $this->postService->getPostRepository()->getPostById($comment->getPost()->getId());
        $post->increaseCommentsTotal();
        $this->postService->getPostRepository()->save($post);
    }

    public function onDeleteCommentDecrease(CommentEvent $event)
    {
        $comment = $event->getComment();

        if($parentComment = $comment->getParentComment()){
            $parentComment->decreaseCommentsTotal();

            if($parentComment instanceof Comment){
                $this->commentService->save($parentComment);
            }

            $this->commentService->save($parentComment);
        }

    }

    public function onDeletePostDecrease(CommentEvent $event)
    {
        $comment = $event->getComment();
        $post = $this->postService->getPostRepository()->getPostById($comment->getPost()->getId());

        $post->decreaseCommentsTotal();

        $this->postService->getPostRepository()->save($post);
    }

}