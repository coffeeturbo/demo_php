<?php
namespace ProfileBundle\Event;

use ProfileBundle\Entity\Profile;
use Symfony\Component\EventDispatcher\Event;

class ProfilePreCreatedEvent extends Event
{
    const NAME = 'profile.pre_created';
    
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