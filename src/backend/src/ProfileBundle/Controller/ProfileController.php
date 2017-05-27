<?php
namespace ProfileBundle\Controller;

use AppBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class ProfileController extends Controller
{
    /**
     * @ApiDoc(
     *     section="Profile",
     *     resource=true,
     *     description= "Создаем профиль",
     *     authentication=true,
     *     requirements={
     *          {
     *              "name" = "name",
     *              "dataType" = "string",
     *              "description" = "Имя профиля"
     *          },
     *          {
     *              "name" = "gender",
     *              "dataType" = "integer",
     *              "description" = "выберитье пол 0- нет пола 1- мужской  2-Женский"
     *          },
     *          {
     *              "name" = "birthDate",
     *              "dataType" = "datetime",
     *              "description" = "Дата рождения"
     *          }
     *
     *     }
     * )
     *
     * @param Request $request
     */
    public function createAction(Request $request)
    {
        dump($request);
        dump($this->getAccount());
        dump($this->get('security.token_storage')->getToken());

        return new JsonResponse([
            'success' => true
        ]);
    }
}