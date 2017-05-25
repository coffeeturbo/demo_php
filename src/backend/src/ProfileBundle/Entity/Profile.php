<?php

namespace ProfileBundle\Entity;

use ProfileBundle\Entity\Profile\Gender\Gender;
use ProfileBundle\Entity\Profile\Gender\NoneGender;
use ProfileBundle\Exception\InvalidBirthDateException;

/**
 * Profile
 */
class Profile
{

    const ADULT_AGE = 18;
    const MAX_AGE = 150;


    /**
     * @var integer
     */
    private $id;

    /**
     * @var \DateTime
     */
    private $created;

    /**
     * @var string
     */
    private $name;

    /**
     * @var \DateTime
     */
    private $birthDate;

    /**
     * @var integer
     */
    private $verified;

    /**
     * @var array
     */
    private $privacyOpts;

    /**
     * @var integer
     */
    private $gender;


    public function __construct()
    {
        $this->gender = (new NoneGender())->getIntCode();
        $this->created = new \DateTime();
        $this->verified = false;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Profile
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Profile
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
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

    /**
     * Set verified
     *
     * @param bool $verified
     *
     * @return Profile
     */
    public function setVerified(bool $verified)
    {
        $this->verified = $verified;

        return $this;
    }

    /**
     * Get verified
     *
     * @return bool
     */
    public function getVerified(): bool
    {
        return $this->verified;
    }

    /**
     * Set privacyOpts
     *
     * @param array $privacyOpts
     *
     * @return Profile
     */
    public function setPrivacyOpts($privacyOpts)
    {
        $this->privacyOpts = $privacyOpts;

        return $this;
    }

    /**
     * Get privacyOpts
     *
     * @return array
     */
    public function getPrivacyOpts()
    {
        return $this->privacyOpts;
    }

    public function setGender(Gender $gender)
    {
        $this->gender = $gender->getIntCode();

        return $this;
    }

    public function getGender(): Gender
    {
        return Gender::createFromIntCode($this->gender);
    }
}
