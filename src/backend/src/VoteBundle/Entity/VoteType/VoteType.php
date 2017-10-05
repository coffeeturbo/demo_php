<?php
namespace VoteBundle\Entity\VoteType;

abstract class VoteType
{
    abstract function getIntCode(): int;
    abstract function getStringCode():string;

    public static function createFromStringCode(string $code): self
    {
        switch(strtolower($code)){
            case VoteTypePositive::STRING_CODE:
                return  new VoteTypePositive();
            case VoteTypeNegative::STRING_CODE:
                return new VoteTypeNegative();
            default:
                throw new \Exception(sprintf('Unknown string code %s', $code));
        }
    }

    public static function createFromIntCode(int $code): self
    {
        switch($code){
            case VoteTypePositive::INT_CODE:
                return new VoteTypePositive();
            case VoteTypeNegative::INT_CODE:
                return  new VoteTypeNegative();
            default:
                throw new \Exception(sprintf('Unknown int code %s', $code));
        }
    }
}