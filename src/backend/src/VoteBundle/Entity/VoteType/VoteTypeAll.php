<?php
namespace VoteBundle\Entity\VoteType;

class VoteTypeAll extends VoteType
{
    const INT_CODE = 0;
    const STRING_CODE = 'all';

    function getIntCode(): int
    {
        return self::INT_CODE;
    }

    function getStringCode(): string
    {
        return self::STRING_CODE;
    }

}