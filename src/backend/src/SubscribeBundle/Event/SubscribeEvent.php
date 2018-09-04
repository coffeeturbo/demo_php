<?php
namespace SubscribeBundle\Event;

use SubscribeBundle\Entity\Subscribe;
use Symfony\Component\EventDispatcher\Event;

class SubscribeEvent extends Event
{

    const SUBSCRIBE_CREATED = 'subscribe.subscribe_created';
    const SUBSCRIBE_DELETED = 'subscribe.subscribe_deleted';

    private $subscribe;

    public function __construct(Subscribe $subscribe)
    {
        $this->subscribe = $subscribe;
    }

    public function getSubscribe()
    {
        return $this->subscribe;
    }

}