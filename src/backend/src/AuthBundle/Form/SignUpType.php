<?php

namespace AuthBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;

class SignUpType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add(
                'name', TextType::class, ["constraints" => [
                    new NotBlank()
                ]]
            )
            ->add(
                'email', TextType::class, ["constraints" => [
                    new NotBlank(),
                    new Email()
                ]]
            )
            ->add('password', TextType::class, ["constraints" => [
                    new NotBlank(),
                    new Regex('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\S]{8,}$/')
                ]]
            )
        ;
    }
}