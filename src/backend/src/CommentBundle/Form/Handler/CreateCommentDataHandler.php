<?php
namespace CommentBundle\Form\Handler;

use AttachmentBundle\Service\AttachmentService;
use CommentBundle\Comment\CommentAbleEntity;
use CommentBundle\Comment\ParentCommentAbleEntity;
use CommentBundle\Entity\Comment;
use CommentBundle\Service\CommentService;
use PostBundle\Service\PostService;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class CreateCommentDataHandler
{

    private $maxAttachmentsLimit;
    private $attachmentService;
    private $postService;
    private $commentService;

    public function __construct(int $maxAttachmentsLimit,
                                AttachmentService $attachmentService,
                                PostService $postService,
                                CommentService $commentService
    ){
        $this->maxAttachmentsLimit = $maxAttachmentsLimit;
        $this->attachmentService = $attachmentService;
        $this->postService = $postService;
        $this->commentService = $commentService;
    }

    public function createFromData(array $data): Comment
    {
        $comment = new Comment();


        if($data['post_id']){
            $this->setPostByPostId($data['post_id'], $comment);
        }

        if($data['parent_id']){
            $this->setParentCommentById($data['parent_id'], $comment);
        }

        $comment
            ->setParentCommentId($data['parent_id']);

        $this->attachmentService
            ->setAttachmentsFromJson($comment, $data['attachments'], $this->maxAttachmentsLimit);

        if(count($comment->getAttachments()) < 1){
            throw new AccessDeniedHttpException("min limit of attachments 1");
        }

        return $comment;
    }

    public function handle(array $data): Comment
    {
        return $this->createFromData($data);
    }

    private function setPostByPostId(int $postId, CommentAbleEntity $entity)
    {
        $post = $this->postService->getPostRepository()->getPostById($postId);
        $entity->setPost($post);
        return $this;
    }

    private function setParentCommentById(?int $id, ParentCommentAbleEntity $entity)
    {
        $comment = $this->commentService->getCommentRepository()->getById($id);
        $entity->setParentComment($comment);
        return $this;
    }
}