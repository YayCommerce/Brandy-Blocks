<?php

namespace BrandyBlocks;

use BrandyBlocks\Elementor\ElementorSetup;
use BrandyBlocks\Packages\PackagesLoader;
use BrandyBlocks\Shortcodes\FeatureProductShortcode;

class Initialize {
	use \BrandyBlocks\Traits\SingletonTrait;

	protected function __construct() {
		PackagesLoader::get_instance();
		ElementorSetup::get_instance();
		FeatureProductShortcode::get_instance();
	}
}
