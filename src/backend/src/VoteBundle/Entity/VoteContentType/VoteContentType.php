<?php
namespace VoteBundle\Entity\VoteContentType;

use PostBundle\Entity\Post;
use VoteBundle\Vote\VoteableEntity;

abstract class VoteContentType
{

    abstract function getIntCode(): int;
    abstract function getStringCode():string ;

    public static function createFromStringCode(string $string): VoteContentType
    {
        switch(strtolower($string)){
            case VoteContentTypePost::STRING_CODE:
                return new VoteContentTypePost();
            case VoteContentTypeComment::STRING_CODE:
                return  new VoteContentTypeComment();
            default:
                throw new \Exception(sprintf('Unknown string code %s', $string));
        }
    }

    public static function createFromIntCode(int $code): VoteContentType
    {
        switch($code){
            case VoteContentTypePost::INT_CODE:
                return new VoteContentTypePost();
            case VoteContentTypeComment::INT_CODE:
                return  new VoteContentTypeComment();
            default:
                throw new \Exception(sprintf('Unknown int code %s', $code));
        }
    }

    public static function createFromObject(VoteableEntity $entity): VoteContentType
    {
        if($entity instanceof Post)
            return new VoteContentTypePost();

        throw new \Exception(sprintf("unknown vote content type"));
    }
}