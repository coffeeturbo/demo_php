<?php

namespace AuthBundle\Controller;

use AppBundle\Http\ErrorResponse;
use AuthBundle\Entity\Account;
use AuthBundle\Form\SignUpType;
use AuthBundle\Response\SuccessAuthResponse;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use FOS\UserBundle\Model\UserManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
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
     *  }
     * )
     *
     * @param Request $request
     * @return Response
     */
    public function signUpAction(Request $request)
    {
        try {
            $body = $this->get('app.validate_request.service')->validate($request, SignUpType::class);
        } catch (BadRequestHttpException $e) {
            return new ErrorResponse($e->getMessage(), $e->getStatusCode());
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
            return new ErrorResponse("User already exists", Response::HTTP_CONFLICT);
        }

        $jwtData = [
            'username' => $account->getUsername(),
            'roles' => $account->getRoles(),
            'exp' => time() + $this->getParameter('lexik_jwt_authentication.token_ttl')
        ];

        return new SuccessAuthResponse(
            $this->get('lexik_jwt_authentication.encoder')->encode($jwtData)
        );
    }
}