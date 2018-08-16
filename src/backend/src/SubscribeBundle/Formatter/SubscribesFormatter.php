<?php
namespace SubscribeBundle\Formatter;

use AppBundle\Formatter\Formatter;

class SubscribesFormatter extends Formatter
{
    function format()
    {
        return array_map(function($subscribe){
            return (new SubscribeFormatter($subscribe))->format();
        }, $this->resource);
    }

}