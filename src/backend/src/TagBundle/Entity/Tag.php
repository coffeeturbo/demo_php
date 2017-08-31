<?php
namespace TagBundle\Entity;

class Tag
{
    private $id;
    private $name;

    public function __toString()
    {
        return $this->name;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
        return $this;
    }


    static public function createFromJson(array $data)
    {
        $tag = new Tag();
        $tag->setName($data['name'])->setId($data['id']);

        return $tag;

    }

}