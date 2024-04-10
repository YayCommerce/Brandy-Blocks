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

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

		global $pagenow;
		if ( 'post.php' === $pagenow || 'page.php' === $pagenow ) {
			add_action( 'enqueue_block_assets', array( $this, 'enqueue_scripts' ) );

		}

		add_action( 'woocommerce_before_add_to_cart_quantity', array( $this, 'woocommerce_before_add_to_cart_quantity' ) );
		add_action( 'woocommerce_after_add_to_cart_quantity', array( $this, 'woocommerce_after_add_to_cart_quantity' ) );

	}

	public function enqueue_scripts() {
		if ( ! is_admin() ) {
			wp_enqueue_script( 'brandy-feature-product-js', BRANDY_BLOCKS_PLUGIN_URL . '/inc/Packages/dist/js/feature-product.js', array( 'jquery' ), BRANDY_BLOCKS_VERSION, true );
		}
	}

	// Add class
	public function woocommerce_before_add_to_cart_quantity() {
		if ( function_exists( 'register_block_type' ) ) {
			$blocks = parse_blocks( get_post_field( 'post_content', get_the_ID() ) );
			foreach ( $blocks as $block ) {
				if ( 'brandy/feature-product' === $block['blockName'] ) {
					echo '<div class="brandy-feature-product-quantity"><a href="javascript:void(0)" class="quantity-minus">-</a>';
					break;
				}
			}
		}
		if ( class_exists( 'Elementor\Plugin' ) && \Elementor\Plugin::$instance->db->is_built_with_elementor( get_the_ID() ) ) {
			echo '<div class="brandy-feature-product-quantity"><a href="javascript:void(0)" class="quantity-minus">-</a>';
		}
	}

	public function woocommerce_after_add_to_cart_quantity() {
		if ( function_exists( 'register_block_type' ) ) {
			$blocks = parse_blocks( get_post_field( 'post_content', get_the_ID() ) );
			foreach ( $blocks as $block ) {
				if ( 'brandy/feature-product' === $block['blockName'] ) {
					echo '<a href="javascript:void(0)" class="quantity-plus">+</a></div>';
					break;
				}
			}
		}
		if ( class_exists( 'Elementor\Plugin' ) && \Elementor\Plugin::$instance->db->is_built_with_elementor( get_the_ID() ) ) {
			echo '<a href="javascript:void(0)" class="quantity-plus">+</a></div>';
		}
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
			'<div class="brandy-feature-product-container">%s
			<div class="brandy-feature-product-details">
				<span class="brandy-feature-product-categories">%s</span>
				<h1 class="brandy-feature-product-title">%s</h1>
				%s%s%s%s
			</div>
			</div>',
			ProductHelpers::parse_bool( $content_settings['show_image'] ) ? ProductHelpers::feature_product_image( $product_controller, $content_settings ) : '',
			ProductHelpers::parse_bool( $content_settings['show_category'] ) ? ProductHelpers::feature_product_category_names( $product_id ) : '',
			ProductHelpers::parse_bool( $content_settings['show_title'] ) ? $product->get_title() : '',
			ProductHelpers::parse_bool( $content_settings['show_price'] ) || ProductHelpers::parse_bool( $content_settings['show_rating'] ) ? ProductHelpers::feature_product_price( $product, $content_settings ) : '',
			ProductHelpers::parse_bool( $content_settings['show_add_to_cart'] ) ? ProductHelpers::feature_product_add_to_cart( $product_id ) : '',
			ProductHelpers::parse_bool( $content_settings['show_meta'] ) || ProductHelpers::parse_bool( $content_settings['show_short_desc'] ) ? ProductHelpers::feature_product_meta( $product, $content_settings ) : '',
			ProductHelpers::parse_bool( $content_settings['show_tag'] ) ? ProductHelpers::feature_product_tags( $product ) : '',
		);

		return $content;

	}
}
