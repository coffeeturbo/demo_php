<?php
namespace ImageBundle\Image;

trait ImageEntityTrait
{
    private $image;

    public function getImages(): ImageCollection
    {
        return ImageCollection::createFromJson($this->image);
    }

    public function setImages(ImageCollection $collection): self
    {
        $this->image = $collection->jsonSerialize();
        return $this;
    }
}