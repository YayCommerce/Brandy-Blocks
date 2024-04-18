<?php

namespace BrandyBlocks;

use BrandyBlocks\Elementor\ElementorSetup;
use BrandyBlocks\Packages\PackagesLoader;
use BrandyBlocks\Shortcodes\FeatureProductShortcode;
use BrandyBlocks\Shortcodes\ShortcodesLoader;


class Initialize {
	use \BrandyBlocks\Traits\SingletonTrait;

	protected function __construct() {
		require_once BRANDY_BLOCKS_PLUGIN_PATH . 'inc/Functions.php';

		FeatureProductShortcode::get_instance();
		ShortcodesLoader::get_instance();
		PackagesLoader::get_instance();
		ElementorSetup::get_instance();

	}
}
