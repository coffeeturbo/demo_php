<?php

namespace AvatarBundle\Image;

interface BackdropEntity
{
    public function getBackdropCollection(): ImageCollection;
    public function setBackdropCollection(ImageCollection $collection);
}