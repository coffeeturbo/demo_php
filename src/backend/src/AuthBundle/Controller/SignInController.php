<?php

namespace AuthBundle\Controller;

use AppBundle\Http\ErrorResponse;
use AuthBundle\Entity\Account;
use AuthBundle\Form\SignInType;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class SignInController extends Controller
{
    /**
     * Авторизация аккаунта
     *
     * @ApiDoc(
     *  section = "Auth",
     *  input = {"class" = "AuthBundle\Form\SignInType", "name"  = ""},
     *  output = {"class" = "AuthBundle\Http\TokenResponse"},
     *  statusCodes = {
     *      200 = "Успешная авторизация",
     *      400 = "Неправильный запрос",
     *      401 = {
     *          "Неверный логин или пароль",
     *          "Пользователь не найден"
     *      }
     *  },
     *  headers = {
     *      {
     *          "name" = "Accept",
     *          "default" = "application/json",
     *          "description" = "Если не указан будет сгенерировано всплывающее окно"
     *      }
     *  }
     * )
     * @param Request $request
     * @return Response
     */
    public function signInAction(Request $request)
    {
        try {
            $body = $this->get('app.validate_request')->validate($request, SignInType::class);
            $account = $this->validateCredentials($body["username"], $body["password"]);
        } catch (BadRequestHttpException | UnauthorizedHttpException $e) {
            return new ErrorResponse($e->getMessage(), $e->getStatusCode());
        }

        $token = $this->get('lexik_jwt_authentication.jwt_manager')->create($account);

        $event = new AuthenticationSuccessEvent(['token' => $token], $account, new Response());

        if ($body["dont_remember"] !== true) {
            $this->get('gesdinet.jwtrefreshtoken.send_token')->attachRefreshToken($event);
        }

        return $this->forward('AuthBundle:RenderToken:render', $event->getData());
    }

    private function validateCredentials($username, $password): Account
    {
        /** @var Account $account */
        $account = $this->getDoctrine()
            ->getRepository('AuthBundle:Account')
            ->findOneBy(['username' => $username]);

        if (!$account instanceof Account)
            throw new UnauthorizedHttpException(null, "User not found");

        if (!$this->get('security.password_encoder')->isPasswordValid($account, $password))
            throw new UnauthorizedHttpException(null, "Wrong password");

        return $account;
    }
}