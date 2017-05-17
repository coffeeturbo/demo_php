<?php

namespace AuthBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User;

/**
 * User
 *
 * @ORM\Table(name="account")
 * @ORM\Entity(repositoryClass="AuthBundle\Repository\AccountRepository")
 */
class Account extends User
{
    const ROLE_CREATED = "ROLE_CREATED";
    const ROLE_PHONE_VERIFED = "ROLE_PHONE_VERIFED";
    const ROLE_EMAIL_VERIFED = "ROLE_EMAIL_VERIFED";
    const ROLE_VERIFED = "ROLE_VERIFED";
    
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var int
     *
     * @ORM\Column(name="vk_id", type="string", nullable=true)
     */
    protected $vkId;

    /**
     * @var int
     *
     * @ORM\Column(name="facebook_id", type="string", nullable=true)
     */
    protected $facebookId;

    public function getId()
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

}

