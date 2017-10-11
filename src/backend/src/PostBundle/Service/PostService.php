<?php
namespace PostBundle\Service;

use PostBundle\Entity\Post;
use PostBundle\Repository\PostRepository;

class PostService
{

    private $postRepository;
    private $maxTagsLimit;
    private $maxAttachmentsLimit;

    public function __construct(
        PostRepository $postRepository,
        int $maxTagsLimit,
        int $maxAttachmentsLimit
    ){
        $this->postRepository = $postRepository;
        $this->maxTagsLimit = $maxTagsLimit;
        $this->maxAttachmentsLimit = $maxAttachmentsLimit;
    }

    public function getPostRepository(): PostRepository
    {
        return $this->postRepository;
    }

    public function create(Post $post): Post
    {
        $this->postRepository->save($post);

        return $post;
    }


}