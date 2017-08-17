<?php

namespace AttachmentBundle\Entity;
use AppBundle\Entity\ModifyDateEntityInterface;
use AppBundle\Entity\ModifyDateEntityTrait;

/**
 * Attachment
 */
class Attachment implements ModifyDateEntityInterface
{

    use ModifyDateEntityTrait;

    private $id;
    private $type;
    private $content;

    public function getId()
    {
        return $this->id;
    }

    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    public function getType()
    {
        return $this->type;
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