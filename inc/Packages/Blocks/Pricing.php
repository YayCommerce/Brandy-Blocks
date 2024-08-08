<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;

class Pricing extends AbstractBlock {

	use SingletonTrait;

	public $name = 'Pricing';

	protected function init_hooks() {

		wp_register_script( 'brandy-pricing', BRANDY_BLOCKS_PLUGIN_URL . '/inc/Packages/dist/js/pricing.js', array( 'jquery' ), BRANDY_BLOCKS_VERSION, true );

	}

}
