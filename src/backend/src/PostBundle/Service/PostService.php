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
        $this->postRepository->saveWithTagsAndAttachments($post);

        return $post;
    }

    public function update(Post $post): Post
    {
        $this->postRepository->saveWithTagsAndAttachments($post);

        return $post;
    }

    public function deletePostById(int $id)
    {
        // тут нужна проверка

        $postRepo = $this->getPostRepository();

        $post = $postRepo->getPostById($id);

        $postRepo->delete($post);

        return $post;
    }

    public function getSimilarPosts(int $id)
    {

        return $this->postRepository->getTopTagsWithCount($id, 10);


//        $post = $this->postRepository->getPostById($id);


        // получаем посты по тегам

//        $tags = $post->getTags()->toArray();
        // получаем теги с количеством

        // получаем посты по тегам с наибольшим рейтингом


//        $qb= $this->postRepository->getEntityManager()->createQueryBuilder();


//        $qb->select('p')
//            ->join('p');

//        dump($tags);


    }


}