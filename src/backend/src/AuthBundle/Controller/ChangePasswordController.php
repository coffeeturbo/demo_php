<?php
namespace AuthBundle\Controller;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ChangePasswordController extends Controller
{

    /**
     * Меняет пароль аккаунта
     *
     * @ApiDoc(
     *  section = "Auth",
     *  description= "позитивная оценка Комментария",
     *  authentication=true,
     *  input = {"class" = "AuthBundle\Form\ChangePasswordType", "name"  = ""},
     *  output = {"class" = "AuthBundle\Response\SuccessAuthResponse"},
     *  statusCodes = {
     *      200 = "Успешная авторизация",
     *      400 = "Неверный токен",
     *      400 = "Неправильный запрос"
     *  }
     * )
     * @param Request $request
     * @return Response
     */
    public function changePasswordAction(Request $request)
    {
        try {

        } catch(\Exception $e){

        }

    }
}