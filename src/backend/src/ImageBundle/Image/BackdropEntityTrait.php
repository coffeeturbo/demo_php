<?php
namespace ImageBundle\Image;

trait BackdropEntityTrait
{
    private $backdrop;

    public function getBackdrop(): ?Image
    {
        return  Image::createFromJson($this->backdrop);
    }

    public function setBackdrop(?Image $backdrop)
    {
        $this->backdrop = $backdrop ? $backdrop->jsonSerialize() : $backdrop;
        return $this;
    }
}