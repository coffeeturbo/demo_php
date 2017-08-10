<?php
namespace AppBundle\Entity;

interface ModifyDateEntityInterface
{
    public function getCreated(): \DateTime;
    public function setCreated(\DateTime $date);
    public function getUpdated(): \DateTime;
    public function markUpdated();
}