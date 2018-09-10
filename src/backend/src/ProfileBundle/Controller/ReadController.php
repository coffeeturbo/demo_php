<?php

namespace ProfileBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ReadController extends Controller
{
    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Получить профиль по id",
     *  output = {"class" = "ProfileBundle\Response\SuccessProfileResponse"},
     *  statusCodes = {
     *      200 = "Успешное получение профиля",
     *      404 = "Профиль не найден"
     *  }
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getByIdAction(int $id)
    {
        try {

            $profile = $this->get('profile.service')->getById($id);

            // получаем количество постов у даного профиля
            $this->get('post.service')->getPostRepository()->getProfileTotalPosts($profile);

            // получаем количество комментариев
            $this->get('comment.repository')->getProfileCommentsTotal($profile);


            // проверяем подписаны ли на профайл ищем подписку профиля на профиль
            $this->get('subscribe.service.subscribe_service')->checkSubscribed($profile);

        } catch (HttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessProfileResponse($profile);
    }

    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Получить профиль по alias",
     *  output = {"class" = "ProfileBundle\Response\SuccessProfileResponse"},
     *  statusCodes = {
     *      200 = "Успешное получение профиля",
     *      404 = "Профиль не найден"
     *  }
     * )
     *
     * @param string $alias
     * @return JsonResponse
     */
    public function getByAliasAction(string $alias)
    {
        try {
            $profile = $this->get('profile.service')->getByAlias($alias);
            $this->get('subscribe.service.subscribe_service')->checkSubscribed($profile);
        } catch (HttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessProfileResponse($profile);
    }
}
