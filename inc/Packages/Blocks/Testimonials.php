<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;

class Testimonials extends AbstractBlock {

	use SingletonTrait;

	public $name = 'Testimonials';

	protected function init_hooks() {

		wp_register_script( 'brandy-blocks/testimonials', BRANDY_BLOCKS_PLUGIN_URL . '/inc/Packages/Blocks/Testimonials.js', array( 'jquery' ), BRANDY_BLOCKS_VERSION, true );

	}

}
