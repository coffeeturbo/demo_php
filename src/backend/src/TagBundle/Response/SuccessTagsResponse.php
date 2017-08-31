<?php
namespace TagBundle\Response;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use TagBundle\Entity\Tag;

class SuccessTagsResponse extends JsonResponse implements \JsonSerializable
{

    private $entities;

    function __construct(array $entities = null, bool $isCreated = false)
    {
        $this->entities = $entities;
        parent::__construct(self::jsonSerialize(), $isCreated ? Response::HTTP_CREATED : Response::HTTP_OK);
    }

    function jsonSerialize()
    {
        $entities = array_map(function(Tag $tag){
            return (new SuccessTagResponse($tag))->jsonSerialize();
        }, $this->entities);

        return [
            'total' => count($entities),
            'entities' => $entities,
        ];
    }

}