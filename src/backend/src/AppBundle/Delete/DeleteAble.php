<?php
namespace AppBundle\Delete;

interface DeleteAble
{
    public function getIsDeleted();
    public function markAsDeleted();
    public function markAsNotDeleted();
}