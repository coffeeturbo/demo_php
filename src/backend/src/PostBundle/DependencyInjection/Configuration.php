<?php
namespace PostBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('post');

        $rootNode
            ->children()
                ->integerNode('max_tags_limit')
                    ->defaultValue(10)
                ->end()
            ->end()
            ;

        return $treeBuilder;
    }
}