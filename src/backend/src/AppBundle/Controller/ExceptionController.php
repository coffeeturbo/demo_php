<?php

namespace AppBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Debug\Exception\FlattenException;

class ExceptionController extends Controller
{
    public function handleAction(FlattenException $exception)
    {
        return new ErrorJsonResponse(
            $exception->getMessage(),
            $exception->getTrace(),
            $exception->getStatusCode()
        );
    }
}