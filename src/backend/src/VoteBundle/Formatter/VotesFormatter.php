<?php
namespace VoteBundle\Formatter;

use AppBundle\Formatter\Formatter;

class VotesFormatter extends Formatter
{
    function format()
    {
        return array_map(function($vote){
            return (new VoteFormatter($vote))->format();
        }, $this->resource);
    }
}