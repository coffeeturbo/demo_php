<?php
namespace AuthBundle\Http;

use Symfony\Component\HttpFoundation\JsonResponse;

class TokenResponse extends JsonResponse implements \JsonSerializable 
{
    private $token;
    
    function __construct($token = null)
    {
        $this->token = $token;
        parent::__construct(self::jsonSerialize());
    }

    public function jsonSerialize()
    {
        return [
            "token"=> (string) $this->token
        ];
    }
}