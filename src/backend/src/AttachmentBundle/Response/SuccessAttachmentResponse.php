<?php
namespace AttachmentBundle\Response;

use AttachmentBundle\Entity\Attachment;
use AttachmentBundle\Entity\AttachmentType\AttachmentType;
use AttachmentBundle\Entity\AttachmentType\AttachmentTypeVideoYouTube;
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

        $type = AttachmentType::createFromIntCode(AttachmentTypeVideoYouTube::INT_CODE);

        return $attachment->setType($type)->setContent([]);
    }

    function jsonSerialize()
    {
        $entity = $this->entity ?? $this->createMockEntity();

        return [
            'id' => $entity->getId(),
            'type' => $entity->getType()->getStringCode(),
            'content' => $entity->getContent()
        ];
    }

}