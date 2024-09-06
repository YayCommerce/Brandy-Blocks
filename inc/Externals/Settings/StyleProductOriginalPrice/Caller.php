<?php

namespace BrandyBlocks\Externals\Settings\StyleProductOriginalPrice;

use BrandyBlocks\Traits\SingletonTrait;

class Caller
{
    use SingletonTrait;

    protected function __construct()
    {
        add_action('enqueue_block_editor_assets', array( $this, 'enqueue_settings_scripts' ));
        add_action('wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ));
        add_action('admin_enqueue_scripts', array($this,'enqueue_admin_scripts'));
    }

    public function enqueue_settings_scripts()
    {
        wp_enqueue_script('brandy-blocks/woo-product-original-price-controls', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Build/Gutenberg/StyleProductOriginalPrice/index.js', array( 'wp-edit-post' ), time());
        wp_localize_script(
            'brandy-blocks/woo-product-original-price-controls',
            'brandyGlobalSettings',
            wp_get_global_settings()
        );
    }

    public function enqueue_admin_scripts()
    {
        wp_enqueue_style('brandy-blocks/admin-original-price-settings-style', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Settings/StyleProductOriginalPrice/style.css', array( 'wp-edit-post' ), time());
    }

    public function enqueue_frontend_scripts()
    {
        wp_enqueue_script('brandy-blocks/original-price-settings-script', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Settings/StyleProductOriginalPrice/script.js', array( 'jquery' ), time());
    }
}

Caller::get_instance();
