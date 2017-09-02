<?php
namespace PostBundle\Service;

use PostBundle\Entity\Post;
use PostBundle\Repository\PostRepository;
use TagBundle\Entity\Tag;
use TagBundle\Tag\TaggableEntityInterface;

class PostService
{

    private $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function createFromData(array $data): Post
    {

        $newPost = new Post();
        $newPost->setTitle($data['title'] ?? null)
        ;

        $jsonTags = json_decode($data['tags'], true);

        $this->setTagsFromJson($newPost, $jsonTags);

        $this->create($newPost);

        return $newPost;
    }

    public function create(Post $post): Post
    {
        $this->postRepository->save($post);

        return $post;
    }

    public function setTagsFromJson(TaggableEntityInterface $entity, array $jsonTags)
    {
        foreach($jsonTags as $tagJson) {
            $tag = new Tag();
            $tag->setId($tagJson['entity']['id'] ?? null)->setName($tagJson['entity']['name']);

            if(!$entity->hasTag($tag)) $entity->addTag($tag);

        }

        return $this;
    }

}