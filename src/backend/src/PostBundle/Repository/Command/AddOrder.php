<?php
namespace PostBundle\Repository\Command;

use Doctrine\ORM\QueryBuilder;
use FeedBundle\Criteria\FeedCriteria;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AddOrder implements AddOrderInterface
{
    static public function addOrder(QueryBuilder $builder, FeedCriteria $criteria)
    {
        switch(strtolower($criteria->getOrder())){
            case  'id':
                AddIdOrder::addOrder($builder, $criteria);
                break;
            case 'votesrating':
                AddRatingOrder::addOrder($builder, $criteria);
                break;
            default: throw new NotFoundHttpException(sprintf('unknown order %s', $criteria->getOrder()));
        }
    }

}