<?php
namespace PostBundle\Entity;

use AppBundle\Entity\ModifyDateEntityInterface;
use AppBundle\Entity\ModifyDateEntityTrait;
use AttachmentBundle\Entity\Attachment;
use AttachmentBundle\Entity\AttachmentableEntity;
use AttachmentBundle\Entity\AttachmentableEntityTrait;
use Doctrine\Common\Collections\ArrayCollection;
use TagBundle\Entity\AbstractTaggable;

class Post extends AbstractTaggable implements ModifyDateEntityInterface, AttachmentableEntity
{
    use ModifyDateEntityTrait, AttachmentableEntityTrait;

    private $id;
    private $title;
    private $attachments;

    public function __construct()
    {
        parent::__construct();
        $this->attachments = new ArrayCollection();
        $this->created = new \DateTime();
        $this->markUpdated();
    }

    public function getId()
    {
        return $this->id;
    }

    public function setTitle(string $title)
    {
        $this->title = $title;
        return $this;
    }

    public function getTitle()
    {
        return $this->title;
    }
}
