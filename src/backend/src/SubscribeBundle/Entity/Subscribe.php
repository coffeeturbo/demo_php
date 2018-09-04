<?php
namespace SubscribeBundle\Entity;

use ProfileBundle\Entity\Profile;
use SubscribeBundle\Entity\SubscribeType\SubscribeType;

class Subscribe
{

    private $id;
    private $type;
    private $created;
    private $targetId;
    private $profile;

    public function __construct(SubscribeType $type, Profile $profile, int $targetId)
    {
        $this->type = $type->getIntCode();
        $this->profile = $profile;
        $this->targetId = $targetId;
        $this->created = new \DateTime();
    }

    public function getId()
    {
        return $this->id;
    }

    public function setType(SubscribeType $type)
    {
        $this->type = $type->getIntCode();

        return $this;
    }

    public function getType(): SubscribeType
    {
        return SubscribeType::createFromIntCode($this->type);
    }

    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    public function getCreated()
    {
        return $this->created;
    }

    public function setTargetId($targetId)
    {
        $this->targetId = $targetId;

        return $this;
    }

    public function getTargetId()
    {
        return $this->targetId;
    }

    public function setProfile(\ProfileBundle\Entity\Profile $profile = null)
    {
        $this->profile = $profile;

        return $this;
    }

    public function getProfile()
    {
        return $this->profile;
    }
}
