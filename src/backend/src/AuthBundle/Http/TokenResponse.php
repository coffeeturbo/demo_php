<?php
namespace AuthBundle\Http;

use Symfony\Component\HttpFoundation\JsonResponse;

class TokenResponse extends JsonResponse implements \JsonSerializable 
{
    private $token;
    private $refresh_token;
    
    function __construct($token = null, $refresh_token = null)
    {
        $this->token = $token;
        $this->refresh_token = $refresh_token;
        parent::__construct(self::jsonSerialize());
    }

    public function jsonSerialize()
    {
        return [
            "token" => (string) $this->token,
            "refresh_token" => (string) $this->refresh_token,
        ];
    }
}