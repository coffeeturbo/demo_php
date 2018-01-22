<?php
namespace ImageBundle\Formatter;

use AppBundle\Formatter\Formatter;

class AvatarFormatter extends Formatter
{
    function format()
    {

        $result = null;

        if($this->resource){
            $result =  array_map(function($image){
                return (new ImageFormatter($image))->format();
            }, $this->resource);
        }

        return $result;
    }

}