<?php

namespace AvatarBundle\Image;

trait BackdropEntityTrait
{
    private $backdrop;

    public function getBackdrop(): Image
    {
        return  Image::createFromJson($this->backdrop);
    }

    public function setBackdrop(Image $backdrop)
    {
        $this->backdrop = $backdrop->jsonSerialize();
        return $this;
    }
}