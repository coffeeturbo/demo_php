<?php
namespace VoteBundle\Formatter;

use AppBundle\Formatter\Formatter;
use CommentBundle\Formatter\CommentFormatter;
use PostBundle\Formatter\PostFormatter;
use VoteBundle\Entity\VoteContentType\VoteContentTypeComment;
use VoteBundle\Entity\VoteContentType\VoteContentTypePost;
use VoteBundle\Vote\VoteableEntity;

class VotedContentFormatter extends Formatter
{
    function format()
    {
        return array_map(function(VoteableEntity $resource){

            switch($resource->getType()->getIntCode()){
                case VoteContentTypeComment::INT_CODE:
                    return (new CommentFormatter($resource))->format();

                case VoteContentTypePost::INT_CODE:
                    return (new PostFormatter($resource))->format();
            }
        } , $this->resource);
    }
}