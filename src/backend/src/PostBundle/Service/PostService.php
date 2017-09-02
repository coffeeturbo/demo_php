<?php
namespace PostBundle\Service;

use PostBundle\Entity\Post;
use PostBundle\Repository\PostRepository;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use TagBundle\Entity\Tag;
use TagBundle\Tag\TaggableEntityInterface;

class PostService
{

    private $postRepository;
    private $maxTagsLimit;

    public function __construct(
        PostRepository $postRepository,
        int $maxTagsLimit
    ){
        $this->postRepository = $postRepository;
        $this->maxTagsLimit = $maxTagsLimit;
    }

    public function createFromData(array $data): Post
    {

        $newPost = new Post();

        if(is_null($data['title']))
            throw new BadRequestHttpException("field title required");

        $newPost->setTitle($data['title'])
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
        if($this->maxTagsLimit < count($jsonTags))
            throw new AccessDeniedHttpException(sprintf("you have exceed tag limit: %s", $this->maxTagsLimit));

        foreach($jsonTags as $tagJson) {
            $tag = new Tag();

            if(is_null($tagJson['entity']['name'])
                || (strlen($tagJson['entity']['name']) === 0)  )
                throw new BadRequestHttpException("field name required");

            $tag->setId($tagJson['entity']['id'] ?? null)->setName($tagJson['entity']['name']);

            if(!$entity->hasTag($tag)) $entity->addTag($tag);

        }

        return $this;
    }

}