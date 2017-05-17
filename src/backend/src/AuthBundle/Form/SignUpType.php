<?php

namespace AuthBundle\Form;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

class SignUpType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', TextType::class, ["constraints"=> [ new NotBlank() ]])
            ->add('password', TextType::class, ["constraints"=> [ new NotBlank() ]])
        ;
    }
}