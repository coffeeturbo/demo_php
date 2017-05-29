<?php
namespace ProfileBundle\Entity\Profile\Gender;

use ProfileBundle\Entity\Profile\Gender;

class MaleGender extends Gender
{
    const STRING_CODE = 'male';
    const INT_CODE = 1;

    public function getIntCode(): int
    {
        return self::INT_CODE;
    }

    public function getStringCode(): string
    {
        return self::STRING_CODE;
    }
}