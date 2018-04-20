<?php
namespace AttachmentBundle\Service;

use AttachmentBundle\Entity\Attachment;
use AttachmentBundle\Entity\AttachmentableEntity;
use AttachmentBundle\Entity\AttachmentType\AttachmentType;
use AttachmentBundle\Entity\AttachmentType\AttachmentTypeImage;
use AttachmentBundle\LinkMetadata\LinkMetadataFactory;
use AttachmentBundle\Parser\OpenGraphParser;
use AttachmentBundle\Repository\AttachmentRepository;
use AttachmentBundle\Service\AttachmentHandler\AttachmentHandler;
use AttachmentBundle\Service\FetchResource\Result;
use Doctrine\ORM\PersistentCollection;
use ImageBundle\Image\Image;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

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

    public function uploadImage(Image $image): Attachment
    {
        $attachment = new Attachment();

        $attachment->setType(AttachmentType::createFromIntCode(AttachmentTypeImage::INT_CODE))
            ->setContent($image->jsonSerialize());

        return $attachment;
    }

    static public function setAttachmentsFromJson(
        AttachmentableEntity $entity,
        string $jsonAttachmString,
        $maxAttachmentsLimit)
    {

        $jsonAttachs = json_decode($jsonAttachmString, true);

        if($maxAttachmentsLimit < count($jsonAttachs)) {
            throw new AccessDeniedHttpException(
                sprintf("you have exceed attachments limit: %s", $maxAttachmentsLimit));
        }



        self::clearNotUsedAttachments($entity, $jsonAttachs);

        foreach($jsonAttachs as $attachmentJson) {

            $handler = new AttachmentHandler($attachmentJson);

            $attachment = $handler->getAttachment();

            if(!$entity->hasAttachment($attachment)){
                $entity->addAttachment($attachment);
            }
        }
    }

    static public function clearNotUsedAttachments(AttachmentableEntity $attachmentableEntity, array $newAttachments)
    {
        var_dump('fdfdfd');
        die;

        $matches = [];

        foreach($newAttachments as $newAttach){
            foreach($attachmentableEntity->getAttachments() as $attachId => $attachment) {
                /** @var $attachment Attachment */
                if($attachment->getId() === $newAttach['id']){
                    $matches[] = $attachId;
                }

            }
        }

        foreach($attachmentableEntity->getAttachments() as $item){
            /** @var $item Attachment */
            if(!in_array($item->getId(), $matches)) {
                $attachmentableEntity->removeAttachment($item);
            }
        }
    }

}