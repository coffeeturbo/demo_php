<?php
namespace AppBundle\Entity;

use Symfony\Component\Validator\Constraints\DateTime;

trait ModifyDateEntityTrait
{
    private $created;
    private $updated;

    public function setCreated(\DateTime $dateTime): self
    {
        $this->created = $dateTime;

        return $this;
    }

    public function getCreated(): \DateTime
    {
        return $this->created;
    }

    public function markUpdated(): self
    {
        $this->updated = new DateTime();
        return $this;
    }

    public function getUpdated(): \DateTime
    {
        return $this->updated;
    }
}