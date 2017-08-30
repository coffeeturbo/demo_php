<?php
namespace TagBundle\Response;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use TagBundle\Entity\Tag;

class SuccessTagResponse extends JsonResponse implements \JsonSerializable
{
    private $entity;

    function __construct(Tag $entity = null, bool $isCreated = false)
    {
        $this->entity = $entity;
        parent::__construct(self::jsonSerialize(), $isCreated ? Response::HTTP_CREATED : Response::HTTP_OK);
    }


    function jsonSerialize()
    {
        $tag = $this->entity ?? $this->createMockEntity();

        return [
            'entity' => [
                'id' => $tag->getId(),
                'name' => $tag->getName(),
            ]
        ];
    }

    public function createMockEntity(): Tag
    {

        $entity = new Tag();
        $entity->setName('tag')
        ;

        return $entity;
    }
}