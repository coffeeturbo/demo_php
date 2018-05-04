<?php
namespace AuthBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class SendMailController extends Controller
{

    /**
     * Меняет пароль аккаунта
     *
     * @ApiDoc(
     *  section = "Auth",
     *  description= "Сменить пароль",
     *  authentication=true,
     *  output = {"class" = "AuthBundle\Response\SuccessAuthResponse"},
     *  statusCodes = {
     *      200 = "Успешная смена пароля",
     *      401 = "неавторизован",
     *      403 = "неправильный пароль",
     *  }
     * )
     * @param Request $request
     * @return Response
     */
    public function sendMailAction(Request $request)
    {
        try {

            $code = rand(1000,9999);





            $r = mail("coffeeturbo@mail.ru", "My Subject", "Line 1\nLine 2\nLine 3");


            dump($r);

        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage());
        }

        return new JsonResponse([
            'mail_send' => true
        ]);

    }
}