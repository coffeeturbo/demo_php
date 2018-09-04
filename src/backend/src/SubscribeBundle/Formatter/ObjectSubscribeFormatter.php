<?php
namespace SubscribeBundle\Formatter;

use AppBundle\Formatter\Formatter;
use ProfileBundle\Formatter\ProfileFormatter;
use SubscribeBundle\Entity\Subscribe;

class ObjectSubscribeFormatter extends Formatter
{
    function format()
    {
        if ($this->resource instanceof Subscribe){
            return [
                'id'        => $this->resource->getId(),
                'target_id' => $this->resource->getTargetId(),
                'type'      => $this->resource->getType()->getStringCode(),
                'profile'   => (new ProfileFormatter($this->resource->getProfile()))->format(),
                'created'   => $this->resource->getCreated()->format(\DateTime::W3C),
            ];
        }
    }

}