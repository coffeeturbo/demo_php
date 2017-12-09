<?php
namespace CommentBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class CommentController extends Controller
{

    /**
     * @ApiDoc(
     *  section="Comment",
     *  description="Создаём комментарии",
     *  authentication=true,
     *  input= { "class"="CommentBundle\Form\CommentFormType", "name"=""}
     * )
     *
     * @param Request $request
     */
    public function createAction(Request $request)
    {

//        $request->get();

        $commentService = $this->get('comment.service');


    }
}