<?php

namespace AttachmentBundle\Response;

use AttachmentBundle\Entity\Attachment;
use Doctrine\ORM\PersistentCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SuccessAttachmentsResponse extends JsonResponse implements \JsonSerializable
{
    private $entities;

    function __construct(array $entities = null, bool $isCreated = false)
    {
        $this->entities = $entities;
        parent::__construct(self::jsonSerialize(), $isCreated ? Response::HTTP_CREATED : Response::HTTP_OK);
    }

    function jsonSerialize()
    {
        $attachments = $this->entities ?? $this->createMockEntity();

        $entities = array_values(array_map(function (Attachment $attachment) {
            return (new SuccessAttachmentResponse($attachment))->jsonSerialize();
        }, $attachments));

        return $entities;
    }

    public function createMockEntity()
    {
        return [];
    }

}