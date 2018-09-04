<?php
namespace SubscribeBundle\Entity\SubscribeType;

class SubscribeProfileType extends SubscribeType
{

    const INT_CODE = 1;
    const STRING_CODE = 'profile-subscribe';

    function getIntCode(): int
    {
        return self::INT_CODE;
    }

    function getStringCode(): string
    {
        return self::STRING_CODE;
    }

}