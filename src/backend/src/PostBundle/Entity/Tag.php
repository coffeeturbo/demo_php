<?php
namespace PostBundle\Entity;

use Beelab\TagBundle\Tag\TaggableInterface;
use Beelab\TagBundle\Tag\TagInterface;
use Doctrine\ORM\Mapping as ORM;


class Tag implements TagInterface
{


    protected $id;


    protected $name;


    public function __toString(): string
    {
        return $this->name;
    }


    public function getId(): int
    {
        return $this->id;
    }


    public function setName($name)
    {
        $this->name = $name;
    }


    public function getName()
    {
        return $this->name;
    }

}