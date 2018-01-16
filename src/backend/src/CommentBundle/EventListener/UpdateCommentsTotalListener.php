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
           CommentEvents::COMMENT_CREATED => [
               ['updateIncreaseCommentsTotal'],
               ['updateIncreasePost'],

           ],
           CommentEvents::COMMENT_DELETED => [
               ['onDeleteCommentDecreaseCommentsTotal'],
               ['onDeletePostDecrease'],
           ]
       ];
    }

    public function updateIncreaseCommentsTotal(CommentEvent $event)
    {
        $comment = $event->getComment();

        $this->commentService->increaseCommentsTotalTree($comment);
    }

    public function updateIncreasePost(CommentEvent $event)
    {
        $comment = $event->getComment();

        $post = $this->postService->getPostRepository()->getPostById($comment->getPost()->getId());
        $post->increaseCommentsTotal();
        $this->postService->getPostRepository()->save($post);
    }

    public function onDeleteCommentDecreaseCommentsTotal(CommentEvent $event)
    {
        // проверять на дочерние комментарии и удалять их

        $comment = $event->getComment();

        $this->commentService->decreaseCommentsTotalTree($comment);

    }

    public function onDeletePostDecrease(CommentEvent $event)
    {
        $comment = $event->getComment();
        $post = $this->postService->getPostRepository()->getPostById($comment->getPost()->getId());

        $post->decreaseCommentsTotal();

        $this->postService->getPostRepository()->save($post);
    }

}