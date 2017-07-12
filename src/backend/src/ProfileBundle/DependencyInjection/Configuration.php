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
                        ->integerNode('min_width')->defaultValue(200)->end()
                        ->integerNode('min_height')->defaultValue(200)->end()
                        ->integerNode('max_width')->defaultValue(7000)->end()
                        ->integerNode('max_height')->defaultValue(7000)->end()
                        ->floatNode('min_ratio')->defaultValue(0.25)->end()
                        ->integerNode('max_ratio')->defaultValue(3)->end()
                    ->end()
                ->end()
//                ->arrayNode("backdrop")
//                    ->addDefaultsIfNotSet()
//                    ->children()
//                        ->scalarNode('absolute_path')->defaultValue('%kernel.root_dir%/../web/uploads/')->end()
//                        ->scalarNode('web_path')->defaultValue('uploads')->end()
//                        ->scalarNode('min_width')->defaultValue(1500)->end()
//                        ->scalarNode('min_height')->defaultValue(300)->end()
//                        ->scalarNode('max_width')->defaultValue(7000)->end()
//                        ->scalarNode('max_height')->defaultValue(7000)->end()
//                        ->scalarNode('min_ratio')->defaultValue(3)->end()
//                        ->scalarNode('max_ratio')->defaultValue(3)->end()
//                    ->end()
//                ->end()
            ->end();

        return $treeBuilder;
    }
}