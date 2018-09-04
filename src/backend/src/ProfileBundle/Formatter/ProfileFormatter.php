<?php
namespace ProfileBundle\Formatter;

use AppBundle\Formatter\Formatter;
use ProfileBundle\Entity\Profile;

class ProfileFormatter extends Formatter
{
    function format()
    {
        if(is_array($this->resource )){
            return (new ArrayProfileFormatter($this->resource ))->format();
        } elseif($this->resource instanceof Profile){
            return (new ObjectProfileFormatter($this->resource))->format();
        }
    }

}