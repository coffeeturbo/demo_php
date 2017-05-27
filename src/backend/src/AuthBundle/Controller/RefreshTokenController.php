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
            $request->headers->add(["Content-Type"=>"application/json"]);
            $this->get('app.validate_request')->validate($request, RefreshTokenType::class);
        } catch (BadRequestHttpException $e) {
            return new ErrorResponse($e->getMessage(), $e->getStatusCode());
        }

        return $this->forward('gesdinet.jwtrefreshtoken:refresh');
    }
}