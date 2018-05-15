<?php
namespace AuthBundle\Controller;

use AppBundle\Http\ErrorJsonResponse;
use AuthBundle\Entity\Confirmation;
use AuthBundle\Entity\EmailConfirmationType;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class SendMailController extends Controller
{

    /**
     * Меняет пароль аккаунта
     *
     * @ApiDoc(
     *  section = "Auth",
     *  description= "Сменить пароль",
     *  authentication=true,
     *  output = {"class" = "AuthBundle\Response\SuccessAuthResponse"},
     *  statusCodes = {
     *      200 = "Успешная смена пароля",
     *      401 = "неавторизован",
     *      403 = "неправильный пароль",
     *  }
     * )
     * @param Request $request
     * @return Response
     */
    public function sendMailAction(Request $request)
    {
        try {

            $code = rand(1000,9999);

            $sended = $this->get('auth.service.email_confirmation_service')->send($code);



            if($sended){


                $confirmation = new Confirmation($this->getUser());

                dump($this->getUser());


                $confirmation
                    ->setType(new EmailConfirmationType())
                    ->setExpires(new \DateTime())
                    ->setIsConfirmed(false)
                    ->setUpdated(new \DateTime())
                ;


//                $em = $this->getDoctrine()->getManagerForClass(Confirmation::class);
//                $em->persist($confirmation);
//                $em->flush();

                $this->get('auth.repository.confirmation_repository')->save($confirmation);

                // сохраняем в базу код
                // expiredDate
                // accountId

            }


        } catch(AccessDeniedHttpException $e){
            return new ErrorJsonResponse($e->getMessage(), [], $e->getStatusCode());
        }

        catch(\Exception $e){
            return new ErrorJsonResponse($e->getMessage(), $e->getTrace());
        }

        return new JsonResponse([
            'mail_send' => true
        ]);

    }
}