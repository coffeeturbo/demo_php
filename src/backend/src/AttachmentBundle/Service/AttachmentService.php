<?php
namespace AttachmentBundle\Service;

use AttachmentBundle\Entity\Attachment;
use AttachmentBundle\LinkMetadata\LinkMetadataFactory;
use AttachmentBundle\Parser\OpenGraphParser;
use AttachmentBundle\Service\FetchResource\Result;

class AttachmentService
{
    public function linkAttachment($url, Result $result)
    {
        $linkMetadataFactory = new LinkMetadataFactory(new OpenGraphParser());

        $linkMetadata = $linkMetadataFactory->createLinkMetadata($url, $result->getContentType(), $result->getContent());



        $metadata = [
            'url' => $linkMetadata->getURL(),
            'title' => $linkMetadata->getTitle(),
            'description' => $linkMetadata->getDescription(),
            'metadata' => $linkMetadata->jsonSerialize()
        ];


        $attachment = new Attachment();
        $attachment->setMetadata($metadata)
            ->setType($result->getContentType())
            ->setContent($result->getContent());

        dump($attachment);

    }
}