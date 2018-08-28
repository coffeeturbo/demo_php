<?php
namespace ProfileBundle\Formatter;

use AppBundle\Formatter\Formatter;

class ProfilesFormatter extends Formatter
{
    function format()
    {
        return array_map(function($profile){
            return (new ProfileFormatter($profile))->format();
        },$this->resource);
    }

}