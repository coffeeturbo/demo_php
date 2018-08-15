<?php

namespace SubscribeBundle\Entity\SubscribeType;

abstract class SubscribeType
{
    abstract function getIntCode(): int;
    abstract function getStringCode(): string;

    static public function createFromIntCode(int $code)
    {
        switch($code){
            case SubscribeProfileType::INT_CODE:
                return new SubscribeProfileType();

            default: throw new \Exception("Unknown subscribe code $code");
        }
    }

    static public function createFromStringCode(string $code)
    {
        switch($code){
            case SubscribeProfileType::STRING_CODE:
                return new SubscribeProfileType();

            default: throw new \Exception("Unknown subscribe code $code");
        }
    }
}