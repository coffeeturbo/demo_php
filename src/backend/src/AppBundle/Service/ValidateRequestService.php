<?php

namespace AppBundle\Service;

use AppBundle\Exception\BadRestRequestHttpException;
use Symfony\Component\Form\FormFactory;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;

class ValidateRequestService
{
    private $formFactory;

    /** @var  FormInterface */
    private $form;

    function __construct(FormFactory $formFactory)
    {
        $this->formFactory = $formFactory;
    }

    public function validate(Request $request, string $type, $data = null): bool
    {
        $this->form = $this->formFactory->createNamed(null, $type, $data);
        $this->form->handleRequest($request);

        if(!$this->form->isSubmitted()) {
            $body = json_decode($request->getContent(), true);
            $clearMissing = $request->getMethod() != 'PATCH';
            $this->form->submit($body, $clearMissing);
        }

        if (!$this->form->isValid()) {
            $errors = [];
            foreach ($this->form->all() as $input) {
                foreach ($input->getErrors() as $error) {
                    $errors[$input->getName()] = $error->getMessage();
                }
            }
            
            throw new BadRestRequestHttpException($errors);
        }

        return true;
    }

    public function getData(Request $request, string $type, $data = null)
    {
        $this->validate($request, $type, $data);
        return $this->form->getData();
    }
}