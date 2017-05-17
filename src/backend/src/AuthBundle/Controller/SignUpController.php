<?php

namespace AuthBundle\Controller;
use AuthBundle\Entity\Account;
use AuthBundle\Form\SignUpType;
use FOS\UserBundle\Model\UserManager;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
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
     */
    public function indexAction(Request $request)
    {
        try {
            $body = $this->validateRequest($request);
        } catch (BadRequestHttpException $e) {
            return new JsonResponse(['code' => $e->getStatusCode(), "message" => $e->getMessage()], $e->getStatusCode());
        }

        /** @var UserManager $userManager */
        $userManager = $this->get('fos_user.user_manager');
        
        /** @var Account $account */
        $account = $userManager->createUser();
        
        $account
            ->setEnabled(true)
            ->setPlainPassword($body['password'])
            ->setUsername($request['email'])
            ->setEmail($request['email'])
            ->setRoles([Account::ROLE_CREATED]);

        $userManager->updateUser($account);

        $jwtData = [
            'username' => $account->getUsername(),
            'roles' => $account->getRoles(),
            'exp' => time() + $this->getParameter('lexik_jwt_authentication.token_ttl')
        ];
        
        return new JsonResponse([
            'token' => $this->get('lexik_jwt_authentication.encoder')->encode($jwtData)
        ]);
    }

    private function validateRequest(Request $request)
    {
        $body = json_decode($request->getContent(), true);
        $form = $this->createForm(SignUpType::class);
        $form->submit($body);

        if(!$form->isValid())
            throw new BadRequestHttpException("Bad parameters");

        return $form->getData();
    }    
}