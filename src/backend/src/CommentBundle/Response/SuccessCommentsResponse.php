<?php
namespace CommentBundle\Response;

use CommentBundle\Entity\Comment;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SuccessCommentsResponse extends JsonResponse implements \JsonSerializable
{
    private $entity;

    function __construct(Comment $entity = null, bool $isCreated = false)
    {
        $this->entity = $entity;
        parent::__construct(self::jsonSerialize(), $isCreated ? Response::HTTP_CREATED : Response::HTTP_OK);
    }


    function jsonSerialize()
    {
        // TODO: Implement jsonSerialize() method.
    }

    public function createMockEntity(): Comment
    {

        $entity = new Comment();
        $entity
            ->setParentCommentId(122)
        ;

        return $entity;
    }

}