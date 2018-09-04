<?php

namespace ProfileBundle\Response;

use AccountBundle\Entity\Account;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Formatter\ProfileFormatter;
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
                'avatar' => $profile->getAvatarCollection()->jsonSerialize(),
                'backdrop' => $profile->getBackdrop() ?  $profile->getBackdrop()->jsonSerialize(): $profile->getBackdrop(),
                'birth_date' => $profile->getBirthDate() ? $profile->getBirthDate()->format(Profile::BIRTH_DATE_FORMAT) : null,
                'verified' => $profile->isVerified(),
                'created' => $profile->getCreated()->format(\DateTime::W3C),
                'rating' => $profile->getVotesRating(),

                'subscribe' => [
                    'status' => !is_null($profile->getSubscribe()) ? true : false,
                    'subscribers_total' => $profile->getSubscribersTotal(),
                ]

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