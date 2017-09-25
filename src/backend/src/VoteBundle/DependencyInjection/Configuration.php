<?php
namespace VoteBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

class Configuration implements ConfigurationInterface
{
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('vote');
        $rootNode->children()
                ->integerNode('post_vote_weight')
                    ->defaultValue(1)
                ->end()
                ->integerNode('comment_vote_weight')
                    ->defaultValue(1)
                ->end()
            ->end();

        return $treeBuilder;
    }
}