<?php
namespace AttachmentBundle\Repository;

use AttachmentBundle\Entity\Attachment;
use Doctrine\ORM\EntityRepository;

class AttachmentRepository extends EntityRepository
{
    public function create(Attachment $attachment)
    {
        $em = $this->getEntityManager();
        $em->persist($attachment);
        $em->flush($attachment);
    }
}