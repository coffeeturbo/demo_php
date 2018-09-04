<?php
namespace FeedBundle\Strategy;

use FeedBundle\Criteria\FeedCriteria;
use PostBundle\Repository\PostRepository;

abstract class FeedStrategy
{
    protected $posts;
    /** @var PostRepository  */
    protected $postRepository;
    protected $feedCriteria;


    public function __construct(FeedCriteria $feedCriteria, PostRepository $postRepository)
    {
        $this->feedCriteria = $feedCriteria;
        $this->postRepository = $postRepository;
    }


    public function getPostRepository(): PostRepository
    {
        return $this->postRepository;
    }

    abstract function getPosts();
}