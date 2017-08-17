<?php
namespace AttachmentBundle\Response;

use AttachmentBundle\Entity\Attachment;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SuccessAttachmentResponse extends JsonResponse implements \JsonSerializable
{

    private $entity;
    function __construct(Attachment $entity = null, bool $isCreated = false)
    {
        $this->entity = $entity;
        parent::__construct(self::jsonSerialize(), $isCreated ? Response::HTTP_CREATED : Response::HTTP_OK);
    }

    public function createMockEntity()
    {
        $attachment = new Attachment();

        return $attachment->setType('youtube')->setContent([]);
    }

    function jsonSerialize()
    {
        $entity = $this->entity ?? $this->createMockEntity();

        return [
            'id' => $entity->getId(),
            'type' => $entity->getType(),
            'content' => $entity->getContent()
        ];
    }

}