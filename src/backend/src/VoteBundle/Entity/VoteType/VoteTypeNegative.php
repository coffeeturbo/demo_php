<?php
namespace VoteBundle\Entity\VoteType;

class VoteTypeNegative extends VoteType
{
    const INT_CODE = -1;
    const STRING_CODE = 'negative';

    function getIntCode(): int
    {
        return self::INT_CODE;
    }

    function getStringCode(): string
    {
        return self::STRING_CODE;
    }

}