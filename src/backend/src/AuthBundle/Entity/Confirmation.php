<?php
namespace AuthBundle\Entity;

use AccountBundle\Entity\Account;

class Confirmation
{

    private $id;
    private $type;
    private $expires;
    private $updated;
    private $isConfirmed;
    private $account;

    public function __construct(Account $account)
    {
        $this->account = $account;
    }

    public function getId()
    {
        return $this->id;
    }


    public function setExpires($expires)
    {
        $this->expires = $expires;

        return $this;
    }

    public function getExpires()
    {
        return $this->expires;
    }

    public function setUpdated($updated)
    {
        $this->updated = $updated;

        return $this;
    }

    public function getUpdated()
    {
        return $this->updated;
    }

    public function setIsConfirmed($isConfirmed)
    {
        $this->isConfirmed = $isConfirmed;

        return $this;
    }

    public function getIsConfirmed()
    {
        return $this->isConfirmed;
    }

    public function setAccount(\AccountBundle\Entity\Account $account = null)
    {
        $this->account = $account;

        return $this;
    }

    public function getAccount()
    {
        return $this->account;
    }

    public function getType(): ConfirmationType
    {
        return ConfirmationType::createFromIntCode($this->type);
    }

    public function setType(ConfirmationType $confirmationType)
    {
        $this->type = $confirmationType->getIntCode();
        return $this;
    }
}
