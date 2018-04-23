<?php
namespace PostBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use Doctrine\ORM\NoResultException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use PostBundle\Form\PostFormType;
use PostBundle\Response\SuccessPostResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PostController extends Controller
{

    /**
     * @ApiDoc(
     *  section="Post",
     *  description="Создаём пост",
     *  authentication=true,
     *  input= { "class"="PostBundle\Form\PostFormType", "name"=""}
     * )
     *
     * @param Request $request
     */
    public function createAction(Request $request)
    {
        try {
            $data = $this->get('app.validate_request')->getData($request, PostFormType::class);

            $post = $this->get('post.form.handler.create_post_data_handler')->handle($data);

            $account = $this->get('auth.service')->getAccount();

            $profile = $this->get('profile.repository')->getCurrentProfileByAccount($account);

            $post->setProfile($profile);
            $this->get('post.service')->create($post);

        } catch(BadRestRequestHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessPostResponse($post);
    }

    /**
     * @ApiDoc(
     *  section="Post",
     *  description="Получаем пост по id",
     * )
     *
     * @param Request $request
     */
    public function getByIdAction($id)
    {
        try{
            $post = $this->get('post.repository')
                ->getPostWithTagsAndAttachmentsByPostId($id);


            if($account = $this->get('auth.service')->getAccount()){
                $profile = $this->get('profile.service')->getCurrentProfile();
                $this->get('vote.service.vote_service')->getVoteToPost($post, $profile);
            }

        } catch(NoResultException $e){
            return new ErrorJsonResponse($e->getMessage(), [], 404);
        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessPostResponse($post);
    }


    /**
     * @ApiDoc(
     *  section="Post",
     *  description="Обновляем пост",
     *  authentication=true,
     *  input= { "class"="PostBundle\Form\PostFormType", "name"=""}
     * )
     *
     * @param Request $request
     */
    public function updateAction(Request $request)
    {
        try {
            $data = $this->get('app.validate_request')->getData($request, PostFormType::class);

            $post = $this->get('post.form.handler.create_post_data_handler')->handle($data);

            $account = $this->get('auth.service')->getAccount();

            $profile = $this->get('profile.repository')->getCurrentProfileByAccount($account);

            $post->setProfile($profile);

            // todo тут проверка на время редактирование поста и администратора поста
            $this->get('post.service')->update($post);

        } catch(BadRestRequestHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage().$e->getTraceAsString() );
        }

        return new SuccessPostResponse($post);
    }

    public function getAction()
    {

    }

    /**
     * @ApiDoc(
     *  section="Post",
     *  description="Удаляем пост по id",
     * )
     *
     * @param Request $request
     */
    public function deleteAction($id)
    {
        try{

            if(!$this->isGranted('ROLE_ADMIN')){
                throw new AccessDeniedHttpException("У вас нет доступа к данному пути");
            }

            $post = $this->get('post.service')->deletePostById($id);
        }catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessPostResponse($post);
    }
}