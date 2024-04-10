<?php
namespace BrandyBlocks\Shortcodes;

use BrandyBlocks\Core\ProductController;
use BrandyBlocks\Utils\ProductHelpers;
use BrandyBlocks\Traits\SingletonTrait;

defined( 'ABSPATH' ) || exit;

class FeatureProductShortcode {
	use SingletonTrait;

	protected function __construct() {
		add_shortcode( 'brandy-feature-shortcode', array( $this, 'feature_product_shortcode' ) );
	}


	public function feature_product_shortcode( $atts, $content = null ) {
		$atts = shortcode_atts(
			array(
				'product_id'       => '',
				'show_image'       => true,
				'show_category'    => true,
				'show_title'       => true,
				'show_price'       => true,
				'show_rating'      => true,
				'show_add_to_cart' => true,
				'show_meta'        => true,
				'show_short_desc'  => true,
				'show_tag'         => true,
			),
			$atts
		);
		ob_start();

		$product_id = ! empty( $atts['product_id'] ) ? intval( $atts['product_id'] ) : ProductHelpers::get_random_feature_product();

		$product = wc_get_product( $product_id );

		$product_controller = new ProductController( $product );

		$content = sprintf(
			'<div class="brandy-feature-product-container">%s
			<div class="brandy-feature-product-details">
				<span class="brandy-feature-product-categories">%s</span>
				<h1 class="brandy-feature-product-title">%s</h1>
				%s%s%s%s
			</div>
			</div>',
			ProductHelpers::parse_bool( $atts['show_image'] ) ? ProductHelpers::feature_product_image( $product_controller, $atts ) : '',
			ProductHelpers::parse_bool( $atts['show_category'] ) ? ProductHelpers::feature_product_category_names( $product_id ) : '',
			ProductHelpers::parse_bool( $atts['show_title'] ) ? $product->get_title() : '',
			ProductHelpers::parse_bool( $atts['show_price'] ) || ProductHelpers::parse_bool( $atts['show_rating'] ) ? ProductHelpers::feature_product_price( $product, $atts ) : '',
			ProductHelpers::parse_bool( $atts['show_add_to_cart'] ) ? ProductHelpers::feature_product_add_to_cart( $product_id ) : '',
			ProductHelpers::parse_bool( $atts['show_meta'] ) || ProductHelpers::parse_bool( $atts['show_short_desc'] ) ? ProductHelpers::feature_product_meta( $product, $atts ) : '',
			ProductHelpers::parse_bool( $atts['show_tag'] ) ? ProductHelpers::feature_product_tags( $product ) : '',
		);

		return $content;

	}
}
