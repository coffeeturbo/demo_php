<?php
namespace AppBundle\Delete;

trait DeleteTrait
{
    private $isDeleted = 0;

    public function getIsDeleted()
    {
        return $this->isDeleted;
    }

    public function markAsDeleted()
    {
        $this->isDeleted = true;
        return $this;
    }

    public function markAsNotDeleted()
    {
        $this->isDeleted = false;
        return $this;
    }

}