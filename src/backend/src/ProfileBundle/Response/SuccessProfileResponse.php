<?php

namespace ProfileBundle\Response;

use AccountBundle\Entity\Account;
use ProfileBundle\Entity\Profile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SuccessProfileResponse extends JsonResponse implements \JsonSerializable
{
    private $entity;

    function __construct(Profile $entity = null, bool $isCreated = false)
    {
        $this->entity = $entity;
        parent::__construct(self::jsonSerialize(), $isCreated ? Response::HTTP_CREATED : Response::HTTP_OK);
    }

    public function jsonSerialize()
    {
        $profile = $this->entity ?? $this->createMockProfile();
        return [
            "entity" => [
                'id' => $profile->getId(),
                'account_id' => $profile->getAccount()->getId(),
                'gender' => $profile->getGender()->getStringCode(),
                'name' => $profile->getName(),
                'alias' => $profile->getAlias(),
                'image' => $profile->getImages()->jsonSerialize(),
                'birth_date' => $profile->getBirthDate() ? $profile->getBirthDate()->format(Profile::BIRTH_DATE_FORMAT) : null,
                'verified' => $profile->isVerified(),
                'created' => $profile->getCreated()->format(\DateTime::W3C)
            ]
        ];
    }
    
    private function createMockProfile()
    {
        return (new Profile())
            ->setAccount(new Account())
            ->setName("Foo Bar")
            ->setAlias("baz")
            ->setBirthDate(new \DateTime())
        ;
    }
}