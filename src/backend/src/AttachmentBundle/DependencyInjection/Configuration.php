<?php
namespace AttachmentBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('attachment');


        $rootNode
            ->children()
                ->arrayNode('image_type')
                    ->children()
                        ->scalarNode('absolute_path')
                            ->defaultValue('%kernel.root_dir%/../web/uploads/attachment/image')
                        ->end()
                        ->scalarNode('web_path')
                            ->defaultValue('uploads/attachment/image')
                        ->end()
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}