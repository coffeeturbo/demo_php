<?php

namespace AvatarBundle\Image;

trait BackdropEntityTrait
{
    private $backdrop;

    public function getBackdrop(): Image
    {
        return  Image::createFromJson($this->backdrop);
    }

    public function setBackdrop($backdrop)
    {
        if($backdrop instanceof Image) {
            $this->backdrop = $backdrop->jsonSerialize();
        }

        $this->backdrop = $backdrop;
        return $this;
    }
}