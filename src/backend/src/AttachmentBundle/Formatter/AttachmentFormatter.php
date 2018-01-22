<?php
namespace AttachmentBundle\Formatter;

use AppBundle\Formatter\Formatter;

class AttachmentFormatter extends Formatter
{
    function format()
    {
        if(is_array($this->resource) ){
            return (new ArrayAttachmentFormatter($this->resource))->format();
        }
    }

}