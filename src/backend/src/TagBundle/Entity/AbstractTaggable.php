<?php
namespace TagBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\PersistentCollection;
use TagBundle\Tag\TagEntityInterface;
use TagBundle\Tag\TaggableEntityInterface;

abstract class AbstractTaggable implements TaggableEntityInterface
{
    protected $tags;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
    }

    public function getTags():?PersistentCollection
    {
        return $this->tags;
    }

    public function addTag(TagEntityInterface $tag)
    {
        $this->tags->add($tag);
    }

    public function removeTag(TagEntityInterface $tag)
    {
        $this->tags->remove($tag);
    }

    public function hasTag(TagEntityInterface $tag): bool
    {
        foreach($this->getTags() as $postTag){
            /** @var $postTag Tag */
            if( $postTag->getName() === $tag->getName())
                return true;
        }

        return false;
    }



}