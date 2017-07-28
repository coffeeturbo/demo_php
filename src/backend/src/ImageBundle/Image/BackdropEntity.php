<?php
namespace ImageBundle\Image;

interface BackdropEntity
{
    public function getBackdrop();
    public function setBackdrop(Image $backdrop);
}