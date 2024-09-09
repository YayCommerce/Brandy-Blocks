<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;

class AddToWishlist extends AbstractBlock {

	use SingletonTrait;

	public $name = 'AddToWishlist';

	protected function get_block_attributes() {
		return array(
			'render_callback' => array( $this, 'render' ),
		);
	}

	public function init_hooks() {
	}

	public function render( $attributes, $content, $block ) {

	}
}
