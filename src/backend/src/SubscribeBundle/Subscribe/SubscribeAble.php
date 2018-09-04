<?php
namespace SubscribeBundle\Subscribe;

interface SubscribeAble
{
    public function getSubscribersTotal();
    public function getSubscribe();

    public function increaseSubscribers();
    public function decreaseSubscribers();
}