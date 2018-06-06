<?php
namespace AuthBundle\Entity;

class PasswordRecoverConfirmationType extends ConfirmationType
{
    const INT_CODE = 3;
    const STRING_CODE = 'password-recover-confirm';

    public function getIntCode()
    {
        return self::INT_CODE;
    }

    public function getStringCode()
    {
        return self::STRING_CODE;
    }
}