<?php
namespace VoteBundle\Formatter;

use AppBundle\Formatter\Formatter;
use VoteBundle\Entity\Vote;

class VoteFormatter extends Formatter
{

    function format()
    {
        if($this->resource instanceof Vote){
            return $this->formatFromObject($this->resource);
        } elseif(is_array($this->resource)) {
            return $this->formatFromArray($this->resource);
        }
    }


    private function formatFromObject(Vote $vote)
    {

        return [
            'id' => $vote->getId(),
            'content_type' => $vote->getContentType()->getStringCode(),
            'state' =>  $vote ? $vote->getType()->getStringCode() : 'none',
            'content_id' => $vote->getContentId()
        ];

    }

    private function formatFromArray(array $vote)
    {
        return [
//            'state' => $vote['type']
        ];
    }

}