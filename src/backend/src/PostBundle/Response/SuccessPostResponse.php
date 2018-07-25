<?php
namespace PostBundle\Response;

use PostBundle\Entity\Post;
use PostBundle\Formatter\PostFormatter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SuccessPostResponse extends JsonResponse implements \JsonSerializable
{

    private $entity;

    function __construct(Post $entity = null, bool $isCreated = false)
    {
        $this->entity = $entity;
        parent::__construct(self::jsonSerialize(), $isCreated ? Response::HTTP_CREATED : Response::HTTP_OK);
    }


    function jsonSerialize()
    {
        $post = $this->entity ?? $this->createMockEntity();

        return (new PostFormatter($post))->format();
    }


    public function createMockEntity(): Post
    {

        $entity = new Post();
        $entity
            ->setTitle('Test POst')
            ->setAttachments([])
            ->setTags([])
            ->setCreated(new \DateTime())
            ->markUpdated()

        ;

        return $entity;
    }

}