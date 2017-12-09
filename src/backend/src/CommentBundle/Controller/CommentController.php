<?php
namespace CommentBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use CommentBundle\Entity\Comment;
use CommentBundle\Form\CommentFormType;
use CommentBundle\Response\SuccessCommentResponse;
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

        try{
            $data = $this->get('app.validate_request')->getData($request, CommentFormType::class);

            $comment = new Comment();

            $comment->setPostId($data['post_id'])->setParentId($data['parent_id']);

            $account = $this->get('auth.service')->getAccount();
            $profile = $this->get('profile.repository')->getCurrentProfileByAccount($account);

            $comment->setProfile($profile);

            $commentService = $this->get('comment.service.comment_service');

            $commentService->create($comment);
        }catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }




        return new SuccessCommentResponse($comment);


    }
}