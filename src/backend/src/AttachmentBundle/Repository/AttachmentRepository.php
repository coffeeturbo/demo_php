<?php
namespace AttachmentBundle\Repository;

use AttachmentBundle\Entity\Attachment;
use AttachmentBundle\Entity\AttachmentableEntity;
use Doctrine\ORM\EntityRepository;

class AttachmentRepository extends EntityRepository
{
    public function create(Attachment $attachment)
    {
        $em = $this->getEntityManager();
        $em->persist($attachment);
        $em->flush($attachment);
    }


    public function saveAttachments(AttachmentableEntity $entity)
    {
        $em = $this->getEntityManager();

        /** @var Attachment $attachment */
        foreach($entity->getAttachments() as $attachment){

            if($id = $attachment->getId()){

                /** @var Attachment $oldAttachment */
                $oldAttachment = $this->find($id);

                if($attachment->getContent()){
                    $oldAttachment->setContent($attachment->getContent())
                        ->setType($attachment->getType());
                }

                $entity->removeAttachment($attachment);
                $entity->addAttachment($oldAttachment);


            } else {
                $em->persist($attachment);
            }
        }
    }
}