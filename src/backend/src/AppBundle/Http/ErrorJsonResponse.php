<?php
namespace AppBundle\Http;

use Symfony\Component\HttpFoundation\JsonResponse;

class ErrorJsonResponse extends JsonResponse
{
    function __construct($message, array $errors = [], $code = 500)
    {

        parent::__construct([
            'code' => $code,
            "message" => $message,
            "errors" => $errors
        ], $code);
    }
}