<?php

namespace ProfileBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use ProfileBundle\Form\ProfileType;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateController extends Controller
{
    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Редактировать профиль",
     *  authentication=true,
     *  input = {"class" = "ProfileBundle\Form\ProfileType", "name"  = ""},
     *  output = {"class" = "ProfileBundle\Response\SuccessProfileResponse"},
     *  statusCodes = {
     *      200 = "Успешное изменение профиля",
     *      400 = "Неправильный запрос",
     *      401 = "Не авторизован",
     *      403 = "Доступ для текущего аккаунта запрещен",
     *      404 = "Профиль не найден"
     *  }
     * )
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function updateAction(int $id, Request $request)
    {
        try {
            $profileService = $this->get('profile.service');
            $profile = $profileService->getById($id);
            $this->get('app.validate_request')->validate($request, ProfileType::class, $profile);
            $profileService->update($profile);
        } catch (BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch (AccessDeniedHttpException | NotFoundHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessProfileResponse($profile);
    }
}