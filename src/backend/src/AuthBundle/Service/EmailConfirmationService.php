<?php
namespace AuthBundle\Service;

use AuthBundle\Entity\Confirmation;
use AuthBundle\Entity\EmailConfirmationType;
use AuthBundle\Repository\ConfirmationRepository;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EmailConfirmationService
{
    private $authService;
    private $mailer;
    private $confirmationRepository;
    private $emailCodeLifeTimeMin;

    public function __construct(
        AuthService $authService,
        \Swift_Mailer $mailer,
        ConfirmationRepository $confirmationRepository,
        int $emailCodeliifeTimeMin
    ){
        $this->authService = $authService;
        $this->mailer = $mailer;
        $this->confirmationRepository = $confirmationRepository;
        $this->emailCodeLifeTimeMin = $emailCodeliifeTimeMin;
    }

    public function send($code)
    {

        $mailTo = $this->authService->getAccount()->getEmail();

        $titleText = "TopicOff.com | Код подтверждания";

        $message = sprintf("это код подтверждения регистрации %s", $code);

        $swiftMessage = new \Swift_Message($titleText);

        $swiftMessage->setFrom('send@example.com')
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
           'code' => $code,
           'account' => $this->authService->getAccount(),
           'isConfirmed' => false
       ]);

        if($confirmation->isExpired()) {
            throw new AccessDeniedHttpException("code has expired");
        }

        if(!$confirmation) {
            throw new NotFoundHttpException("no code was found");
        }
        $confirmation->setConfirmed();
        $this->confirmationRepository->save($confirmation);

        $this->authService->confirmAccountByEmail($this->authService->getAccount());

        return false;
    }
}