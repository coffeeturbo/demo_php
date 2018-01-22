<?php
namespace CommentBundle\Response\AssocArray;

use CommentBundle\Entity\Comment;
use CommentBundle\Formatter\CommentFormatter;
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

        $entities = array_values(array_map(function (array $comment) {
            return (new CommentFormatter($comment))->format();
        }, $comments));

        return $entities;
    }

    public function createMockEntity()
    {


        return [];
    }

}