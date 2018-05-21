<?php
namespace AuthBundle\Service;

use AuthBundle\Entity\Confirmation;
use AuthBundle\Entity\EmailConfirmationType;
use AuthBundle\Repository\ConfirmationRepository;

class EmailConfirmationService
{
    private $authService;
    private $mailer;
    private $confirmationRepository;

    public function __construct(
        AuthService $authService,
        \Swift_Mailer $mailer,
        ConfirmationRepository $confirmationRepository
    ){
        $this->authService = $authService;
        $this->mailer = $mailer;
        $this->confirmationRepository = $confirmationRepository;
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


        // один день todo брать это число из конфига
        $emailCodeLifeTime = 24*60;
        $expires = (new \DateTime())->add(new \DateInterval('PT'.$emailCodeLifeTime.'M'));
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

       if($confirmation) {
           $confirmation->setConfirmed();
           $this->confirmationRepository->save($confirmation);

           $this->authService->confirmAccountByEmail($this->authService->getAccount());
           return true;
       }

       return false;
    }
}