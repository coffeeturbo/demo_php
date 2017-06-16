<?php

namespace AuthBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use AuthBundle\Form\SignUpType;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class SignUpController extends Controller
{
    /**
     * Регистрация аккаунта
     *
     * @ApiDoc(
     *  section = "Auth",
     *  input = {"class" = "AuthBundle\Form\SignUpType", "name"  = ""},
      *  output = {"class" = "AuthBundle\Response\SuccessAuthResponse"},
     *  statusCodes = {
     *      200 = "Успешная авторизация",
     *      400 = "Неправильный запрос",
     *  },
     *  headers = {
     *      {
     *          "name" = "Accept",
     *          "default" = "application/json",
     *          "description" = "Если не указан будет сгенерировано всплывающее окно"
     *      }
     *  }
     * )
     *
     * @param Request $request
     * @return Response
     */
    public function signUpAction(Request $request)
    {
        try {
            $body = $this->get('app.validate_request')->validate($request, SignUpType::class);
            $account = $this->get('account.service')->createFromArray($body);
        } catch (BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        } catch (UniqueConstraintViolationException $e) {
            return new ErrorJsonResponse("User already exists", [], Response::HTTP_CONFLICT);
        }

        $this->get("profile.service")
            ->createFromArray($body, $account, true);
        
        $token = $this->get('lexik_jwt_authentication.jwt_manager')
            ->create($account);

        $event = new AuthenticationSuccessEvent(['token' => $token], $account, new Response());

        $this->get('gesdinet.jwtrefreshtoken.send_token')
            ->attachRefreshToken($event);

        return $this->forward('AuthBundle:RenderToken:render', $event->getData());
    }
}