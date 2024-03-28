<?php

namespace BrandyBlocks\Shortcodes;

use BrandyBlocks\Traits\SingletonTrait;

class ShortcodesLoader {

	use SingletonTrait;

	protected function __construct() {
		if ( ! defined( 'BRANDY_TEMPLATE_DIR' ) ) {
			add_shortcode( 'brandy_relative_blogs', array( $this, 'brandy_relative_blogs' ) );
		}
	}

	public function brandy_relative_blogs( $atts ) {
		$atts = shortcode_atts(
			array(
				'related'  => 'categories',
				'order_by' => 'title',
				'order'    => 'asc',
			),
			$atts,
			'brandy_relative_blogs'
		);

		return brandy_blocks_get_content( 'templates/relative-blogs.php', $atts );
	}
}
