<?php
namespace AttachmentBundle\Formatter;

use AppBundle\Formatter\Formatter;
use AttachmentBundle\Entity\AttachmentType\AttachmentType;

class ArrayAttachmentFormatter extends Formatter
{
    function format()
    {
        return [
                'id' => $this->resource['id'] ?? null,
                'type' => isset($this->resource['type'])
                    ? AttachmentType::createFromIntCode($this->resource['type'])->getStringCode() : null,
                'content' => $this->resource['content'] ?? null,
        ];
    }

}