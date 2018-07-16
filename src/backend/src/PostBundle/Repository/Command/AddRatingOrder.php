<?php
namespace PostBundle\Repository\Command;

use Doctrine\ORM\QueryBuilder;
use FeedBundle\Criteria\FeedCriteria;

class AddRatingOrder implements AddOrderInterface
{
    static public function addOrder(QueryBuilder $builder, FeedCriteria $criteria)
    {

        $builder->orderBy('p.votesRating', $criteria->getDirection());
        $builder->addOrderBy('p.created', $criteria->getDirection());
        if($postId = $criteria->getCursor()){

            // desc
            switch(strtolower($criteria->getDirection())){
                case 'desc':
                    $builder->andWhere('p.id < :pid');
                    break;
                case 'asc':
                    $builder->andWhere('p.id > :pid');
                    break;

                default: {
                    $builder->andWhere('p.id < :pid');
                }

            }
            $builder
                ->setParameter('pid', $postId);
        }
    }

}