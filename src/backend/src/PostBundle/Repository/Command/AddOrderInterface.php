<?php
namespace PostBundle\Repository\Command;

use Doctrine\ORM\QueryBuilder;
use FeedBundle\Criteria\FeedCriteria;

interface AddOrderInterface
{
    static public function addOrder(QueryBuilder $builder, FeedCriteria $criteria);
}