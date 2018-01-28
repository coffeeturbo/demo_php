<?php
namespace CommentBundle\Service;

class ChainBuilder
{
    private $comments;


    public function __construct(array $comments = null)
    {
        $this->comments = $comments;
    }

    public function getLowLevelComment(): int
    {
        $level = 0;
        foreach($this->comments as $comment){
            $level = $level < $comment['level'] ? $comment['level'] : $level;
        }

        return $level;
    }

    public function getChainsTotal(): int
    {
        $chainCounter = 0;
        foreach($this->comments as $comment){
            if($comment['level'] == 0) $chainCounter++;
        }

        return $chainCounter;
    }

    public function buildChain()
    {

        // находим уровень
        while( count($this->comments) > $this->getChainsTotal()){
            $level = $this->getLowLevelComment();
            // подбираем для этого уровня родительский комментарий а родительскому дочерний


            foreach($this->comments as $idx => &$comment){
                if($comment['level'] == $level){

                    if($this->addToAChain($comment)) {
                        unset($this->comments[$idx]);
                    }
//                    print_r($comment);
//                    die;
                }
            }

//            print_r($this->comments);
//            die;

        }



        // удаляем из массива

//        print_r($this->comments);


        return $this->comments;

    }


    public function addToAChain( &$comment): bool
    {
        $isAdded = false;

        $parentComment = $this->findParentComment($comment);

        if($parentComment){
            $this->attachComments($parentComment, $comment);

            print_r($this->comments);
            die;
            $isAdded = true;
        }

        return $isAdded;
    }


    public function findParentComment(&$comment){
        foreach($this->comments as $idx => &$parentComment){

            if((isset($comment['parentComment']))&&($parentComment['id'] == $comment['parentComment']['id'])){
                return $parentComment;
            }
        }
        return null;
    }

    public function attachComments(&$parentComment, &$childrenComment){
        $childrenComment['parentComment'] = $parentComment;

        $this->attachChildrenComment($parentComment, $childrenComment);

    }


    public function attachChildrenComment(&$parentComment, &$childrenComment){

        if(count($parentComment['childrenComments']) == 0){
            $parentComment['childrenComments'][] = $childrenComment;
        } else {

            if(count($parentComment['childrenComments'])>0){
                foreach($parentComment['childrenComments'] as $idx => &$comment){
                    if($comment['id'] == $childrenComment['id']){

                        unset($parentComment['childrenComments'][$idx]);

                        $parentComment['childrenComments'][] = $childrenComment;

                        $parentComment['childrenComments'] = array_values($parentComment['childrenComments']);
                        break;
//                        print_r( $parentComment['childrenComments']);
//                        die;
                    }
                }


            }

//            print_r($parentComment);
//            die;
        }
//        print_r($parentComment);
//        die;
    }

}