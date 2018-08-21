<?php
namespace SubscribeBundle\Event;

use SubscribeBundle\Service\SubscribeService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UpdateSubscribersTotalListener implements EventSubscriberInterface
{
    private $subscribeService;

    public static function getSubscribedEvents()
    {
        return [
            SubscribeEvent::SUBSCRIBE_CREATED => 'onNewSubscribe',
            SubscribeEvent::SUBSCRIBE_DELETED => 'onDeleteSubscribe'
        ];
    }

    public function __construct(SubscribeService $service)
    {
        $this->subscribeService = $service;
    }

    public function onNewSubscribe(SubscribeEvent $event)
    {
        $subscribe = $event->getSubscribe();
        $this->subscribeService->updateSubscribedTarget($subscribe);
    }

    public function onDeleteSubscribe(SubscribeEvent $event)
    {
        $subscribe = $event->getSubscribe();

        $this->subscribeService->updateUnSubscribedTarget($subscribe);
    }

}