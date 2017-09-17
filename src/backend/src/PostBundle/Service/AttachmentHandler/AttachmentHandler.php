<?php
namespace PostBundle\Service\AttachmentHandler;

use AttachmentBundle\Entity\Attachment;

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

        $attachment->setType($json['type']);

        return $attachment;
    }

    public function getAttachment(){

        switch($this->attachmentJson['type'])
        {
            case 'video-youtube-attachment':
                break;

            case 'text':
                $this->getTextAttachment();
            break;

            case 'image':
                $this->getImageAttachment();
            break;

            default: throw new \Exception('Unknown attachment type');

        }

        return $this->attachment;
    }

    private function getTextAttachment()
    {
        $this->attachment->setContent([
            'text' => \htmlentities($this->attachmentJson['value'])
        ]);
    }


    private function getImageAttachment()
    {



        // загружаем картинку

        $this->attachment->setContent([
            '' => '',
            'storage_path' => '',
            'public_path' => ''
        ]);
    }
}