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
    const MIN_AGE = 7;
    const MAX_AGE = 150;

    const BIRTH_DATE_FORMAT = 'd-m-Y';

    private $id;
    private $created;

    private $name;
    private $birthDate;
    private $verified;
    private $privacyOpts;
    private $gender;
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
            'name' => $this->name,
            'alias' => $this->alias,
            'birth_date' => $this->getBirthDate()->format(self::BIRTH_DATE_FORMAT),
            'verified' => $this->verified,
            'privacy_opts' => $this->privacyOpts,
            'created' => $this->created->format(\DateTime::W3C)
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

    public function getBirthDate(): ?\DateTime
    {
        return $this->birthDate;
    }

    public function setBirthDate(?\DateTime $birthday): self
    {
        if ($birthday instanceof \DateTime) {
            $age = $birthday->diff(new \DateTime())->y;

            if ($age < self::MIN_AGE) {
                throw new InvalidBirthDateException(sprintf("Unacceptable age '%s': yonger then ", $age, self::MIN_AGE));
            }

            if ($age > self::MAX_AGE) {
                throw new InvalidBirthDateException(sprintf("Unacceptable age '%s': older then %s", $age, self::MAX_AGE));
            }
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


    public function setAlias(string $alias = null): self
    {
        $this->alias = $alias;

        return $this;
    }

    public function getAlias(): ?string
    {
        return $this->alias;
    }


    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }


    public function getName() : string
    {
        return $this->name;
    }
}
