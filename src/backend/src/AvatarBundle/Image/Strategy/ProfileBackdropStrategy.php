<?php
namespace AvatarBundle\Image\Strategy;

use AvatarBundle\Image\BackdropEntity;

class ProfileBackdropStrategy extends ImageStrategy
{
    public function getSizes()
    {
        return $this->sizes;
    }

    public function getEntity(): BackdropEntity
    {
        return $this->entity;
    }

    public function setEntity($entity)
    {
        $this->entity = $entity;
        return $this;
    }

}