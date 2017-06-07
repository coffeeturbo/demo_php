<?php

namespace AppBundle\Service;

use AppBundle\Exception\BadRestRequestHttpException;
use Symfony\Component\Form\FormFactory;
use Symfony\Component\HttpFoundation\Request;

class ValidateRequestService
{
    private $formFactory;

    function __construct(FormFactory $formFactory)
    {
        $this->formFactory = $formFactory;
    }

    public function validate(Request $request, $type)
    {
        $body = json_decode($request->getContent(), true);
        $form = $this->formFactory->create($type);
        $form->submit($body);

        if (!$form->isValid()) {
            $errors = [];
            foreach ($form->all() as $input) {
                foreach ($input->getErrors() as $error) {
                    $errors[$input->getName()] = $error->getMessage();
                }
            }
            
            throw new BadRestRequestHttpException("Bad request", $errors);
        }

        return $form->getData();
    }
}