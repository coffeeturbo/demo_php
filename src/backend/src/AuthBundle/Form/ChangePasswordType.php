<?php
namespace AuthBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

class ChangePasswordType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('old_password', TextType::class, ["constraints" => [new NotBlank()]])
            ->add('password', TextType::class, ["constraints" => [new NotBlank()]])
            ->add('password_confirm', TextType::class, ["constraints" => [new NotBlank()]])
        ;
    }
}