<?php

namespace AcmeBundle\Controller;

use AppBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class AcmeController extends Controller
{
    public function sendMessageAction(Request $request)
    {
        $client = $this->container->get('thruway.client');
        $client->publish("ru.socilite.jet.test", [$request->getContent()]);
        return new JsonResponse([]);
    }
}