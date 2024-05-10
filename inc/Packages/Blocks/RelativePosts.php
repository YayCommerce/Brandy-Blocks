<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Core\ProductController;
use BrandyBlocks\Core\ProductQuery;
use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;
use BrandyBlocks\Utils\Helpers;
use Error;

class RelativePosts extends AbstractBlock {

	use SingletonTrait;

	public $name = 'RelativePosts';

	protected $attributes = array();

	protected function get_block_attributes() {
		return array(
			'render_callback' => array( $this, 'render' ),
		);
	}

	public function render( $attributes = array(), $content = '', $block = null ) {
		$posts_query = $attributes['posts_query'] ?? array();
		$shortcode   = sprintf( '[brandy_relative_blogs related="%s" order_by="%s" order="%s"]', $posts_query['related'] ?? '', $posts_query['order_by'] ?? '', $posts_query['order'] ?? '' );
		return do_shortcode( $shortcode );
	}

}
