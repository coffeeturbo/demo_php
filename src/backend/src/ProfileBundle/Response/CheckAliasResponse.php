<?php

namespace ProfileBundle\Response;

use Symfony\Component\HttpFoundation\JsonResponse;

class CheckAliasResponse extends JsonResponse implements \JsonSerializable
{
    private $available;

    function __construct(bool $available = true)
    {
        $this->available = $available;
        parent::__construct(self::jsonSerialize());
    }

    public function jsonSerialize()
    {
        return [
            "available" => $this->available
        ];
    }
}