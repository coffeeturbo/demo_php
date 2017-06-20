<?php
namespace AvatarBundle\Image;

interface ImageEntity
{
    public function getImages(): ImageCollection;
    public function setImages(ImageCollection $collection);
}
