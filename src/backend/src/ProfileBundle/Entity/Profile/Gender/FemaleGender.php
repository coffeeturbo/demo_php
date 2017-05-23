<?php
namespace ProfileBundle\Entity\Profile\Gender;

class FemaleGender extends Gender
{
    const STRING_CODE = 'female';
    const INT_CODE = 2;

    public function getIntCode(): int
    {
        return self::INT_CODE;
    }

    public function getStringCode(): string
    {
        return self::STRING_CODE;
    }
}