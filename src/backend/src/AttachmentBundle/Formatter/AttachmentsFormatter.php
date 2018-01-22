<?php
namespace AttachmentBundle\Formatter;

use AppBundle\Formatter\Formatter;

class AttachmentsFormatter extends Formatter
{
    function format()
    {
        return array_map(function($attachment){
            return (new AttachmentFormatter($attachment))->format();
        }, $this->resource);
    }

}