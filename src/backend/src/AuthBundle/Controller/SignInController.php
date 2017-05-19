<?php
namespace AuthBundle\Controller;

use AppBundle\Http\ErrorResponse;
use AuthBundle\Entity\Account;
use AuthBundle\Form\SignInType;
use AuthBundle\Http\TokenResponse;
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
     *  }
     * )
     * @param Request $request
     * @return Response
     */
    public function indexAction(Request $request)
    {
        try {
            $body = $this->validateRequest($request);
            $account = $this->validateCredentials($body["username"], $body["password"]);
        } catch(BadRequestHttpException | UnauthorizedHttpException $e) {
            return new ErrorResponse($e->getMessage(), $e->getStatusCode());
        }

        $ttl = $body["dont_remember"] === true ?
            300 : /* 5 min */
            $this->getParameter('lexik_jwt_authentication.token_ttl');
        
        $token = $this->get('lexik_jwt_authentication.encoder')->encode([
            'username' => $body["username"],
            'roles' => $account->getRoles(),
            'exp' => $ttl+time() 
        ]);
        
        return $this->renderTokenAction($token, $request);
    }

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
     * @param Request $request
     * @return Response
     */
    public function renderTokenAction(string $token, Request $request)
    {
        return in_array("application/json", $request->getAcceptableContentTypes()) ?
            new TokenResponse($token) :
            $this->render('sign-in/tokenPopupWindow.twig', ["response" => ['token' => $token]]);
    }

    private function validateRequest(Request $request)
    {
        $body = json_decode($request->getContent(), true);
        $form = $this->createForm(SignInType::class);
        $form->submit($body);

        if(!$form->isValid()) 
            throw new BadRequestHttpException("Bad parameters");
        
        return $form->getData(); 
    }

    private function validateCredentials($username, $password) : Account
    {
        /** @var Account $account */
        $account = $this->getDoctrine()
            ->getRepository('AuthBundle:Account')
            ->findOneBy(['username' => $username]);
        
        if (!$account instanceof Account)
            throw new UnauthorizedHttpException(null,"User not found");

        if (!$this->get('security.password_encoder')->isPasswordValid($account, $password))
            throw new UnauthorizedHttpException(null, "Wrong password");
        
        return $account;
    }
}