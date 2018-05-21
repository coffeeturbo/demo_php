<?php
namespace AuthBundle\Entity;

abstract class ConfirmationType
{
    abstract public function getIntCode();

    abstract public function getStringCode();


    static public function createFromIntCode(int $code): ConfirmationType
    {
        switch($code){
            case EmailConfirmationType::INT_CODE: return new EmailConfirmationType();
            case SmsConfirmationType::INT_CODE: return new SmsConfirmationType();
            default: throw  new \Exception("unknown int code $code");
        }
    }

    static public function createFromStringCode($code)
    {
        switch($code){
            case EmailConfirmationType::STRING_CODE: return new EmailConfirmationType();
            case SmsConfirmationType::STRING_CODE: return new SmsConfirmationType();
            default: throw new \Exception("unknown string code $code");
        }
    }
}