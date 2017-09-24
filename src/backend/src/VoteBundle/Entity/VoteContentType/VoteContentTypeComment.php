<?php
namespace VoteBundle\Entity\VoteContentType;

class VoteContentTypeComment extends VoteContentType
{
    const INT_CODE = 2;
    const STRING_CODE = 'comment';

    function getIntCode(): int
    {
        return self::INT_CODE;
    }

    function getStringCode(): string
    {
        return self::STRING_CODE;
    }

}