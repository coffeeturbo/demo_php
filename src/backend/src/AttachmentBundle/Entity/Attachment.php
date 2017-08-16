<?php

namespace AttachmentBundle\Entity;
use AppBundle\Entity\ModifyDateEntityInterface;
use AppBundle\Entity\ModifyDateEntityTrait;

/**
 * Attachment
 */
class Attachment implements ModifyDateEntityInterface, \JsonSerializable
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

    function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'content' => $this->content
        ];
    }
}