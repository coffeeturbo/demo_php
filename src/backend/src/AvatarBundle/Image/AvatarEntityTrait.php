<?php
namespace AvatarBundle\Image;

use ImageBundle\Image\ImageCollection;

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
