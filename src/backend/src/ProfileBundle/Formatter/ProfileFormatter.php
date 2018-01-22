<?php
namespace ProfileBundle\Formatter;

use AppBundle\Formatter\Formatter;

class ProfileFormatter extends Formatter
{
    function format()
    {
        if(is_array($this->resource )){
            return (new ArrayProfileFormatter($this->resource ))->format();
        }
    }

}