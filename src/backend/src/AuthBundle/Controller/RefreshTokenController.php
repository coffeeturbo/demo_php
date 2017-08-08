<?php

namespace AuthBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use AuthBundle\Form\RefreshTokenType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class RefreshTokenController extends Controller
{
    /**
     * Обновляет токены
     *
     * @ApiDoc(
     *  section = "Auth",
     *  input = {"class" = "AuthBundle\Form\RefreshTokenType", "name"  = ""},
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
    public function refreshAction(Request $request)
    {
        try {
            $request->headers->add(["Content-Type" => "application/json"]);
            $this->get('app.validate_request')->getData($request, RefreshTokenType::class);
        } catch (BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        }

        return $this->forward('gesdinet.jwtrefreshtoken:refresh');
    }
}