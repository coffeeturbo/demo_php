<?php
namespace TagBundle\Tag;

interface TagEntityInterface
{
    public function getName();
    public function setName($name);
}