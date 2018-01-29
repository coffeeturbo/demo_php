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

        while(count($this->comments) > $this->getChainsTotal()){
            foreach($this->comments as $idx => &$comment) {
                if($comment['level'] == $this->getLowLevelComment()){

                    if($this->addToChain($comment))
                        unset($this->comments[$idx]);
                }
            }


        }

        return $this->comments;
    }

    public function addToChain($childComment)
    {
        // находим родительский комментарий
        foreach($this->comments as &$comment) {
            if(isset($childComment['parentComment'])
                && $childComment['parentComment']['id'] == $comment['id']){


                if(count($comment['childrenComments']) !== 0){
                    foreach($comment['childrenComments'] as $idx => $childCom){
                        $comment['childrenComments'][$idx] = $childComment;
                    }
                }else {
                    $comment['childrenComments'][] = $childComment;
                }

                return true;
            }
        }
        // добавляем

        return false;
    }




}