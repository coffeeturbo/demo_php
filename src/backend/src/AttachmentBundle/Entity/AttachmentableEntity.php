<?php
namespace AttachmentBundle\Entity;

interface AttachmentableEntity
{
    public function addAttachment(Attachment $attachment);
    public function removeAttachment(Attachment $attachment);
    public function hasAttachment(Attachment $attachment): bool;
    public function getAttachments(): ?array;
}