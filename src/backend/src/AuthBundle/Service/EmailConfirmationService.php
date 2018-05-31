<?php
namespace AuthBundle\Service;

use AuthBundle\Entity\Confirmation;
use AuthBundle\Entity\EmailConfirmationType;
use AuthBundle\Repository\ConfirmationRepository;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EmailConfirmationService
{
    private $authService;
    private $mailer;
    private $confirmationRepository;
    private $emailCodeLifeTimeMin;
    private $emailNoReply;

    public function __construct(
        AuthService $authService,
        \Swift_Mailer $mailer,
        ConfirmationRepository $confirmationRepository,
        int $emailCodeLifeTimeMin,
        string $emailNoReply
    ){
        $this->authService = $authService;
        $this->mailer = $mailer;
        $this->confirmationRepository = $confirmationRepository;
        $this->emailCodeLifeTimeMin = $emailCodeLifeTimeMin;
        $this->emailNoReply = $emailNoReply;
    }

    public function generateConfirmation()
    {
        $code = rand(1000, 9999);

        $sended = $this->send($code);

        if($sended === 0) throw new \Exception("message not sended");

        $this->createConfirmation($code);
    }

    public function send($code, $confirmUrl)
    {
        // проверяем не дублируется ли запрос
        $confirmation = $this->confirmationRepository->findOneBy([
            'account' => $this->authService->getAccount(),
            'wasted' => false
        ]);


//        if(!is_null($confirmation)) throw new AccessDeniedException("Код подтверждения уже выслан");

        $mailTo = $this->authService->getAccount()->getEmail();

        $titleText = "TopicOff.com | Код подтверждания";

        $message = sprintf("Это код подтверждения регистрации: <b>%s</b>", $code);

        $message.= "<br>Также вы можете активировать ваш аккаунт перейдя по ссылке: <br>";
        $message.= "<a target='_blank' href='$confirmUrl'>$confirmUrl</a>";

        $swiftMessage = new \Swift_Message($titleText);

        $swiftMessage->setFrom($this->emailNoReply)
            ->setTo($mailTo)
            ->setBody($message);

        // Create the Mailer using your created Transport
        return $this->mailer->send($swiftMessage);
    }

    public function createConfirmation($code)
    {
        $confirmation = new Confirmation($this->authService->getAccount(), $code);

        $emailCodeLifeTime = sprintf('PT%sM', $this->emailCodeLifeTimeMin);
        $expires = (new \DateTime())->add(new \DateInterval($emailCodeLifeTime));
        $confirmation
            ->setType(new EmailConfirmationType())
            ->setExpires($expires)
            ->setNotConfirmed()
            ->setUpdated(new \DateTime())
        ;

        $this->confirmationRepository->save($confirmation);
    }

    public function activateCode($code){

       /** @var Confirmation $confirmation */
       $confirmation = $this->confirmationRepository->findOneBy([
           'account' => $this->authService->getAccount(),
           'isConfirmed' => false,
           'wasted' => false
       ]);

        if(!$confirmation) {
            throw new NotFoundHttpException("no code was found");
        }

        if($confirmation->isExpired()) {
            $confirmation->setWasted(true);
            $this->confirmationRepository->save($confirmation);
            throw new AccessDeniedHttpException("code has expired");
        }

        if(strcmp($confirmation->getCode(), $code)!==0){
            $confirmation->setWasted(true);
            $this->confirmationRepository->save($confirmation);
            throw new AccessDeniedHttpException("bad code - new generated");
        }

        $confirmation->setConfirmed();
        $this->authService->confirmAccountByEmail($this->authService->getAccount());
        $this->confirmationRepository->save($confirmation);

        return false;
    }
}