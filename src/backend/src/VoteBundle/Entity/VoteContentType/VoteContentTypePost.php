<?php
namespace VoteBundle\Entity\VoteContentType;

class VoteContentTypePost extends VoteContentType
{
    const INT_CODE = 1;
    const STRING_CODE = 'post';

    function getIntCode(): int
    {
        return self::INT_CODE;
    }

    function getStringCode(): string
    {
        return self::STRING_CODE;
    }
}