<?php
namespace PostBundle\Response;

use PostBundle\Entity\Post;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SuccessPostsResponse extends JsonResponse implements \JsonSerializable
{
    private $entities;

    function __construct(array $entities = null, bool $isCreated = false)
    {
        $this->entities = $entities;
        parent::__construct(self::jsonSerialize(), $isCreated ? Response::HTTP_CREATED : Response::HTTP_OK);
    }


    function jsonSerialize()
    {
        $posts = $this->entities ?? $this->createMockEntity();

        $entities = array_map(function(Post $post){
            return (new SuccessPostResponse($post))->jsonSerialize();
        }, $posts );

        return $entities;
    }

    public function createMockEntity(): array
    {

        return [];
    }
}