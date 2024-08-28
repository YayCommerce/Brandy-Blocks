<?php

namespace BrandyBlocks\Externals\Settings\DisplayAnimation;

use BrandyBlocks\Traits\SingletonTrait;

class Caller {
	use SingletonTrait;

	protected function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_settings_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ) );
	}

	public function enqueue_settings_scripts() {
		wp_enqueue_script( 'brandy-blocks/display-animation-controls', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Build/Gutenberg/DisplayAnimation/index.js', array( 'wp-edit-post' ), time() );
	}

	public function enqueue_frontend_scripts() {
		wp_enqueue_style( 'brandy-blocks/display-animation-style', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Settings/DisplayAnimation/style.css', array(), time() );
		wp_enqueue_script( 'brandy-blocks/display-animation-script', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Settings/DisplayAnimation/script.js', array( 'jquery' ), time() );
	}

}

Caller::get_instance();
