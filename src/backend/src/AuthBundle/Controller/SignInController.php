<?php
namespace AuthBundle\Controller;

use AuthBundle\Entity\Account;
use AuthBundle\Entity\SignIn;
use AuthBundle\Form\SignInType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SignInController extends Controller
{
    /**
     * @ApiDoc(
     *  section="Auth",
     *  input = {
     *      "class" = "AuthBundle\Form\SignInType",
     *      "name"  = ""
     *  }
     * )
     * 
     * @param Request $request
     * @TODO: Переписать метод
     */
    public function indexAction(Request $request)
    {
        $requestParams = json_decode($request->getContent(), true);
       
        $form = $this->createForm(SignInType::class, null, ['csrf_protection' => false]);
        
        $form->submit($requestParams);

        var_dump($form->isSubmitted() && $form->isValid());

        echo (string) $form->getErrors(true, false);

        return new Response('200', 201);
        
        

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        try {
            $requestParams = json_decode($request->getContent());
            if(!isset($requestParams->username) || !isset($requestParams->password)) {
                throw new BadRequestHttpException("Bad parameters");
            }
        } catch (HttpException $e) {
            return new JsonResponse(['code' => $e->getStatusCode(), "message" => $e->getMessage()], $e->getStatusCode());
        }

        $account = $this->getDoctrine()
            ->getRepository('AuthBundle:Account')
            ->findOneBy(['username' => $requestParams->username]);

        if (!$account instanceof Account) {
            return new JsonResponse(['code' => Response::HTTP_UNAUTHORIZED, "message" => "User not found"], Response::HTTP_UNAUTHORIZED);
        }

        $isValid = $this->get('security.password_encoder')->isPasswordValid($account, $requestParams->password);

        if (!$isValid) {
            return new JsonResponse(['code' => Response::HTTP_UNAUTHORIZED, "message" => "Wrong password"], Response::HTTP_UNAUTHORIZED);
        }

        $ttl = $requestParams->dont_remember ?? false ? 60/*sec*/ * 5/*min*/ : $this->getParameter('lexik_jwt_authentication.token_ttl');
        $now = new \DateTime();
        $now->add(new \DateInterval('PT' . $ttl . 'S'));
        $ttl = $now->format('U');
        
        $token = $this->get('lexik_jwt_authentication.encoder')
            ->encode([
                'username' => $requestParams->username,
                'roles' => $account->getRoles(),
                'exp' => $ttl
            ]);
        return $this->renderTokenAction($token, $request);
    }

    public function renderTokenAction(string $token, Request $request)
    {
        return in_array("application/json", $request->getAcceptableContentTypes()) ?
            new JsonResponse(["token" => $token]) :
            $this->render('sign-in/tokenPopupWindow.twig', ["response" => ['token' => $token]]);
    }
}
