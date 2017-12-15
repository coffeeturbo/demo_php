<?php
namespace CommentBundle\EventListener;

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
           CommentEvents::COMMENT_CREATED => 'onNewComment',
           CommentEvents::COMMENT_DELETED => 'onDeleteComment'
       ];
    }

    public function onNewComment(CommentEvent $event)
    {
        $comment = $event->getComment();

        $post = $this->postService->getPostRepository()->getPostById($comment->getPost()->getId());

        if($comment->getParentCommentId()){
            $parentComment = $comment->getParentComment();

            dump($parentComment);
            $parentComment->increaseCommentsTotal();
            dump($parentComment);
            $this->commentService->save($parentComment);
        }

//        $this->postService->getPostRepository()->save($post);

    }

    public function onDeleteComment(CommentEvent $event)
    {
        $comment = $event->getComment();

        $post = $this->postService->getPostRepository()->getPostById($comment->getPostId());

        if($comment->getParentCommentId()){
            $comment->decreaseCommentsTotal();
        }

//        $this->postService->getPostRepository()->save($post);
        $this->commentService->save($comment);

    }

}