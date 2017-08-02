<?php
namespace ProfileBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

class ProfileExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');

        $container->setParameter('profile.limit', $config['limit']);
        $container->setParameter('profile.min_age', $config['min_age']);
        $container->setParameter('profile.max_age', $config['max_age']);
        $container->setParameter('profile.avatar.absolute_path', $config['avatar']['absolute_path']);
        $container->setParameter('profile.avatar.web_path', $config['avatar']['web_path']);
        $container->setParameter('profile.avatar.min_width', $config['avatar']['min_width']);
        $container->setParameter('profile.avatar.max_width', $config['avatar']['max_width']);
        $container->setParameter('profile.avatar.min_height', $config['avatar']['min_height']);
        $container->setParameter('profile.avatar.max_height', $config['avatar']['max_height']);
        $container->setParameter('profile.avatar.min_ratio', $config['avatar']['min_ratio']);
        $container->setParameter('profile.avatar.max_ratio', $config['avatar']['max_ratio']);

        $container->setParameter('profile.backdrop.absolute_path', $config['backdrop']['absolute_path']);
        $container->setParameter('profile.backdrop.web_path', $config['backdrop']['web_path']);
        $container->setParameter('profile.backdrop.min_width', $config['backdrop']['min_width']);
        $container->setParameter('profile.backdrop.max_width', $config['backdrop']['max_width']);
        $container->setParameter('profile.backdrop.min_height', $config['backdrop']['min_height']);
        $container->setParameter('profile.backdrop.max_height', $config['backdrop']['max_height']);

        $container->setParameter('profile.backdrop.presets', $config['backdrop']['presets']);
    }
}