<?php

namespace AttachmentBundle\Entity;
use AppBundle\Entity\ModifyDateEntityInterface;
use AppBundle\Entity\ModifyDateEntityTrait;
use AttachmentBundle\Entity\AttachmentType\AttachmentType;

class Attachment implements ModifyDateEntityInterface
{

    use ModifyDateEntityTrait;

    protected $id;
    protected $type;
    protected $content;

    public function __construct()
    {
        $this->created = new \DateTime();
        $this->markUpdated();
    }

    public function setId(int $id = null)
    {
        $this->id = $id;
        return $this;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setType(AttachmentType $type)
    {
        $this->type = $type->getIntCode();

        return $this;
    }

    public function getType(): AttachmentType
    {
        return AttachmentType::createFromIntCode($this->type);
    }

    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    public function getContent()
    {
        return $this->content;
    }
}