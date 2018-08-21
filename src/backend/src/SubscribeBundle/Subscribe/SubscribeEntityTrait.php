<?php
namespace SubscribeBundle\Subscribe;

trait SubscribeEntityTrait
{

    private $subscribersTotal;

    public function getSubscribersTotal()
    {
        return $this->subscribersTotal;
    }

    public function getSubscribers(){}

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