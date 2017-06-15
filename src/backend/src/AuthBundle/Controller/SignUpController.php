<?php

namespace AuthBundle\Controller;

use AppBundle\Exception\BadRestRequestHttpException;
use AppBundle\Http\ErrorJsonResponse;
use AccountBundle\Entity\Account;
use AuthBundle\Form\SignUpType;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use FOS\UserBundle\Model\UserManager;
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
     *  output = {"class" = "AuthBundle\Http\TokenResponse"},
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
        } catch (BadRestRequestHttpException $e) {
            return new ErrorJsonResponse($e->getMessage(), $e->getErrors(), $e->getStatusCode());
        }

        /** @var UserManager $userManager */
        $userManager = $this->get('fos_user.user_manager');

        /** @var Account $account */
        $account = $userManager->createUser();
        $account
            ->setEnabled(true)
            ->setPlainPassword($body['password'])
            ->setUsername($body['email'])
            ->setEmail($body['email'])
            ->setRoles([Account::ROLE_CREATED]);

        try {
            $userManager->updateUser($account);
        } catch (UniqueConstraintViolationException $e) {
            return new ErrorJsonResponse("User already exists", [], Response::HTTP_CONFLICT);
        }

        $profileService = $this->get("profile.service");
        $profileService->createProfileFromArray(
            ["name" => $body["name"]],
            $account,
            true
        );
        
        $token = $this->get('lexik_jwt_authentication.jwt_manager')->create($account);

        $event = new AuthenticationSuccessEvent(['token' => $token], $account, new Response());

        $this->get('gesdinet.jwtrefreshtoken.send_token')->attachRefreshToken($event);

        return $this->forward('AuthBundle:RenderToken:render', $event->getData());
    }
}