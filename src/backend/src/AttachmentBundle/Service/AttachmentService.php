<?php
namespace AttachmentBundle\Service;

use AttachmentBundle\Entity\Attachment;
use AttachmentBundle\Entity\AttachmentType\AttachmentType;
use AttachmentBundle\LinkMetadata\LinkMetadataFactory;
use AttachmentBundle\Parser\OpenGraphParser;
use AttachmentBundle\Repository\AttachmentRepository;
use AttachmentBundle\Service\FetchResource\Result;
use Symfony\Component\HttpFoundation\File\UploadedFile;

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
            ->setType(
                AttachmentType::createFromStringCode($linkMetadata->getResourceType())
            )
        ;


        return $attachment;
    }

    public function createAttachment(Attachment $attachment)
    {
        $this->attachmentRepository->create($attachment);
    }

    public function uploadImage(UploadedFile $file): Attachment
    {

    }

    public function fetchAttachmentFromJson(string $json): Attachment
    {
        $attachmentJson = json_decode($json);

        switch($attachmentJson['type']){
        }

    }





}