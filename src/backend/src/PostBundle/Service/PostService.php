<?php
namespace PostBundle\Service;

use PostBundle\Entity\Post;
use PostBundle\Repository\PostRepository;

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

        $this->create($newPost);


        return $newPost;
    }

    public function create(Post $post): Post
    {

        $this->postRepository->save($post);

        return $post;
    }

}