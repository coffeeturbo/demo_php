<?php

namespace ProfileBundle\Entity;

use ProfileBundle\Entity\Profile\Gender\Gender;
use ProfileBundle\Entity\Profile\Gender\NoneGender;
/**
 * Profile
 */
class Profile
{
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
    private $birth_date;

    /**
     * @var integer
     */
    private $verified;

    /**
     * @var array
     */
    private $privacy_opts;

    /**
     * @var integer
     */
    private $gender;


    public function __construct()
    {
        $this->gender = (new NoneGender())->getIntCode();
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



    /**
     * Set birthDate
     *
     * @param \DateTime $birthDate
     *
     * @return Profile
     */
    public function setBirthDate($birthDate)
    {
        $this->birth_date = $birthDate;

        return $this;
    }

    /**
     * Get birthDate
     *
     * @return \DateTime
     */
    public function getBirthDate()
    {
        return $this->birth_date;
    }

    /**
     * Set verified
     *
     * @param integer $verified
     *
     * @return Profile
     */
    public function setVerified($verified)
    {
        $this->verified = $verified;

        return $this;
    }

    /**
     * Get verified
     *
     * @return integer
     */
    public function getVerified()
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
        $this->privacy_opts = $privacyOpts;

        return $this;
    }

    /**
     * Get privacyOpts
     *
     * @return array
     */
    public function getPrivacyOpts()
    {
        return $this->privacy_opts;
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
