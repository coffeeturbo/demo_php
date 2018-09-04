<?php
namespace SubscribeBundle\Subscribe;

use SubscribeBundle\Entity\Subscribe;

trait SubscribeEntityTrait
{

    private $subscribersTotal = 0;

    private $subscribe;

    public function getSubscribersTotal(): int
    {
        return $this->subscribersTotal;
    }

    public function setSubscribe(Subscribe $subscribe)
    {
        $this->subscribe = $subscribe;
        return $this;
    }
    public function getSubscribe(): ?Subscribe
    {
        return $this->subscribe;
    }

    public function increaseSubscribers()
    {
        $this->subscribersTotal++;

        return $this;
    }

    public function decreaseSubscribers()
    {
        $this->subscribersTotal--;

        return $this;
    }
}