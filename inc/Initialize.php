<?php

namespace BrandyBlocks;

use BrandyBlocks\Elementor\ElementorSetup;
use BrandyBlocks\Packages\PackagesLoader;

class Initialize {
	use \BrandyBlocks\Traits\SingletonTrait;

	protected function __construct() {
		PackagesLoader::get_instance();
		ElementorSetup::get_instance();
	}
}
