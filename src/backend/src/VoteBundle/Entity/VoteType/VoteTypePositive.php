<?php
namespace VoteBundle\Entity\VoteType;

class VoteTypePositive extends VoteType
{
    const INT_CODE = 1;
    const STRING_CODE = 'positive';

    function getIntCode(): int
    {
        return self::INT_CODE;
    }

    function getStringCode(): string
    {
        return self::STRING_CODE;
    }

}