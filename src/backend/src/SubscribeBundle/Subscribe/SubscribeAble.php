<?php
namespace SubscribeBundle\Subscribe;

interface SubscribeAble
{
    public function getSubscribersTotal();
    public function getSubscribers();

    public function increaseSubscribers();
    public function decreaseSubscribers();
}