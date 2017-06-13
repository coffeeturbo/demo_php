<?php
namespace ProfileBundle\Event;

use ProfileBundle\Entity\Profile;
use Symfony\Component\EventDispatcher\Event;

class ProfileEvent extends Event
{
    private $profile;

    function __construct(Profile $profile)
    {
        $this->profile = $profile;
    }

    public function getProfile()
    {
        return $this->profile;
    }
}