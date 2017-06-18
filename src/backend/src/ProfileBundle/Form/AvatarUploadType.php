<?php
namespace ProfileBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Image;
use Symfony\Component\Validator\Constraints\NotBlank;

class AvatarUploadType extends AbstractType
{
    private $minWidth;
    private $maxWidth;
    private $minHeight;
    private $maxHeight;
    private $maxRatio;
    private $minRatio;
    
    function __construct()
    {
        $this->minWidth = 0;
        $this->maxWidth = 9999;
        $this->minHeight = 0;
        $this->maxHeight = 9999;
        $this->minRatio = 0.25;
        $this->maxRatio = 3;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('x', IntegerType::class, ["constraints" => [new NotBlank()]])
            ->add('y', IntegerType::class, ["constraints" => [new NotBlank()]])
            ->add('width', IntegerType::class, ["constraints" => [new NotBlank()]])
            ->add('height', IntegerType::class, ["constraints" => [new NotBlank()]])
            ->add('image', FileType::class, [
                "constraints" => [
                    new NotBlank(),
                    new Image([
                        'minWidth' => $this->minWidth,
                        'maxWidth' => $this->maxWidth,
                        'minHeight' => $this->minHeight,
                        'maxHeight' => $this->maxHeight,
                        'minRatio' => $this->minRatio,
                        'maxRatio' => $this->maxRatio,
                    ])
                ],
            ])
        ;
    }
}