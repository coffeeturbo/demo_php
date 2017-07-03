<?php
namespace AvatarBundle\Image;

trait AvatarEntityTrait
{
    private $avatar;

    public function getAvatarCollection(): ImageCollection
    {
        return ImageCollection::createFromJson($this->avatar);
    }

    public function setAvatarCollection(ImageCollection $collection)
    {
        $this->avatar = $collection->jsonSerialize();
        return $this;
    }

}
