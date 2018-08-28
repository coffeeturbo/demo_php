<?php
namespace SubscribeBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use ProfileBundle\Formatter\ProfileFormatter;
use SubscribeBundle\Entity\Subscribe;
use SubscribeBundle\Formatter\SubscribeFormatter;
use SubscribeBundle\Formatter\SubscribesFormatter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileSubscribeController extends Controller
{

    /**
     * @ApiDoc(
     *  section="Subscribe",
     *  description= "Подписаться на профиль",
     *  authentication=true,
     * )
     *
     * @param int $id
     */
    public function subscribeAction($id)
    {
        try {
            $subscribe = $this->get('subscribe.service.subscribe_service')->profileSubscribe($id);
        }
        catch(ConflictHttpException
        |NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getTrace(), $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new JsonResponse((new SubscribeFormatter($subscribe))->format());
    }


    /**
     * @ApiDoc(
     *  section="Subscribe",
     *  description= "Отписаться от профиля",
     *  authentication=true,
     * )
     *
     * @param int $id
     */
    public function unSubscribeAction($id)
    {
        try {
            $this->get('subscribe.service.subscribe_service')->profileUnSubscribe($id);
        }
        catch(ConflictHttpException
        | NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getTrace(), $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new JsonResponse(['success'=> true]);
    }


    /**
     * @ApiDoc(
     *  section="Subscribe",
     *  description= "Получить подписки текущего профиля",
     *  authentication=true,
     * )
     *
     */
    public function listSubscribesAction()
    {
        try {
            $subscribes = $this->get('subscribe.service.subscribe_service')->listSubscribes();


            $profiles = array_map(function(Subscribe $subscribe){
                return (new ProfileFormatter($subscribe->getProfile()))->format();
            },$subscribes);

        }
        catch(ConflictHttpException
        | NotFoundHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getTrace(), $e->getStatusCode());
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new JsonResponse($profiles);
    }
}