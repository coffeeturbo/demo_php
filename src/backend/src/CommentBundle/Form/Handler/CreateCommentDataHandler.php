<?php
namespace CommentBundle\Form\Handler;

use AttachmentBundle\Service\AttachmentService;
use CommentBundle\Entity\Comment;

class CreateCommentDataHandler
{

    private $maxAttachmentsLimit;
    private $attachmentService;

    public function __construct(int $maxAttachmentsLimit, AttachmentService $attachmentService)
    {
        $this->maxAttachmentsLimit = $maxAttachmentsLimit;
        $this->attachmentService = $attachmentService;
    }

    public function createFromData(array $data): Comment
    {
        $comment = new Comment();

        $comment->setPostId($data['post_id'])->setParentId($data['parent_id']);

        $this->attachmentService
            ->setAttachmentsFromJson($comment, $data['attachments'], $this->maxAttachmentsLimit);

        return $comment;
    }

    public function handle(array $data): Comment
    {
        return $this->createFromData($data);
    }
}