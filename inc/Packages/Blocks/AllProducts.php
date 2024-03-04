<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Core\ProductController;
use BrandyBlocks\Core\ProductQuery;
use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;

class AllProducts extends AbstractBlock {

	use SingletonTrait;

	public $name = 'AllProducts';

	protected $attributes = [];

	protected function get_block_attributes() {
		return [
			'render_callback' => array( $this, 'render' )
		];
	}

	public function render( $attributes = [], $content = '', $block = null ) {
		$this->attributes = $this->parse_attributes( $attributes );
		$result = ProductQuery::get_instance()->query( $this->attributes );
		$products = array_values( array_map( 'wc_get_product', $result ) );

		$content = sprintf( '
			<div class="brandy-block-all-products"><ul class="products brandy-product-list">%s</ul></div>
		', implode( '', array_map( array( $this, 'render_product' ), $products ) ) );
		return $content;
	}

	protected function parse_attributes( $attributes ) {

		$defaults = array(
			'columns'           => wc_get_theme_support( 'product_blocks::default_columns', 3 ),
			'rows'              => wc_get_theme_support( 'product_blocks::default_rows', 3 ),
			'alignButtons'      => false,
			'categories'        => array(),
			'catOperator'       => 'any',
			'contentVisibility' => array(
				'image'  => true,
				'title'  => true,
				'price'  => true,
				'rating' => true,
				'button' => true,
			),
			'stockStatus'       => array_keys( wc_get_product_stock_status_options() ),
		);

		return wp_parse_args( $attributes, $defaults );
	}

	public function render_product( $product ) {
		$product_controller = new ProductController( $product, $this->attributes );
		$content = sprintf( 
			'<li class="product">
				<div class="brandy-block-product__thumbnail">%1$s%2$s</div>
				<div class="brandy-block-product__content">%3$s%4$s%5$s%6$s%7$s</div>
			</li>', 
			$product_controller->get_template_sale_flash(),
			$product_controller->get_template_image(),
			$product_controller->get_template_category(),
			$product_controller->get_template_title(), 
			$product_controller->get_template_rating(),
			$product_controller->get_template_pricing(), 
			$product_controller->get_template_button(), 

		);

		return apply_filters( 'brandy_block_product_content', $content, $product, $product_controller );
	}

}
