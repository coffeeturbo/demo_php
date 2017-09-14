<?php
namespace PostBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use Doctrine\ORM\NoResultException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use PostBundle\Entity\Post;
use PostBundle\Form\PostFormType;
use PostBundle\Response\SuccessPostResponce;
use PostBundle\Response\SuccessPostsResponse;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PostController extends Controller
{

    /**
     * @ApiDoc(
     *  section="Post",
     *  description="Создаём пост",
     *  authentification="true",
     *  input= { "class"="PostBundle\Form\PostFormType", "name"=""}
     * )
     *
     * @param Request $request
     */
    public function createAction(Request $request)
    {
        try {
            $data = $this->get('app.validate_request')->getData($request, PostFormType::class);

            $postService = $this->get('post.service');

            $post = $postService->createFromData($data);

            $account = $this->get('auth.service')->getAccount();

            $profile = $this->get('profile.repository')->getCurrentProfileByAccount($account);

            $post->setProfile($profile);

            $postService->create($post);

        } catch(BadRequestHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessPostResponce($post);
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
                ->getPostWithTagsAndAttachmentsById($id);
        }
//        catch(NoResultException $e){
//            return new ErrorJsonResponse($e->getMessage(), [], 404);
//        }
        catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessPostResponce($post);
    }

    /**
     * @ApiDoc(
     *  section="Post",
     *  description="Получаем посты",
     * )
     *
     * @param Request $request
     */
    public function feedAction(int $limit, int $offset)
    {
        // todo добавить максимальный limit для ленты и вынести в файл конфигурации

//        $posts = $this->get('post.repository')
//            ->findBy([],
//            [],$limit, $offset);
        $posts = $this->get('post.repository')
            ->getPostsWithTagsAndAttachments($limit, $offset);

        return new SuccessPostsResponse($posts);
    }

    /**
     * @ApiDoc(
     *  section="Post",
     *  description="Получаем количество постов",
     * )
     *
     * @param Request $request
     */
    public function feedTotalAction()
    {
        $total = $this->get('post.repository')->getPostsTotal();

        return new JsonResponse([
            'total' => $total
        ]);
    }



    public function updateAction()
    {

    }

    public function getAction()
    {

    }

    public function deleteAction()
    {

    }
}