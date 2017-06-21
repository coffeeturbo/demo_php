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
        } catch (HttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessProfileResponse($profile);
    }

    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Получить профиль по alias",
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
        } catch (HttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessProfileResponse($profile);
    }
}
