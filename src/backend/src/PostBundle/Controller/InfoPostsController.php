<?php
namespace PostBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use PostBundle\Response\SuccessPostsResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class InfoPostsController extends Controller
{

    /**
     * @ApiDoc(
     *  section="Post",
     *  description="Получаем информационные посты"
     * )
     *
     * @param Request $request
     */
    public function getAction($type)
    {
        try {

            // проеряем есть ли в контейнере данный аргумент
            $postsId = $this->container->hasParameter('post_info_posts')
                ? $postsId = $this->container->getParameter('post_info_posts')
                : [];

            if(!isset($postsId[$type])) throw new NotFoundHttpException(sprintf('key %s not found', $type));


        } catch(NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        } catch(BadRestRequestHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(),[], $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new JsonResponse($postsId[$type]);
    }


}