<?php
namespace TagBundle\Entity;

use TagBundle\Tag\TagEntityInterface;

class Tag implements TagEntityInterface
{
    private $id;

    private $name;

    function __toString()
    {
        return (string) $this->name;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id = null)
    {
        $this->id = $id;
        return $this;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = trim($name);
        return $this;
    }

}