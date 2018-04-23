<?php
namespace PostBundle\Form\Handler;

use AttachmentBundle\Service\AttachmentService;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\PersistentCollection;
use PostBundle\Entity\Post;
use PostBundle\Repository\PostRepository;
use PostBundle\Service\PostService;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use TagBundle\Entity\Tag;
use TagBundle\Response\SuccessTagsResponse;
use TagBundle\Tag\TaggableEntityInterface;

class CreatePostDataHandler
{
    private $minTagsLimit;
    private $maxTagsLimit;
    private $maxAttachmentsLimit;
    private $attachmentService;
    private $postRepository;

    public function __construct(
        int $minTagsLimit,
        int $maxTagsLimit,
        int $maxAttachmentsLimit,
        AttachmentService $attachmentService,
        PostRepository $postRepository
    ){
        $this->minTagsLimit = $minTagsLimit;
        $this->maxTagsLimit = $maxTagsLimit;
        $this->maxAttachmentsLimit = $maxAttachmentsLimit;
        $this->attachmentService = $attachmentService;
        $this->postRepository = $postRepository;
    }

    public function handle(array $data): Post
    {
        return isset($data['id'])? $this->updateFromData($data): $this->createFromData($data);
    }

    public function updateFromData(array $data): Post
    {
        /** @var Post $post */
        $post = $this->postRepository->find($data['id']);

        $post->setTitle($data['title']);
        if($data['tags']) {
            $this->setTagsFromJson($post, $data['tags']);
        }

        if($data['attachments']) {

            $this->attachmentService->setAttachmentsFromJson($post, $data['attachments'], $this->maxAttachmentsLimit);
        }

        return $post;
    }


    private function createFromData(array $data): Post
    {

        $newPost = new Post();

        if(is_null($data['title'])) {
            throw new BadRequestHttpException("field title required");
        }

        $newPost->setTitle($data['title']);


        if($data['tags']) {
            $this->setTagsFromJson($newPost, $data['tags']);
        }

        if($data['attachments']) {
            $this->attachmentService->setAttachmentsFromJson($newPost, $data['attachments'], $this->maxAttachmentsLimit);
        }

        return $newPost;
    }

    private function setTagsFromJson(TaggableEntityInterface $entity, string $jsonTagsString)
    {
        $jsonTags = json_decode($jsonTagsString, true);


        if($this->minTagsLimit > count($jsonTags)) {
            throw new AccessDeniedHttpException(sprintf("min allowed tags: %s", $this->minTagsLimit));
        }

        if($this->maxTagsLimit < count($jsonTags)) {
            throw new AccessDeniedHttpException(sprintf("you have exceed tag limit: %s", $this->maxTagsLimit));
        }


        $this->clearNotUsedTags($entity->getTags(), $jsonTags);

        foreach($jsonTags as $tagJson) {
            $tag = new Tag();

            if(is_null($tagJson['name'])
                || (strlen($tagJson['name']) === 0)
            ) {
                throw new BadRequestHttpException("field name required");
            }

            $tag->setId($tagJson['id'] ?? null)->setName($tagJson['name']);

            if(! $entity->hasTag($tag)) {
                $entity->addTag($tag);
            }
        }

        return $this;
    }

    public function clearNotUsedTags($entityTags, array $newTags)
    {

        // удаляем несовпадающие элементы

        //  ищем совпадающие элементы
        $matches = [];

        /** @var ArrayCollection $entityTags */
        foreach($newTags as $newTag) {
            foreach($entityTags->toArray() as $id => $oldTag){
                // ищим совпадения
                /** @var $oldTag Tag */
                if(strcmp(trim($newTag['name']), trim($oldTag->getName())) === 0){
                    $matches[] = $id;
                    continue;
                }
            }
        }

        // вычитаем несовпадающие элементы
        foreach($entityTags->toArray() as $iId =>  $item){
            if (!in_array($iId, $matches)) $entityTags->remove($iId);
        }

    }

}