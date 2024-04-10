<?php

namespace BrandyBlocks\Elementor\Elements;

use BrandyBlocks\Core\ProductController;
use BrandyBlocks\Utils\ProductHelpers;

class FeatureProductElement extends \Elementor\Widget_Base {
	protected $settings = array();

	public function get_name() {
		return 'feature-product-element';
	}

	public function get_title() {
		return esc_html__( 'Feature Product', 'brandy-blocks' );
	}

	public function get_icon() {
		return 'eicon-products';
	}

	public function get_categories() {
		return array( 'brandy-blocks' );
	}

	public function get_keywords() {
		return array( __( 'Feature Product', 'brandy-blocks' ), __( 'Feature Product element', 'brandy-blocks' ) );
	}

	protected function _register_controls() {
		self::product_controls_settings();
		self::content_controls_settings();
	}


	protected function product_controls_settings() {
		$this->start_controls_section(
			'product_section',
			array(
				'label' => __( 'Product Settings', 'brandy-blocks' ),
			)
		);

		$products_option = ProductHelpers::get_random_feature_product( 'products' );

		$this->add_control(
			'product_id',
			array(
				'label'       => esc_html__( 'Select Product', 'brandy-blocks' ),
				'type'        => \Elementor\Controls_Manager::SELECT2,
				'label_block' => true,
				'multiple'    => false,
				'options'     => $products_option,

			)
		);

		$this->end_controls_section();
	}

	protected function content_controls_settings() {
		$this->start_controls_section(
			'content_section',
			array(
				'label' => __( 'Content Settings', 'brandy-blocks' ),
			)
		);
		$data = array(
			'show_image'       => __( 'Show Image', 'brandy-blocks' ),
			'show_category'    => __( 'Show Category', 'brandy-blocks' ),
			'show_title'       => __( 'Show Title', 'brandy-blocks' ),
			'show_rating'      => __( 'Show Rating', 'brandy-blocks' ),
			'show_price'       => __( 'Show Price', 'brandy-blocks' ),
			'show_add_to_cart' => __( 'Add To Cart button', 'brandy-blocks' ),
			'show_meta'        => __( 'Show Meta', 'brandy-blocks' ),
			'show_short_desc'  => __( 'Show Short Description', 'brandy-blocks' ),
			'show_tag'         => __( 'Show Tag', 'brandy-blocks' ),
		);
		foreach ( $data as $param => $value ) {
			$this->add_control(
				$param,
				array(
					'label'        => esc_html( $value ),
					'type'         => \Elementor\Controls_Manager::SWITCHER,
					'label_on'     => esc_html__( 'Show', 'brandy-blocks' ),
					'label_off'    => esc_html__( 'Hide', 'brandy-blocks' ),
					'return_value' => 'yes',
					'default'      => 'yes',
				)
			);
		}

		$this->end_controls_section();
	}

	protected function render() {
		$this->settings = $this->get_settings_for_display();
		printf(
			'<div class="brandy-block-feature-product">%s</div>',
			$this->render_product_section()
		);

	}

	public function render_list( $products ) {
		return implode( '', array_map( array( $this, 'render_product' ), $products ) );
	}

	public function render_product_section() {

		$product_id = isset( $this->settings['product_id'] ) && ! empty( $this->settings['product_id'] ) ? intval( $this->settings['product_id'] ) : ProductHelpers::get_random_feature_product();

		$product            = wc_get_product( $product_id );
		$product_controller = new ProductController( $product );
		$content            = sprintf(
			'<div class="brandy-feature-product-container">%s
			<div class="brandy-feature-product-details">
				<span class="brandy-feature-product-categories">%s</span>
				<h1 class="brandy-feature-product-title">%s</h1>
				%s%s%s%s
			</div>
			</div>',
			ProductHelpers::parse_bool( $this->settings['show_image'] ) ? ProductHelpers::feature_product_image( $product_controller, $this->settings ) : '',
			ProductHelpers::parse_bool( $this->settings['show_category'] ) ? ProductHelpers::feature_product_category_names( $product_id ) : '',
			ProductHelpers::parse_bool( $this->settings['show_title'] ) ? $product->get_title() : '',
			ProductHelpers::parse_bool( $this->settings['show_price'] ) || ProductHelpers::parse_bool( $this->settings['show_rating'] ) ? ProductHelpers::feature_product_price( $product, $this->settings ) : '',
			ProductHelpers::parse_bool( $this->settings['show_add_to_cart'] ) ? ProductHelpers::feature_product_add_to_cart( $product_id ) : '',
			ProductHelpers::parse_bool( $this->settings['show_meta'] ) || ProductHelpers::parse_bool( $this->settings['show_short_desc'] ) ? ProductHelpers::feature_product_meta( $product, $this->settings ) : '',
			ProductHelpers::parse_bool( $this->settings['show_tag'] ) ? ProductHelpers::feature_product_tags( $product ) : '',
		);

		return $content;

	}
}
