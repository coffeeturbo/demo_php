<?php

namespace PostBundle\Repository;

use AttachmentBundle\Entity\Attachment;
use PostBundle\Entity\Post;
use TagBundle\Entity\Tag;

class PostRepository extends \Doctrine\ORM\EntityRepository
{

    public function save(Post $post)
    {
        $em = $this->getEntityManager();
        $tagRep = $em->getRepository(Tag::class);

        $attachmentRep = $em->getRepository(Attachment::class);

        $em->persist($post);

        // сохраняем теги
        $tagRep->saveTags($post);

        $attachmentRep->saveAttachments($post);

        $em->flush($post);
    }
}
