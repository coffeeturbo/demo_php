<?php

namespace AuthBundle\Controller;
use AuthBundle\Entity\Account;
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
     * @ApiDoc(
     *  section="Auth",
     * )
     * @param Request $request
     * @TODO: Переписать метод
     */
    public function indexAction(Request $request)
    {
        try {
            $this->checkParametrs($request);
        } catch (HttpException $e) {
            return new JsonResponse(['code' => $e->getStatusCode(), "message" => $e->getMessage()], $e->getStatusCode());
        }

        $request = json_decode($request->getContent());
        /** @var UserManager $userManager */
        $userManager = $this->get('fos_user.user_manager');
        
        /** @var Account $account */
        $account = $userManager->createUser();
        $account->setEnabled(true);
        $account->setPlainPassword($request->password);
        $account->setUsername($request->email);
        $account->setEmail($request->email);
        $account->setRoles([$request->role]);
        
        $userManager->updateUser($account);
        $token = $this->get('lexik_jwt_authentication.encoder')
            ->encode([
                'username' => $request->email,
                'roles' => $account->getRoles(),
                'exp' => $this->getTokenExpiryDateTime($this->getParameter('lexik_jwt_authentication.token_ttl'))
            ]);
        return new JsonResponse(['token' => $token]);
    }

    private function getTokenExpiryDateTime($ttl)
    {
        $now = new \DateTime();
        $now->add(new \DateInterval('PT' . $ttl . 'S'));

        return $now->format('U');
    }

    private function checkParametrs(Request $request)
    {
        $request = json_decode($request->getContent());
        if(!isset($request->email) || !isset($request->password) || !isset($request->role)) {
            throw new BadRequestHttpException("Bad parameters");
        }
    }
    
}