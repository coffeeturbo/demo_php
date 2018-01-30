<?php
namespace VoteBundle\Formatter;

use AppBundle\Formatter\Formatter;

class VoteFormatter extends Formatter
{

    function format()
    {
        return [
            'state' =>  $this->resource ? $this->resource->getType()->getStringCode() : 'none',
        ];
    }

}