<?php
namespace CommentBundle\Service;

class ChainBuilder
{
    private $comments;
    private $chainedComments;


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

    public function buildChain()
    {
        // находим уровень

        while(($level = $this->getLowLevelComment()) > 0){
            // подбираем для этого уровня родительский комментарий а родительскому дочерний

            foreach($this->comments as $idx => $comment){
                if($comment['level'] == $level){


                    $this->chainedComments[] = $comment;
                    unset($this->comments[$idx]);
                }
            }



            foreach($this->chainedComments as $childComment){

                foreach($this->comments as $pdx => $parentComment){


//                    if(isset($childComment['parentComment'])&&
//                        ($childComment['parentComment']['id'] == $parentComment['id'])){
//                        $childComment['parentComment'] = $parentComment;
//                        $this->addChildComment($parentComment, $childComment) ;

//                        return true;
//                    }

                    if($this->chainComments($childComment, $parentComment)){
                        unset($this->comments[$pdx]);
                    };




                }
            }





        }



        // удаляем из массива


        return $this->chainedComments;

    }


    public function chainComments(&$childComment, &$parentComment): bool
    {
        if($childComment['parentComment']['id'] == $parentComment['id']){
            $childComment['parentComment'] = $parentComment;

            $this->addChildComment($parentComment, $childComment) ;
            return true;
        }

        return false;
    }

    public function addChildComment(&$comment, &$childComment){


        if(count($comment['childrenComments'])==0){

            $comment['childrenComments'][] = $childComment;
        }else {



            foreach($comment['childrenComments'] as $idx => $comment){
                if( $comment['id'] == $childComment['id']){
                    $comment['childrenComments'][$idx] = $childComment;
                }
            }

        }


    }
}