<?php

namespace AuthBundle\Form;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

class SignInType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', TextType::class, ["constraints"=> [ new NotBlank() ]])
            ->add('password', TextType::class, ["constraints"=> [ new NotBlank() ]])
            ->add('dont_remember', TextType::class, ["required" => false])
        ;
    }

//    public function setDefaultOptions(OptionsResolver $resolver)
//    {
//        $resolver->setDefaults(array(
//            'data_class' => Account::class
//        ));
//    }
    public function getName()
    {
        return 'sign-in123';
    }
}