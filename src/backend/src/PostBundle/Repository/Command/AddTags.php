<?php
namespace PostBundle\Repository\Command;

use Doctrine\ORM\QueryBuilder;
use FeedBundle\Criteria\FeedCriteria;

class AddTags implements AddOrderInterface
{
    static public function addOrder(QueryBuilder $builder, FeedCriteria $criteria)
    {
        if($tags = $criteria->getTags()){

            $builder->leftJoin('p.tags', 'tags');


            $tags = array_filter($tags, function($elem){
                return is_int($elem);
            });


            $builder->andWhere('tags.id IN (:tagIds)')
                ->setParameter('tagIds', $tags)
            ;
        }

    }

}