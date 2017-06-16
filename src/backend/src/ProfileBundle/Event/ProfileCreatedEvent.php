<?php
namespace ProfileBundle\Event;

use ProfileBundle\Entity\Profile;
use Symfony\Component\EventDispatcher\Event;

class ProfileCreatedEvent extends Event
{
    const NAME = 'profile.created';
    
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