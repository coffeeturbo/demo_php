<?php
namespace PostBundle\Entity;

use AppBundle\Entity\ModifyDateEntityInterface;
use AppBundle\Entity\ModifyDateEntityTrait;

class Post implements ModifyDateEntityInterface
{

    use ModifyDateEntityTrait;

    private $id;
    private $title;
    private $attachments;
    private $tags;

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

    public function setAttachments($attachments)
    {
        $this->attachments = $attachments;

        return $this;
    }

    public function getAttachments()
    {
        return $this->attachments;
    }

    public function setTags($tags)
    {
        $this->tags = $tags;
        return $this;
    }

    public function getTags()
    {
        return $this->tags;
    }
}
