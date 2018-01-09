<?php
namespace CommentBundle\Response;

use CommentBundle\Entity\Comment;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SuccessCommentsResponse extends JsonResponse implements \JsonSerializable
{
    private $entities;

    function __construct(array $entity = null, bool $isCreated = false)
    {
        $this->entities = $entity;
        parent::__construct(self::jsonSerialize(), $isCreated ? Response::HTTP_CREATED : Response::HTTP_OK);
    }


    function jsonSerialize()
    {
        $comments = $this->entities ?? $this->createMockEntity();

        $entities = array_values(array_map(function (Comment $comment) {
            return (new SuccessCommentResponse($comment))->jsonSerialize();
        }, $comments));

        return $entities;
    }

    public function createMockEntity()
    {


        return [];
    }

}