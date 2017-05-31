<?php

namespace AcmeBundle\Controller;

use AppBundle\Controller\Controller;
use AppBundle\Http\ErrorResponse;
use Gos\Bundle\PubSubRouterBundle\Exception\InvalidArgumentException;
use Gos\Bundle\PubSubRouterBundle\Router\Route;
use Gos\Bundle\PubSubRouterBundle\Router\Router;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AcmeController extends Controller
{
    public function sendMessageAction(Request $request)
    {
        try {
            /** @var Router $router */
            $router = $this->container->get('gos_pubsub_router.websocket');
            $channel = $router->generate('im', [
                'account' => $this->getAccount()->getId()
            ]);
            
            $client = $this->container->get('thruway.client');
            $client->publish($channel, [$request->getContent()]);
            
            /** @var Route $route */
            //list($routeName, $route, $attributes) = $router->match($channel, '/');
            //call_user_func($route->getCallback(), $request->getContent());
            
            return new Response("");
            
        } catch (InvalidArgumentException $e) {
            return new ErrorResponse("Bad request");
        }

    }
}