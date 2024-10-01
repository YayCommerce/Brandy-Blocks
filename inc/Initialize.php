<?php

namespace BrandyBlocks;

use BrandyBlocks\Elementor\ElementorSetup;
use BrandyBlocks\Externals\ExternalsLoader;
use BrandyBlocks\Packages\PackagesLoader;
use BrandyBlocks\Shortcodes\ShortcodesLoader;

class Initialize {
	use \BrandyBlocks\Traits\SingletonTrait;

	protected function __construct() {
		require_once BRANDY_BLOCKS_PLUGIN_PATH . 'inc/Functions.php';
		require_once BRANDY_BLOCKS_PLUGIN_PATH . 'inc/Admin/SettingsMenu.php';

		ShortcodesLoader::get_instance();
		PackagesLoader::get_instance();
		ElementorSetup::get_instance();
		ExternalsLoader::get_instance();
		Wishlist::get_instance();

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	public function enqueue_scripts() {
		if ( ! wp_script_is( 'brandy-swiper-script' ) ) {
			wp_register_script( 'brandy-swiper-script', BRANDY_BLOCKS_PLUGIN_URL . '/assets/lib/swiper/swiper.min.js', array( 'jquery' ), time(), true );
		}

		if ( ! wp_style_is( 'brandy-swiper-style' ) ) {
			wp_register_style( 'brandy-swiper-style', BRANDY_BLOCKS_PLUGIN_URL . '/assets/lib/swiper/swiper.min.css', array(), time() );
		}

	}
}
