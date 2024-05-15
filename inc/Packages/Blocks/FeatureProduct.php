<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Core\ProductController;
use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;
use BrandyBlocks\Utils\ProductHelpers;

class FeatureProduct extends AbstractBlock {

	use SingletonTrait;

	public $name = 'FeatureProduct';



	protected $attributes         = array();
	protected $product_controller = array();

	protected function __construct() {

		if ( ! function_exists( 'WC' ) ) {
			return;
		}

		parent::__construct();

	}

	protected function init_hooks() {
	}

	protected function get_block_attributes() {
		return array(
			'render_callback' => array( $this, 'render' ),
		);
	}

	protected function parse_attributes_from_block_attributes( $block_attributes ) {
		return array(
			'product'          => isset( $block_attributes['product'] ) ? $block_attributes['product'] : false,
			'content_settings' => isset( $block_attributes['content_settings'] ) ? $block_attributes['content_settings'] : false,
		);
	}

	public function render( $attributes = array(), $content = '', $block = null ) {
		$this->attributes = $this->parse_attributes_from_block_attributes( $attributes );
		$product_id       = isset( $attributes['product_id'] ) && $attributes['product_id'] ? $attributes['product_id'] : ProductHelpers::get_random_feature_product();
		$product          = array();
		if ( $product_id ) {
			$product = wc_get_product( $product_id );
		}
		if ( $product ) {
			$content = sprintf(
				'<div class="brandy-block-feature-product" data-settings="%s">%s</div>',
				esc_attr( wp_json_encode( $this->attributes ) ),
				$this->render_product_section( $product, $attributes ),
			);
			return $content;
		}

		return '';
	}

	public function render_product_section( $product, $attributes ) {
		$product_id         = isset( $attributes['product_id'] ) && ! empty( $attributes['product_id'] ) ? intval( $attributes['product_id'] ) : ProductHelpers::get_random_feature_product();
		$content_settings   = isset( $this->attributes['content_settings'] ) ? $this->attributes['content_settings'] : ProductHelpers::product_content_settings();
		$product_controller = new ProductController( $product );
		$content            = sprintf(
			'<div class="brandy-block-feature-product-container">%s
				<div class="brandy-block-feature-product__details">
					<div class="brandy-block-feature-product__categories">%s</div>
					%s%s%s%s%s
				</div>
			</div>',
			ProductHelpers::parse_bool( $content_settings['show_image'] ) ? ProductHelpers::feature_product_image( $product_controller, $content_settings ) : '',
			ProductHelpers::parse_bool( $content_settings['show_category'] ) ? ProductHelpers::feature_product_category_names( $product_id ) : '',
			ProductHelpers::parse_bool( $content_settings['show_title'] ) ? sprintf( '<h3 class="brandy-block-feature-product__title"><a href="%s">%s</a></h3>', $product->get_permalink(), $product->get_title() ) : '',
			ProductHelpers::parse_bool( $content_settings['show_price'] ) || ProductHelpers::parse_bool( $content_settings['show_rating'] ) ? ProductHelpers::feature_product_price( $product, $content_settings ) : '',
			ProductHelpers::parse_bool( $content_settings['show_add_to_cart'] ) ? ProductHelpers::feature_product_add_to_cart( $product_id ) : '',
			ProductHelpers::parse_bool( $content_settings['show_meta'] ) || ProductHelpers::parse_bool( $content_settings['show_short_desc'] ) ? ProductHelpers::feature_product_meta( $product, $content_settings ) : '',
			ProductHelpers::parse_bool( $content_settings['show_tag'] ) ? ProductHelpers::feature_product_tags( $product ) : '',
		);

		return $content;

	}
}
