<?php
namespace PostBundle\Entity;

use AppBundle\Entity\ModifyDateEntityInterface;
use AppBundle\Entity\ModifyDateEntityTrait;
use Beelab\TagBundle\Entity\AbstractTaggable;
use Beelab\TagBundle\Tag\TaggableInterface;

class Post extends AbstractTaggable implements ModifyDateEntityInterface, TaggableInterface
{

    use ModifyDateEntityTrait;

    private $id;
    private $title;
    private $attachments;

    public function __construct()
    {
        parent::__construct();

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
