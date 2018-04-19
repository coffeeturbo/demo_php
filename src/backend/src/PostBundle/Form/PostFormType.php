<?php
namespace PostBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\LengthValidator;
use Symfony\Component\Validator\Constraints\NotBlank;

class PostFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id', IntegerType::class,['required' => true,])
            ->add("title", TextType::class, [
                'required' => true,
                "constraints" => [
                    new NotBlank(),
                    new Length([
                        "min" => 4,
                        "max" => 140
                    ])
                ]
            ])
            ->add('tags', TextareaType::class, [
            ])
            ->add('attachments', TextareaType::class)
        ;
    }
}