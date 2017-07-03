<?php

namespace AvatarBundle\Image;

trait BackdropEntityTrait
{
    private $backdrop;

    public function getBackdropCollection(): ImageCollection
    {
        return ImageCollection::createFromJson($this->backdrop);
    }

    public function setBackdropCollection(ImageCollection $collection)
    {
        $this->backdrop = $collection->jsonSerialize();
        return $this;
    }
}