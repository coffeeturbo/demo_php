<?php
namespace ProfileBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;

class AvatarUploadType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
//            ->add('x1', IntegerType::class, [
//                'required' => true
//            ])
//            ->add('y1', IntegerType::class, [
//                'required' => true
//            ])
//            ->add('x2', IntegerType::class, [
//                'required' => true
//            ])
//            ->add('y2', IntegerType::class, [
//                'required' => true
//            ])
            ->add('image', FileType::class, [
//                'required' => true
            ])
        ;
    }

}