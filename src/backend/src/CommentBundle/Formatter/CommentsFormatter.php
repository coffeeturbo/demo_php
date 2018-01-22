<?php
namespace CommentBundle\Formatter;

use AppBundle\Formatter\Formatter;

class CommentsFormatter extends Formatter
{

    function format()
    {
        return array_map(function($comment){
            return (new CommentFormatter($comment))->format();
        }, $this->resource);
    }

}