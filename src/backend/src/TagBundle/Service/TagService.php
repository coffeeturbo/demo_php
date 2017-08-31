<?php
namespace TagBundle\Service;

use TagBundle\Entity\Tag;
use TagBundle\Repository\TagRepository;

class TagService
{

    private $tagRepository;

    public function __construct(TagRepository $repository)
    {
        $this->tagRepository = $repository;
    }

    public function create(string $name): Tag
    {
        $tag = new Tag;
        $tag->setName($name);

        $this->tagRepository->create($tag);

        return $tag;
    }
}