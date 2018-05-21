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
    private $code;

    public function __construct(Account $account, int $code)
    {
        $this->account = $account;
        $this->code = $code;
        $this->isConfirmed = false;
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

    public function setConfirmed()
    {
        $this->isConfirmed = true;
        return $this;
    }
    public function setNotConfirmed()
    {
        $this->isConfirmed = false;
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


    public function getCode()
    {
        return $this->code;
    }


    public function setCode(int $code)
    {
        $this->code = $code;
        return $this;
    }
}
