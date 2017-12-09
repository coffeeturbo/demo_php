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

//        $rootNode
//            ->children()
//                ->integerNode('min_tags_limit')
//                    ->defaultValue(0)
//                ->end()
//                ->integerNode('max_tags_limit')
//                    ->defaultValue(10)
//                ->end()
//                ->integerNode('max_attachments_limit')
//                    ->defaultValue(100)
//                ->end()
//            ->end()
//            ;

        return $treeBuilder;
    }
}