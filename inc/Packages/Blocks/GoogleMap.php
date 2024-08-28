<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;

class GoogleMap extends AbstractBlock {

	use SingletonTrait;

	public $name = 'GoogleMap';

	protected $attributes = array();

	protected function init_hooks() {
		wp_register_script( 'brandy-blocks/google-map', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Packages/Blocks/GoogleMap.js', array( 'jquery' ), time(), true );
	}

}
