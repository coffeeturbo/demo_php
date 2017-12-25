<?php
namespace CommentBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('comment');

        $rootNode
            ->children()
                ->integerNode('max_attachments_limit')
                    ->defaultValue(100)
                ->end()
            ->end()
            ;

        return $treeBuilder;
    }
}