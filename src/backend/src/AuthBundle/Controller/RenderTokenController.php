<?php

namespace AuthBundle\Controller;

use AuthBundle\Response\SuccessAuthResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class RenderTokenController extends Controller
{
    /**
     * Вывод сгенерированного токена в json формате или всплывающем окне (если запрос не rest)
     *
     * @ApiDoc(
     *  section = "Auth",
     *  output = {"class" = "AuthBundle\Http\TokenResponse"},
     *  headers = {
     *      {
     *          "name" = "Accept",
     *          "default" = "application/json",
     *          "description" = "Если не указан будет сгенерировано всплывающее окно"
     *      }
     *  }
     * )
     * @param string $token
     * @param string $refresh_token
     * @param Request $request
     * @return Response
     */
    public function renderAction(string $token, string $refresh_token = null, Request $request)
    {
        return new SuccessAuthResponse($token, $refresh_token);
        return in_array("application/json", $request->getAcceptableContentTypes()) ?
            new SuccessAuthResponse($token, $refresh_token) :
            $this->render('sign-in/tokenPopupWindow.twig', ["response" => ['token' => $token, 'refresh_token' => $refresh_token]]);
    }
}