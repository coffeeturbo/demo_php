<?php
namespace AvatarBundle\Image;

interface AvatarEntity
{
    public function getAvatarCollection(): ImageCollection;
    public function setAvatarCollection(ImageCollection $collection);
}