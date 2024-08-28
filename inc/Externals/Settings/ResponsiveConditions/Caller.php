<?php

namespace BrandyBlocks\Externals\Settings\ResponsiveConditions;

use BrandyBlocks\Traits\SingletonTrait;

class Caller {
	use SingletonTrait;

	protected function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_settings_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ) );
	}

	public function enqueue_settings_scripts() {
		wp_enqueue_script( 'brandy-blocks/responsive-conditions-controls', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Build/Gutenberg/ResponsiveConditions/index.js', array( 'wp-edit-post' ), time() );
	}

	public function enqueue_frontend_scripts() {
		wp_enqueue_style( 'brandy-blocks/responsive-conditions-style', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Settings/ResponsiveConditions/style.css', array(), time() );
	}

}

Caller::get_instance();
