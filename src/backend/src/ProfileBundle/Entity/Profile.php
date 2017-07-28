<?php

namespace ProfileBundle\Entity;

use AccountBundle\Entity\Account;
use AvatarBundle\Image\AvatarEntity;
use AvatarBundle\Image\AvatarEntityTrait;
use ImageBundle\Image\BackdropEntity;
use ImageBundle\Image\BackdropEntityTrait;
use ProfileBundle\Entity\Profile\Gender;
use ProfileBundle\Entity\Profile\Gender\NoneGender;


class Profile implements AvatarEntity, BackdropEntity
{
    const BIRTH_DATE_FORMAT = 'Y-m-d';

    use AvatarEntityTrait, BackdropEntityTrait;

    private $id;
    private $created;
    private $name;
    private $birthDate;
    private $verified;
    private $gender;
    private $alias;
    private $account;

    public function __construct()
    {
        $this->gender = (new NoneGender())->getIntCode();
        $this->created = new \DateTime();
        $this->verified = false;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setCreated(\DateTime $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getCreated(): \DateTime
    {
        return $this->created;
    }

    public function getBirthDate(): ?\DateTime
    {
        return $this->birthDate;
    }

    public function setBirthDate(?\DateTime $birthDate): self
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    public function setVerified(bool $verified): self
    {
        $this->verified = $verified;

        return $this;
    }

    public function isVerified(): bool
    {
        return $this->verified;
    }

    public function setGender(Gender $gender): self
    {
        $this->gender = $gender->getIntCode();

        return $this;
    }

    public function getGender(): Gender
    {
        return Gender::createFromIntCode($this->gender);
    }

    public function setAccount(Account $account = null): self
    {
        $this->account = $account;

        return $this;
    }

    public function getAccount(): Account
    {
        return $this->account;
    }


    public function setAlias(?string $alias = null): self
    {
        $this->alias = $alias;

        return $this;
    }

    public function getAlias(): ?string
    {
        return $this->alias;
    }


    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }


    public function getName() : ?string
    {
        return $this->name;
    }
}
