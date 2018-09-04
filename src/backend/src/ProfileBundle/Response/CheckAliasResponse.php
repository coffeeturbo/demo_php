<?php

namespace ProfileBundle\Response;

use Symfony\Component\HttpFoundation\JsonResponse;

class CheckAliasResponse extends JsonResponse
{
    private $available;

    function __construct(bool $available = true)
    {
        $this->available = $available;
        parent::__construct(null, $available ? 200 : 423);
    }
}