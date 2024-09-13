<?php

namespace BrandyBlocks\Externals\Settings\ButtonSettings;

use BrandyBlocks\Traits\SingletonTrait;

class Caller {
	use SingletonTrait;

	protected function __construct() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_settings_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ) );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_frontend_scripts' ) );
		add_filter( 'block_type_metadata_settings', array( $this, 'declare_attribute' ), 10 );
	}

	public function declare_attribute( $settings ) {
		if ( ! empty( $settings['attributes'] ) ) {
			$settings['attributes']['hoverBackgroundColor'] = array(
				'type'    => 'string',
				'default' => '',
			);
			$settings['attributes']['hoverTextColor']       = array(
				'type'    => 'string',
				'default' => '',
			);
			$settings['attributes']['hoverBorder']          = array(
				'type'    => 'object',
				'default' => array(),
			);
		}
		return $settings;
	}

	public function enqueue_settings_scripts() {
		wp_enqueue_script( 'brandy-blocks/button-settings-controls', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Build/Gutenberg/ButtonSettings/index.js', array( 'wp-edit-post' ), time(), true );
	}

	public function enqueue_frontend_scripts() {
		wp_enqueue_style( 'brandy-blocks/button-settings-style', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Settings/ButtonSettings/style.css', array(), time() );
	}

}

Caller::get_instance();
