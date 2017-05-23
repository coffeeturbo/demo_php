<?php
namespace CoreBundle\Service;

use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Nelmio\ApiDocBundle\Extractor\AnnotationsProviderInterface;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Route;
use Symfony\Component\Yaml\Yaml;

class NelmioApiYmlProvider implements AnnotationsProviderInterface
{
    private $vendorFolder;

    public function __construct($vendorFolder)
    {
        $this->vendorFolder = $vendorFolder;
    }
    /**
     * {@inheritdoc}
     */
    public function getAnnotations()
    {
        $annotations = [];
        $configDirectories = array($this->vendorFolder);

        $finder = new Finder();

        $finder->files()->in($configDirectories);

        if (count($finder) == 0) {
            throw new NotFoundHttpException('No file found for this protocol');
        }

        foreach ($finder as $file_) {
            $data = Yaml::parse(file_get_contents($file_));

            $vendors = array_keys($data);
            foreach ($vendors as $vendor) {
                $apiDoc = new ApiDoc($data[$vendor]);
                $route = new Route(
                    $data[$vendor]['route']['path'],
                    $data[$vendor]['route']['defaults'],
                    $data[$vendor]['route']['requirements'],
                    $data[$vendor]['route']['options'],
                    $data[$vendor]['route']['host'],
                    $data[$vendor]['route']['schemes'],
                    $data[$vendor]['route']['methods'],
                    $data[$vendor]['route']['condition']
                );

                $apiDoc->setRoute($route);
                $apiDoc->setResponse($data[$vendor]['response']);
                $annotations[] = $apiDoc;
            }
        }

        return $annotations;
    }
}