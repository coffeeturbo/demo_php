<?php

namespace PostBundle\Repository;

use PostBundle\Entity\Post;

class PostRepository extends \Doctrine\ORM\EntityRepository
{

    public function save(Post $post)
    {
        $em = $this->getEntityManager();


        $em->persist($post);

        foreach($post->getTags() as $tag)
        {
            dump($tag);
            $em->merge($tag);
        }


        $em->flush();

//        $em->clear();
    }
}
