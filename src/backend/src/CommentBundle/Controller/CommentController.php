<?php
namespace CommentBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use CommentBundle\Form\CommentFormType;
use CommentBundle\Response\SuccessCommentResponse;
use CommentBundle\Response\SuccessCommentsResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

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

            $comment = $this->get('comment.form.handler.create_comment_data_handler')->handle($data);

            $account = $this->get('auth.service')->getAccount();
            $profile = $this->get('profile.repository')->getCurrentProfileByAccount($account);

            $comment->setProfile($profile);

            $this->get('comment.service.comment_service')->create($comment);

        } catch(BadRestRequestHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessCommentResponse($comment);
    }


    /**
     * @ApiDoc(
     *  section="Comment",
     *  description="Удаляем комментарий комментарии",
     *  authentication=true,
     * )
     *
     * @param Request $request
     */
    public function deleteAction($comment_id)
    {
        try{

            $commentService = $this->get('comment.service.comment_service');

            $comment = $commentService->getCommentRepository()->getById($comment_id);


            $commentService->markAsDeleted($comment);

        } catch(BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch(AccessDeniedHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        } catch(\Exception $e) {
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessCommentResponse($comment);
    }


    /**
     * @ApiDoc(
     *  section="Comment",
     *  description="Получаем коментарии к посту",
     *  authentication=false,
     * )
     *
     * @param Request $request
     */
    public function getByPostAction($post_id)
    {
        try{

            $commentService = $this->get('comment.service.comment_service');

            $comments = $commentService->getCommentRepository()->getCommentsByPost($post_id);

            // получаем лайки профиля для комментариев
            if($account = $this->get('auth.service')->getAccount()){
                $profile = $this->get('profile.service')->getCurrentProfile();
//                $this->get('vote.service.vote_service')->getVotesToComments($comments, $profile);
            }

//            $commentService->clearDuplicateCommentsFromTree($comments);

        } catch(BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch(AccessDeniedHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        } catch(\Exception $e) {
            return new ErrorJsonResponse($e->getMessage());
        }
        return new \CommentBundle\Response\AssocArray\SuccessCommentsResponse($comments);
    }

    /**
     * @ApiDoc(
     *  section="Comment",
     *  description="Получаем коментарии профиля",
     *  authentication=false,
     * )
     *
     * @param Request $request
     */
    public function getByProfileAction($profile_id)
    {
        try{

            $commentService = $this->get('comment.service.comment_service');

            $comments = $commentService->getCommentRepository()->getPostCommentsByProfile($profile_id);

        } catch(BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch(AccessDeniedHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        } catch(\Exception $e) {
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessCommentsResponse($comments);
    }
}