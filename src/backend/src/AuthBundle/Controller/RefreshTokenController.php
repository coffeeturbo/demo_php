<?php
namespace AuthBundle\Controller;

use AppBundle\Http\ErrorResponse;
use AuthBundle\Form\RefreshTokenType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class RefreshTokenController extends Controller
{
    /**
     * Обновляет токены
     *
     * @ApiDoc(
     *  section = "Auth",
     *  input = {"class" = "AuthBundle\Form\RefreshTokenType", "name"  = ""},
     *  output = {"class" = "AuthBundle\Http\TokenResponse"},
     *  headers = {
     *      {
     *          "name" = "Content-Type",
     *          "default" = "application/json",
     *          "required" = true,
     *          "description" = "Необходим для отправки данных в RAW"
     *      }
     *  },
     *  statusCodes = {
     *      200 = "Успешная авторизация",
     *      400 = "Неверный токен",
     *      400 = "Неправильный запрос"
     *  }
     * )
     * @param Request $request
     * @return Response
     */
    public function refreshAction(Request $request)
    {
        try {
            $this->get('app.validate_request.service')->validate($request, RefreshTokenType::class);
        } catch(BadRequestHttpException $e) {
            return new ErrorResponse($e->getMessage(), $e->getStatusCode());
        }
        
        return $this->forward('gesdinet.jwtrefreshtoken:refresh');
    }
}