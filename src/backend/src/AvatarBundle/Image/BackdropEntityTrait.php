<?php

namespace AvatarBundle\Image;

trait BackdropEntityTrait
{
    private $backdrop;

    public function getBackdrop()
    {
        return $this->backdrop;
    }

    public function setBackdrop($backdrop)
    {
        $this->backdrop = $backdrop;
        return $this;
    }
}