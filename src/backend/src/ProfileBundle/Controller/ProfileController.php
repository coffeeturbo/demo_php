<?php

namespace ProfileBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use ProfileBundle\Form\AvatarUploadType;
use ProfileBundle\Form\ProfileCreateType;
use ProfileBundle\Form\ProfileUpdateType;
use ProfileBundle\Response\SuccessProfileResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileController extends Controller
{
    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Создаем профиль",
     *  authentication=true,
     *  input = {"class" = "ProfileBundle\Form\ProfileType", "name"  = ""},
     *  output = {"class" = "ProfileBundle\Response\SuccessProfileResponse"},
     * )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createAction(Request $request)
    {
        try {
            $body = $this->get('app.validate_request')->validate($request, ProfileCreateType::class);
            $profile = $this->get('profile.service')->createFromArray($body, $this->getUser(), true);
        } catch (BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch (AccessDeniedHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessProfileResponse($profile);
    }

    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Получаем профиль по id",
     *  requirements={
     *      {
     *          "name" = "id",
     *          "dataType" = "integer",
     *          "description" = "id профиля"
     *      }
     *  }
     * )
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getProfileByIdAction(int $id)
    {
        try {
            $profile = $this->get('profile.service')->getById($id);
        } catch (NotFoundHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessProfileResponse($profile);
    }

    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Получаем профиль по alias",
     *  requirements={
     *      {
     *          "name" = "alias",
     *          "dataType" = "string",
     *          "description" = "alias профиля"
     *      }
     *  }
     * )
     *
     * @param string $alias
     * @return JsonResponse
     */
    public function getProfileByAliasAction(string $alias)
    {
        try {
            $profile = $this->get('profile.service')->getByAlias($alias);
        } catch (NotFoundHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessProfileResponse($profile);
    }

    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Редактировать профиль",
     *  authentication=true,
     *  input = {"class" = "ProfileBundle\Form\ProfileType", "name"  = ""},
     *  output = {"class" = "ProfileBundle\Response\SuccessProfileResponse"},
     * )
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function updateAction(int $id, Request $request)
    {
        try {
            $body = $this->get('app.validate_request')->validate($request, ProfileUpdateType::class);
            $profileService = $this->get('profile.service');

            $profile = $profileService->update($id, $body);

        } catch (BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch (AccessDeniedHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        return new SuccessProfileResponse($profile);
    }

    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Загрузить аватар к профилю",
     *  authentication=true,
     *  input = {"class" = "ProfileBundle\Form\AvatarUploadType", "name"  = ""},
     * )
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function avatarUploadAction(int $id, Request $request)
    {
        $body = $this->get('app.validate_request')->validate($request, AvatarUploadType::class);
        dump($id);
        dump($body);
        return new JsonResponse(['success' => true]);
    }

    /**
     * @ApiDoc(
     *  section="Profile",
     *  description= "Получаем профиль по id",
     *  authentication=true,
     * )
     *
     * @param $id
     * @return JsonResponse
     */
    public function deleteAction($id)
    {
        try {
            $profileService = $this->get('profile.service');

            $profile = $profileService->getById($id);

            $profileService->deleteProfile($profile);

        } catch (NotFoundHttpException $e) {

            return new JsonResponse([
                'error' => $e->getMessage()
            ], 404);
        }

        return new JsonResponse([
            'success' => $profile->jsonSerialize()
        ]);
    }
}