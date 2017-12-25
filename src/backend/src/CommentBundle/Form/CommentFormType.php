<?php
namespace CommentBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

class CommentFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('post_id', IntegerType::class, [
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ]
            ])
            ->add('parent_id', IntegerType::class, [
                'required' => false,
            ])
            ->add('attachments', TextareaType::class, [
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ]
            ])
        ;
    }
}