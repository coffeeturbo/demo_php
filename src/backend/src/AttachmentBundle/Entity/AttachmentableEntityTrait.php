<?php
namespace AttachmentBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;

trait AttachmentableEntityTrait
{
    private $attachments;

    public function __construct()
    {
        $this->attachments = new ArrayCollection();
    }

    public function addAttachment(Attachment $attachment)
    {
        $this->attachments->add($attachment);
        return $this;
    }

    public function removeAttachment(Attachment $attachment)
    {
        $this->attachments->removeElement($attachment);
        return $this;
    }

    public function hasAttachment(Attachment $attachment): bool
    {
        return $this->attachments->contains($attachment);
    }

    public function getAttachments(): ?array
    {
        return $this->attachments->toArray();
    }

}