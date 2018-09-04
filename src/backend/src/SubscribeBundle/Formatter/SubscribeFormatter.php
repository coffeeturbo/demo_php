<?php
namespace SubscribeBundle\Formatter;

use AppBundle\Formatter\Formatter;
use SubscribeBundle\Entity\Subscribe;

class SubscribeFormatter extends Formatter
{
    function format()
    {
        if($this->resource instanceof Subscribe){
            return (new ObjectSubscribeFormatter($this->resource))->format();
        }
    }

}