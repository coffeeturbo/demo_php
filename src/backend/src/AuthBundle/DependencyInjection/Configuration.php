<?php
namespace AuthBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('auth');

        $rootNode
            ->children()
                ->integerNode('email_code_life_time_min')
                    ->defaultValue(1440)
                ->end()
            ->end()
            ;

        return $treeBuilder;
    }
}