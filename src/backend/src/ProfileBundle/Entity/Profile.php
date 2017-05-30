<?php

namespace ProfileBundle\Entity;

use AuthBundle\Entity\Account;
use ProfileBundle\Entity\Profile\Gender;
use ProfileBundle\Entity\Profile\Gender\NoneGender;
use ProfileBundle\Exception\InvalidBirthDateException;

/**
 * Profile
 */
class Profile implements \JsonSerializable
{

    const ADULT_AGE = 18;
    const MAX_AGE = 150;

    const BIRTH_DATE_FORMAT = 'd-m-Y';

    private $id;
    private $created;

    private $birthDate;
    private $verified;
    private $privacyOpts;
    private $gender;
    private $nickName;
    private $firstName;
    private $lastName;
    private $patronymic;
    private $alias;
    private $account;


    public function __construct()
    {
        $this->gender = (new NoneGender())->getIntCode();
        $this->created = new \DateTime();
        $this->verified = false;
    }

    function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'gender' => $this->getGender()->getStringCode(),
            'nick_name' => $this->nickName,
            'first_name' => $this->firstName,
            'last_name' => $this->lastName,
            'patronymic' => $this->patronymic,
            'alias' => $this->alias,
            'birth_date' => $this->getBirthDate()->format(self::BIRTH_DATE_FORMAT),
            'verified' => $this->verified,
            'privacy_opts' => $this->privacyOpts,
            'created' => $this->created
        ];
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setCreated(\DateTime $created)
    {
        $this->created = $created;

        return $this;
    }

    public function getCreated(): \DateTime
    {
        return $this->created;
    }

    public function getBirthDate(): \DateTime
    {
        return $this->birthDate;
    }

    public function setBirthDate(\DateTime $birthday): self
    {
        $now = new \DateTime();

        if($now < $birthday) {
            throw new InvalidBirthDateException(sprintf("UnAccetable age you cannot be younger %s", $now));
        }

        $diff = $birthday->diff(new \DateTime());
        $years = $diff->y;

        if($years > self::MAX_AGE) {
            throw new InvalidBirthDateException(sprintf("sorry age %s unreachable", $years));
        }

        $this->birthDate = $birthday;

        return $this;
    }

    public function setVerified(bool $verified): self
    {
        $this->verified = $verified;

        return $this;
    }

    public function getVerified(): bool
    {
        return $this->verified;
    }

    public function setPrivacyOpts($privacyOpts): self
    {
        $this->privacyOpts = $privacyOpts;

        return $this;
    }

    public function getPrivacyOpts()
    {
        return $this->privacyOpts;
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

    public function setNickName(string $nickName): self
    {
        $this->nickName = $nickName;

        return $this;
    }

    public function getNickName(): string
    {
        return $this->nickName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function setPatronymic(string $patronymic): self
    {
        $this->patronymic = $patronymic;

        return $this;
    }

    public function getPatronymic(): string
    {
        return $this->patronymic;
    }

    public function setAlias(string $alias = null): self
    {
        $this->alias = $alias;

        return $this;
    }

    public function getAlias(): string
    {
        return $this->alias;
    }
}
