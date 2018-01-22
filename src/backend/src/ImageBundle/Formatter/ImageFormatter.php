<?php
namespace ImageBundle\Formatter;

use AppBundle\Formatter\Formatter;

class ImageFormatter extends Formatter
{
    function format()
    {
        return [
            'public_path' => $this->resource['public_path'] ?? null,
            'storage_path' => $this->resource['storage_path'] ?? null,
            'name' => $this->resource['name']?? null
        ];
    }

}