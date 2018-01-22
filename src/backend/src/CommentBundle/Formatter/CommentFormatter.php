<?php
namespace CommentBundle\Formatter;

use AppBundle\Formatter\Formatter;
use CommentBundle\Entity\Comment;

class CommentFormatter extends Formatter
{

    function format(): ?array
    {
        if($this->resource instanceof Comment){
            return (new ObjectCommentFormatter($this->resource))->format();
        }elseif(is_array($this->resource)){
            return (new ArrayCommentFormatter($this->resource))->format();
        }else {
            return new \Exception("Unknown type format of object comment");
        }

    }

}