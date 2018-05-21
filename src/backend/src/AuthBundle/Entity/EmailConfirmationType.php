<?php
namespace AuthBundle\Entity;

class EmailConfirmationType extends ConfirmationType
{
    const STRING_CODE = 'email-confirmation';
    const INT_CODE = 1;

    public function getIntCode()
    {
        return self::INT_CODE;
    }

    public function getStringCode()
    {
        return self::STRING_CODE;
    }

}