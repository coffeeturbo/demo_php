<?php

namespace AccountBundle\Entity;

use FOS\UserBundle\Model\User;

class Account extends User implements \JsonSerializable
{
    const ROLE_CREATED = "ROLE_CREATED";
    const ROLE_REGISTERED = "ROLE_REGISTERED";
    const ROLE_PHONE_VERIFED = "ROLE_PHONE_VERIFED";
    const ROLE_EMAIL_VERIFED = "ROLE_EMAIL_VERIFED";
    const ROLE_VERIFED = "ROLE_VERIFED";
    
    protected $id;
    protected $vkId;
    protected $facebookId;
    protected $googleId;

    public function getId(): int
    {
        return $this->id;
    }

    public function getVkId(): int
    {
        return $this->vkId;
    }

    public function setVkId(int $vkId)
    {
        $this->vkId = $vkId;
    }

    public function getFacebookId(): int
    {
        return $this->facebookId;
    }

    public function setFacebookId(int $facebookId)
    {
        $this->facebookId = $facebookId;
    }

    public function getGoogleId()
    {
        return $this->googleId;
    }

    public function setGoogleId($googleId)
    {
        $this->googleId = $googleId;
    }

    function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'roles' => $this->getRoles()
        ];
    }
}