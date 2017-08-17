<?php
namespace PostBundle\Entity;

use AppBundle\Entity\ModifyDateEntityInterface;
use AppBundle\Entity\ModifyDateEntityTrait;

class Post implements ModifyDateEntityInterface
{

    use ModifyDateEntityTrait;

    private $id;
    private $attachments;

    public function getId()
    {
        return $this->id;
    }

    public function setAttachments($attachments)
    {
        $this->attachments = $attachments;

        return $this;
    }

    public function getAttachments()
    {
        return $this->attachments;
    }
}
