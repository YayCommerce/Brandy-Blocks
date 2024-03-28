<?php

namespace BrandyBlocks;

use BrandyBlocks\Packages\PackagesLoader;
use BrandyBlocks\Shortcodes\ShortcodesLoader;

class Initialize {
	use \BrandyBlocks\Traits\SingletonTrait;

	protected function __construct() {
		require_once BRANDY_BLOCKS_PLUGIN_PATH . 'inc/Functions.php';

		PackagesLoader::get_instance();
		// ElementorSetup::get_instance();
		ShortcodesLoader::get_instance();
	}
}
