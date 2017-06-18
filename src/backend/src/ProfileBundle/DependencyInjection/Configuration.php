<?php
namespace ProfileBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('profile');

        $rootNode
            ->children()
                ->integerNode('limit')
                    ->defaultValue(1)
                ->end()
                ->integerNode('min_age')
                    ->defaultValue(0)
                ->end()
                ->integerNode('max_age')
                    ->defaultValue(150)
                ->end()
                ->arrayNode("avatar")
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->scalarNode('absolute_path')->defaultValue('%kernel.root_dir%/../web/uploads/')->end()
                        ->scalarNode('web_path')->defaultValue('uploads')->end()
                    ->end()
                ->end()
            ->end();

        return $treeBuilder;
    }
}