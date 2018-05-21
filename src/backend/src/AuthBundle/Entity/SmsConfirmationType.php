<?php
namespace AuthBundle\Entity;

class SmsConfirmationType extends ConfirmationType
{
    const STRING_CODE = 'sms-confirmation';
    const INT_CODE = 2;

    public function getIntCode()
    {
        return self::INT_CODE;
    }

    public function getStringCode()
    {
        return self::STRING_CODE;
    }

}