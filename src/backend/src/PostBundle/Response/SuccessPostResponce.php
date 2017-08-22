<?php
namespace PostBundle\Response;

use PostBundle\Entity\Post;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SuccessPostResponce extends JsonResponse implements \JsonSerializable
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

        return [
            'entity' => [
                'id' => $post->getId(),
                'created' => $post->getCreated(),
                'updated' => $post->getUpdated(),
                'tags'  => $post->getTags(),
                'attachments' => $post->getAttachments()
            ]
        ];
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