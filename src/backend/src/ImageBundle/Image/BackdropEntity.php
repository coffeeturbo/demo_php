<?php
namespace ImageBundle\Image;

interface BackdropEntity
{
    public function getBackdrop(): ?Image;
    public function setBackdrop(?Image $backdrop);
}