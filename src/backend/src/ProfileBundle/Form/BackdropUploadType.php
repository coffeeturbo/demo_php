<?php
namespace ProfileBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Image;
use Symfony\Component\Validator\Constraints\NotBlank;

class BackdropUploadType extends AbstractType
{
    private $minWidth;
    private $maxWidth;
    private $minHeight;
    private $maxHeight;

    function __construct($minWidth, $maxWidth, $minHeight, $maxHeight)
    {
        $this->minWidth = $minWidth;
        $this->maxWidth = $maxWidth;
        $this->minHeight = $minHeight;
        $this->maxHeight = $maxHeight;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id', IntegerType::class, ['required' => false , 'label' => 'profileId'])
            ->add('y', IntegerType::class, ["constraints" => [new NotBlank()]])
            ->add('image', FileType::class, [
                "constraints" => [
                    new NotBlank(),
                    new Image([
                        'minWidth' => $this->minWidth,
                        'maxWidth' => $this->maxWidth,
                        'minHeight' => $this->minHeight,
                        'maxHeight' => $this->maxHeight,
                    ])
                ],
            ])
        ;
    }

}