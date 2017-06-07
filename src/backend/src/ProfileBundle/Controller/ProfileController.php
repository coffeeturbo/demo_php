<?php
namespace ProfileBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use ProfileBundle\Entity\Profile;
use ProfileBundle\Exception\ProfileNotFoundException;
use ProfileBundle\Exception\ProfilesLimitException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileController extends Controller
{
    /**
     * @ApiDoc(
     *     section="Profile",
     *     description= "Создаем профиль",
     *     authentication=true,
     *     requirements={
     *          {
     *              "name" = "first_name",
     *              "dataType" = "string",
     *              "description" = "Имя"
     *          },
     *          {
     *              "name" = "last_name",
     *              "dataType" = "string",
     *              "description" = "Фамилия"
     *          },
     *          {
     *              "name" = "patronymic",
     *              "dataType" = "string",
     *              "description" = "Отчество"
     *          },
     *          {
     *              "name" = "alias",
     *              "dataType" = "string",
     *              "description" = "alias"
     *          },
     *          {
     *              "name" = "nickname",
     *              "dataType" = "string",
     *              "description" = "alias"
     *          },
     *          {
     *              "name" = "gender",
     *              "dataType" = "integer",
     *              "description" = "выберитье пол none- нет пола male- мужской  female-Женский"
     *          },
     *          {
     *              "name" = "birth_date",
     *              "dataType" = "datetime",
     *              "description" = "27-05-2017"
     *          }
     *
     *     }
     * )
     *
     * @param Request $request
     */
    public function createAction(Request $request)
    {
        try {
            $profileService = $this->get('profile.service');

            $json_request = json_decode($request->getContent(), true);
            $profile = $profileService->createProfileFromArray($json_request, $this->getUser(), true);

            return new JsonResponse([
                'entity' => $profile->jsonSerialize()
            ]);
        } catch(ProfilesLimitException $exception) {
            return new ErrorJsonResponse($exception, Response::HTTP_FORBIDDEN);
        } catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }


    }

    /**
     * @ApiDoc(
     *     section="Profile",
     *     description= "Получаем профиль по id",
     *     requirements={
     *          {
     *              "name" = "id",
     *              "dataType" = "integer",
     *              "description" = "id профиля"
     *          }
     *     }
     * )
     *
     * @param Profile $profile
     * @return JsonResponse
     */
    public function getProfileByIdAction(int $id)
    {
        try {
            $profile = $this->get('profile.repository')->getProfileById($id);

            return new JsonResponse([
                'entity' => $profile->jsonSerialize()
            ]);

        } catch(ProfileNotFoundException $e){
            return new ErrorJsonResponse($e->getMessage(), [], 404);
        }
    }

    /**
     * @ApiDoc(
     *     section="Profile",
     *     description= "Получаем профиль по alias",
     *     requirements={
     *          {
     *              "name" = "alias",
     *              "dataType" = "string",
     *              "description" = "alias профиля"
     *          }
     *     }
     * )
     *
     * @param Profile $profile
     * @return JsonResponse
     */
    public function getProfileByAliasAction(string $alias)
    {
        try {
            $profile = $this->get('profile.repository')->getProfileByAlias($alias);

            return new JsonResponse([
                'entity' => $profile->jsonSerialize()
            ]);

        } catch(ProfileNotFoundException $e){
            return new ErrorJsonResponse($e->getMessage(), [], 404);
        }
    }

    /**
     * @ApiDoc(
     *     section="Profile",
     *     description= "Редактировать профиль",
     *     authentication=true,
     *     requirements={
     *
     *          {
     *              "name" = "first_name",
     *              "dataType" = "string",
     *              "description" = "Имя профиля"
     *          },
     *          {
     *              "name" = "last_name",
     *              "dataType" = "string",
     *              "description" = "Имя профиля"
     *          },
     *          {
     *              "name" = "patronymic",
     *              "dataType" = "string",
     *              "description" = "Имя профиля"
     *          },
     *          {
     *              "name" = "alias",
     *              "dataType" = "string",
     *              "description" = "Имя профиля"
     *          },
     *          {
     *              "name" = "nickname",
     *              "dataType" = "string",
     *              "description" = "Имя профиля"
     *          },
     *          {
     *              "name" = "gender",
     *              "dataType" = "string",
     *              "description" = "выберитье пол none- нет пола male- мужской  female-Женский"
     *          },
     *          {
     *              "name" = "birthDate",
     *              "dataType" = "datetime",
     *              "description" = "27-05-2017"
     *          }
     *     }
     * )
     *
     * @param Profile $profile
     * @return JsonResponse
     */
    public function updateAction(int $id, Request $request)
    {
        try {
            $profileService = $this->get('profile.service');

            $profile = $profileService->getProfileById($id);

            $json_request = json_decode($request->getContent(), true);

            $profileService->updateProfileFromArray($profile, $this->getUser(), true, $json_request);

            return new JsonResponse([
                'entity' => $profile->jsonSerialize()
            ]);
        } catch(AccessDeniedException $e){
            return new ErrorJsonResponse($e->getMessage(), [], 403);
        }
    }

    /**
     * @ApiDoc(
     *     section="Profile",
     *     description= "Получаем профиль по id",
     *     authentication=true,
     *     requirements={
     *          {
     *              "name" = "id",
     *          }
     *     }
     * )
     *
     * @param Profile $profile
     * @return JsonResponse
     */
    public function deleteAction($id)
    {
        try {
            $profileService = $this->get('profile.service');

            $profile = $profileService->getProfileById($id);

            $profileService->deleteProfile($profile);

        } catch(NotFoundHttpException $e){

            return new JsonResponse([
                'error' => $e->getMessage()
            ], 404);
        }

        return new JsonResponse([
            'success' => $profile->jsonSerialize()
        ]);
    }
}