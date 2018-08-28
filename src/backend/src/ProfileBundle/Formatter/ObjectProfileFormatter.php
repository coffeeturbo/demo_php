<?php
namespace ProfileBundle\Formatter;

use AppBundle\Formatter\Formatter;
use ImageBundle\Formatter\AvatarFormatter;
use ImageBundle\Formatter\ImageFormatter;
use ProfileBundle\Entity\Profile;

class ObjectProfileFormatter extends Formatter
{
    function format()
    {
        if($this->resource instanceof Profile){
            return [
                'id'         => $this->resource->getId(),
                'account_id' => $this->resource->getAccount()->getId(),
                'gender'     => $this->resource->getGender()->getStringCode(),
                'name'       => $this->resource->getName(),
                'alias'      => $this->resource->getAlias(),
//                'avatar'     => (new AvatarFormatter($this->resource->getAvatarCollection()))->format(),
//                'backdrop'   => (new ImageFormatter($this->resource->getBackdrop()))->format(),
                'birth_date' => $this->resource->getBirthDate()?$this->resource->getBirthDate()->format(Profile::BIRTH_DATE_FORMAT): null,
                'verified'   => $this->resource->isVerified(),
                'created'    => $this->resource->getCreated()->format(\DateTime::W3C),
                'rating'     => $this->resource->getVotesRating(),
                'subscribers_total' => $this->resource->getSubscribersTotal()
            ];
        }
    }

}