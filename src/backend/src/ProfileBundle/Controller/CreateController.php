<?php

namespace ProfileBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Form\ProfileType;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CreateController extends Controller
{
    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Создаем профиль",
     *  authentication=true,
     *  input = {"class" = "ProfileBundle\Form\ProfileType", "name"  = ""},
     *  output = {"class" = "ProfileBundle\Response\SuccessProfileResponse"},
     *  statusCodes = {
     *      201 = "Успешное создание профиля",
     *      400 = "Неправильный запрос",
     *      401 = "Не авторизован",
     *      403 = "На текущем аккаунте превышено количество профилей",
     *      404 = "Профиль не найден"
     *  }
     *  
     * )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createAction(Request $request)
    {
        try {
            $profile = new Profile();
            $account = $this->get('auth.service')->getAccount();
            $profile->setAccount($account);
            $this->get('app.validate_request')->validate($request, ProfileType::class, $profile);
            $this->get('profile.service')->create($profile);
        } catch (BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch (AccessDeniedHttpException | NotFoundHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessProfileResponse($profile, true);
    }
}