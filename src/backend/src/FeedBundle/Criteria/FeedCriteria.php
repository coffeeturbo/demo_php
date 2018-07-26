<?php
namespace FeedBundle\Criteria;

class FeedCriteria extends Criteria
{

    private $validOrders = [
        'id',
        'votesRating',
        'votes_rating',
        'rating',
    ];

    private $startDate;
    private $endDate;
    private $profileId;
    private $tags;

    public function __construct(int $limit, $cursor,
                                string $order,
                                string $direction,
                                \DateTime $dateFrom = null,
                                \DateTime $dateTo = null,
                                $profileId = null,
                                array $tags = null)
    {
        parent::__construct($limit, $cursor);

        $this->setOrder($order);
        $this->direction = $direction;
        $this->startDate = $dateFrom;
        $this->endDate = $dateTo;
        $this->profileId = $profileId;
        $this->tags = $tags;
    }

    public function getProfileId()
    {
        return $this->profileId;
    }

    public function setProfileId($profileId)
    {
        $this->profileId = $profileId;
    }

    public function getStartDate(): ?\DateTime
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTime $startDate)
    {
        $this->startDate = $startDate;
        return $this;
    }

    public function getEndDate(): ?\DateTime
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTime $endDate)
    {
        $this->endDate = $endDate;
        return $this;
    }


    public function setOrder(string $order)
    {
        if(strcmp($order, 'votes_rating') == 0
            | strcmp($order, 'rating') == 0
        ){
            $order = 'votesRating';
        }

        $this->order = $order;
        return $this;
    }

    public function setDirection(string $direction)
    {
        $this->direction = $direction;
    }

    public function getTags(): ?array
    {
        return $this->tags;
    }

}