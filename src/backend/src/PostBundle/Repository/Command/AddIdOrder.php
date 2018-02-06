<?php
namespace PostBundle\Repository\Command;

use Doctrine\ORM\QueryBuilder;
use FeedBundle\Criteria\FeedCriteria;

class AddIdOrder implements AddOrderInterface
{
    static public function addOrder(QueryBuilder $builder, FeedCriteria $criteria)
    {
        $builder->orderBy('p.id', $criteria->getDirection());

        if($cursor = $criteria->getCursor()){
            // desc
            switch(strtolower($criteria->getDirection())){
                case 'desc':
                    $builder->andWhere('p.id < :cursor');
                    break;
                case 'asc':
                    $builder->andWhere('p.id > :cursor');
                    break;

                default:
                    $builder->andWhere('p.id < :cursor');

            }
            $builder->setParameter('cursor', $cursor);
        }
    }

}