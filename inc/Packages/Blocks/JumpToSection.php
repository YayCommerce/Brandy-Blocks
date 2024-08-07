<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;

class JumpToSection extends AbstractBlock {

	use SingletonTrait;

	public $name = 'JumpToSection';

	protected $attributes = array();

	protected function init_hooks() {
		wp_register_script( 'jump-to-section', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Packages/dist/js/jump-to-section.js', array( 'jquery' ), time(), true );
	}

}
