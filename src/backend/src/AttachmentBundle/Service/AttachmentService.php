<?php
namespace AttachmentBundle\Service;

use AttachmentBundle\Entity\Attachment;
use AttachmentBundle\LinkMetadata\LinkMetadataFactory;
use AttachmentBundle\Parser\OpenGraphParser;
use AttachmentBundle\Repository\AttachmentRepository;
use AttachmentBundle\Service\FetchResource\Result;

class AttachmentService
{
    private $attachmentRepository;

    public function __construct(AttachmentRepository $repository)
    {
        $this->attachmentRepository = $repository;
    }

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

    public function createAttachment(Attachment $attachment)
    {
        $this->attachmentRepository->create($attachment);
    }

    public function fetchAttachmentFromJson(string $json): Attachment
    {
        $attachmentJson = json_decode($json);

        switch($attachmentJson['type']){
        }

    }





}