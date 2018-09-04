<?php
namespace ProfileBundle\Formatter;

use AppBundle\Formatter\Formatter;
use ImageBundle\Formatter\AvatarFormatter;
use ImageBundle\Formatter\ImageFormatter;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Entity\Profile\Gender;

class ArrayProfileFormatter extends Formatter
{
    function format()
    {

        return [
            'id'         => $this->resource['id'],
            'account_id' => isset($this->resource['account']) ? $this->resource['account']['id']: null,
            'gender'     => Gender::createFromIntCode($this->resource['gender'])->getStringCode(),
            'name'       => $this->resource['name'],
            'alias'      => $this->resource['alias'],
            'avatar'     => (new AvatarFormatter($this->resource['avatar']))->format(),
            'backdrop'   => (new ImageFormatter($this->resource['backdrop']))->format(),
            'birth_date' => isset($this->resource['birthDate']) ? $this->resource['birthDate']->format(Profile::BIRTH_DATE_FORMAT) : null,
            'verified'   => $this->resource['verified'],
            'created'    => $this->resource['created']->format(\DateTime::W3C),
            'rating'     => isset($this->resource['votesRating']) ? $this->resource['votesRating'] : null,
            'subscribers_total' => $this->resource['subscribersTotal']
        ];
    }

}