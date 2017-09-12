<?php
namespace PostBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use PostBundle\Entity\Post;
use PostBundle\Form\PostFormType;
use PostBundle\Response\SuccessPostResponce;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

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

            $post = $this->get('post.service')->createFromData($data);

        } catch(BadRequestHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new SuccessPostResponce($post);
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