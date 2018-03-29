<?php
namespace AttachmentBundle\Service\AttachmentHandler;

use AttachmentBundle\Entity\Attachment;
use AttachmentBundle\Entity\AttachmentType\AttachmentType;
use AttachmentBundle\Entity\AttachmentType\AttachmentTypeImage;
use AttachmentBundle\Entity\AttachmentType\AttachmentTypeText;
use AttachmentBundle\Entity\AttachmentType\AttachmentTypeVideoYouTube;

class AttachmentHandler
{

    private $attachmentJson;

    private $attachment;

    public function __construct(array $json)
    {
        $this->attachmentJson = $json;

        $this->attachment = $this->baseAttachmentFactory($json);
    }


    private function baseAttachmentFactory($json){
        $attachment = new Attachment();

        if(!isset($json['type'])) throw new \Exception(sprintf('field type is required'));

        $type = AttachmentType::createFromStringCode($json['type']);
        $attachment->setType($type);

        $attachment->setId($json['id'] ?? null);
        return $attachment;
    }

    public function getAttachment(){

        switch($this->attachmentJson['type'])
        {
            case AttachmentTypeVideoYouTube::STRING_CODE:
                $this->getVideoYoutubeAttachment();
            break;

            case AttachmentTypeText::STRING_CODE:
                $this->getTextAttachment();
            break;

            case AttachmentTypeImage::STRING_CODE:
                $this->getImageAttachment();
            break;

            default:
                throw new \Exception(
                    sprintf('Unknown attachment type %s', $this->attachmentJson['type']));

        }

        return $this->attachment;
    }

    private function getTextAttachment()
    {
        $this->attachment->setContent([
            'text' => \strip_tags($this->attachmentJson['value'], '<a><b><h2><h3><h4><i><u><p><strike><blockquote>')
        ]);
    }


    private function getImageAttachment()
    {

        $this->attachment
            ->setContent(
                (isset($this->attachmentJson['storage_path'])
                    || isset($this->attachmentJson['public_path'])) ?
                [
                    'storage_path' => $this->attachmentJson['storage_path'] ?? '',
                    'public_path' => $this->attachmentJson['public_path'] ?? ''
                ]
                    : null
            );
    }

    private function getVideoYoutubeAttachment()
    {
        $this->attachment
            ->setContent($this->attachmentJson['content']);
    }
}