<?php
namespace AppBundle\Delete;

trait DeleteTrait
{
    private $isDeleted;

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