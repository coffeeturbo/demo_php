<?php
namespace AvatarBundle\Image;

use ImageBundle\Image\ImageCollection;

interface AvatarEntity
{
    public function getAvatarCollection(): ImageCollection;
    public function setAvatarCollection(ImageCollection $collection);
}