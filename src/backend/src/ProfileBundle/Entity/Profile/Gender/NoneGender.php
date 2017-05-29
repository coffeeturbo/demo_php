<?php
namespace ProfileBundle\Entity\Profile\Gender;

use ProfileBundle\Entity\Profile\Gender;

class NoneGender extends Gender
{
    const STRING_CODE = 'none';
    const INT_CODE = 0;

    public function getIntCode(): int
    {
        return self::INT_CODE;
    }

    public function getStringCode(): string
    {
        return self::STRING_CODE;
    }
}