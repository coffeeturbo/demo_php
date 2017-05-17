<?php
namespace AppBundle\Http;

use Symfony\Component\HttpFoundation\JsonResponse;

class ErrorResponse extends JsonResponse
{
    function __construct($message, $code = 500)
    {
        parent::__construct(['code' => $code, "message" => $message], $code);
    }
}