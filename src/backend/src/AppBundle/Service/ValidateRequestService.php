<?php
namespace AppBundle\Service;

use Symfony\Component\Form\FormFactory;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ValidateRequestService
{
    private $formFactory;
    
    function __construct(FormFactory $formFactory)
    {
        $this->formFactory = $formFactory;
    }

    public function validate(Request $request, $type) {
        $body = json_decode($request->getContent(), true);
        $form = $this->formFactory->create($type);
        $form->submit($body);

        if(!$form->isValid())
            throw new BadRequestHttpException("Bad parameters");

        return $form->getData();
    }
}