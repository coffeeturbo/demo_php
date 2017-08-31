<?php
namespace PostBundle\Service;

use PostBundle\Entity\Post;
use PostBundle\Repository\PostRepository;
use TagBundle\Entity\Tag;

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

        $tags = array_map(function(array $json){
            return Tag::createFromJson($json['entity']);
        }, $jsonTags);


        foreach($tags as $tag){
            $newPost->addTag($tag);
        }

        $this->create($newPost);


        return $newPost;
    }

    public function create(Post $post): Post
    {
        $this->postRepository->save($post);

        return $post;
    }

}