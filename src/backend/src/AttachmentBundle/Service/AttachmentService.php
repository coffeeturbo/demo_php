<?php
namespace AttachmentBundle\Service;

use AttachmentBundle\Entity\Attachment;
use AttachmentBundle\LinkMetadata\LinkMetadataFactory;
use AttachmentBundle\Parser\OpenGraphParser;
use AttachmentBundle\Service\FetchResource\Result;

class AttachmentService
{
    public function linkAttachment($url, Result $result): Attachment
    {
        $linkMetadataFactory = new LinkMetadataFactory(new OpenGraphParser());

        $linkMetadata = $linkMetadataFactory->createLinkMetadata($url, $result->getContentType(), $result->getContent());

        $metadata = $linkMetadata->jsonSerialize();

        $attachment = new Attachment();
        $attachment->setContent($metadata)
            ->setType($linkMetadata->getResourceType())
        ;


        return $attachment;
    }
}