<?php
namespace TagBundle\Tag;

interface TaggableEntityInterface
{
    public function getTags();
    public function addTag(TagEntityInterface $tag);
    public function removeTag(TagEntityInterface $tag);
    public function hasTag(TagEntityInterface $tagEntity): bool;
}