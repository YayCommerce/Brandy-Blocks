<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Core\ProductController;
use BrandyBlocks\Core\ProductQuery;
use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;
use BrandyBlocks\Utils\Helpers;
use Error;

class AllProducts extends AbstractBlock {

	use SingletonTrait;

	public $name = 'AllProducts';

	public const RENDER_LIST_ACTION = 'brandy_blocks_all_products_render_list';

	public const DEFAULT_ATTRIBUTES = array(
		'number_products' => 9,
		'columns'         => array(
			'desktop' => 4,
			'tablet'  => 2,
			'mobile'  => 1,
		),
		'pagination'      => true,
		'show_sorting'    => true,
		'order_by'        => 'default',
	);

	protected $attributes = array();

	protected function __construct() {

		if ( ! function_exists( 'WC' ) ) {
			return;
		}

		parent::__construct();

	}

	protected function init_hooks() {
		add_action( 'wp_ajax_nopriv_brandy_blocks_all_products_render_list', array( $this, 'ajax_render_list' ) );
		add_action( 'wp_ajax_brandy_blocks_all_products_render_list', array( $this, 'ajax_render_list' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

		global $pagenow;
		if ( 'post.php' === $pagenow || 'page.php' === $pagenow ) {
			add_action( 'enqueue_block_assets', array( $this, 'enqueue_scripts' ) );
		}
	}

	public function enqueue_scripts() {
		wp_enqueue_script( 'brandy-all-products-js', BRANDY_BLOCKS_PLUGIN_URL . '/inc/Packages/dist/js/all-products.js', array( 'jquery' ), BRANDY_BLOCKS_VERSION, true );
	}

	protected function get_block_attributes() {
		return array(
			'render_callback' => array( $this, 'render' ),
		);
	}

	public function get_query_result() {
		$result = ProductQuery::get_instance()->query( $this->attributes );
		return $result;
	}

	public function render( $attributes = array(), $content = '', $block = null ) {
		$this->attributes = $this->parse_attributes_from_block_attributes( $attributes );
		$query_result     = $this->get_query_result();
		$products         = array_values( array_map( 'wc_get_product', $query_result ) );
		$content          = sprintf(
			'<div class="brandy-block-all-products %s" data-settings="%s">%s%s%s</div>',
			is_brandy_exists() ? 'brandy-core-styles' : '',
			esc_attr( wp_json_encode( $this->attributes ) ),
			$this->render_sorting(),
			$this->render_list( $products ),
			$this->render_pagination( 5 )
		);
		return $content;
	}

	public function render_list( $products ) {

		$columns         = $this->attributes['columns'];
		$list_attributes = array(
			'desktop-columns="' . $columns['desktop'] . '"',
			'tablet-columns="' . $columns['tablet'] . '"',
			'mobile-columns="' . $columns['mobile'] . '"',
		);
		return sprintf(
			'<ul class="products brandy-product-list" %s>%s</ul>',
			join( ' ', $list_attributes ),
			implode( '', array_map( array( $this, 'render_product' ), $products ) )
		);
	}

	private function parse_bool( $value ) {
		if ( 'true' === $value ) {
			return true;
		}

		if ( 'false' === $value ) {
			return false;
		}

		return $value;
	}
	protected function parse_attributes_from_block_attributes( $block_attributes ) {
		return array(
			'number_products' => isset( $block_attributes['layout_settings']['number_products'] ) ? $block_attributes['layout_settings']['number_products'] : self::DEFAULT_ATTRIBUTES['number_products'],
			'columns'         => isset( $block_attributes['layout_settings']['columns'] ) ? $block_attributes['layout_settings']['columns'] : self::DEFAULT_ATTRIBUTES['columns'],
			'pagination'      => isset( $block_attributes['content_settings']['pagination'] ) ? $this->parse_bool( $block_attributes['content_settings']['pagination'] ) : self::DEFAULT_ATTRIBUTES['pagination'],
			'show_sorting'    => isset( $block_attributes['content_settings']['show_sorting'] ) ? $this->parse_bool( $block_attributes['content_settings']['show_sorting'] ) : self::DEFAULT_ATTRIBUTES['show_sorting'],
			'order_by'        => isset( $block_attributes['content_settings']['order_by'] ) ? $block_attributes['content_settings']['order_by'] : self::DEFAULT_ATTRIBUTES['order_by'],
			'page'            => 1,
		);
	}

	protected function parse_attributes( $attributes ) {
		return array(
			'number_products' => isset( $attributes['number_products'] ) ? $attributes['number_products'] : self::DEFAULT_ATTRIBUTES['number_products'],
			'columns'         => isset( $attributes['columns'] ) ? $attributes['columns'] : self::DEFAULT_ATTRIBUTES['columns'],
			'pagination'      => isset( $attributes['pagination'] ) ? $this->parse_bool( $attributes['pagination'] ) : self::DEFAULT_ATTRIBUTES['pagination'],
			'show_sorting'    => isset( $attributes['show_sorting'] ) ? $this->parse_bool( $attributes['show_sorting'] ) : self::DEFAULT_ATTRIBUTES['show_sorting'],
			'order_by'        => isset( $attributes['order_by'] ) ? $attributes['order_by'] : self::DEFAULT_ATTRIBUTES['order_by'],
			'page'            => isset( $attributes['page'] ) ? $attributes['page'] : 1,
		);
	}

	public function render_product( $product ) {

		$product_controller = new ProductController( $product );
		if ( function_exists( 'brandy_loop_product_item' ) ) {
			ob_start();
			\brandy_loop_product_item(
				$product
			);
			$content = ob_get_contents();
			ob_end_clean();
		} else {
			$content = sprintf(
				'<li class="product">
					<div class="brandy-block-product__thumbnail">%s%s</div>
					<div class="brandy-block-product__content">%s%s%s%s%s</div>
				</li>',
				$product_controller->get_template_sale_flash(),
				$product_controller->get_template_image(),
				$product_controller->get_template_category(),
				$product_controller->get_template_title(),
				$product_controller->get_template_rating(),
				$product_controller->get_template_pricing(),
				$product_controller->get_template_button()
			);
		}

		return apply_filters( 'brandy_blocks_loop_product_content', $content, $product, $product_controller );
	}

	public function render_sorting() {
		if ( ! $this->attributes['show_sorting'] ) {
			return '';
		}

		$order_by = $this->attributes['order_by'];

		$list = array(
			'default'    => __( 'Default sorting', 'brandy-blocks' ),
			'popularity' => __( 'Popularity', 'brandy-blocks' ),
			'rating'     => __( 'Average rating', 'brandy-blocks' ),
			'latest'     => __( 'Latest', 'brandy-blocks' ),
			'lowest'     => __( 'Price: low to high', 'brandy-blocks' ),
			'highest'    => __( 'Price: high to low', 'brandy-blocks' ),
		);

		return sprintf(
			'<div class="brandy-block-all-products__sort">
			<select class="wc-block-sort-select__select wc-block-components-sort-select__select">%s</select>
		</div>',
			implode(
				'',
				array_map(
					function ( $value ) use ( $list, $order_by ) {
						return sprintf(
							'<option value="%s" %s>%s</option>',
							$value,
							$value === $order_by ? 'selected' : '',
							$list[ $value ]
						);
					},
					array_keys( $list )
				)
			)
		);
	}

	public function render_pagination( $total_pages ) {
		if ( ! $this->attributes['pagination'] ) {
			return '';
		}

		$arrow_class = 'brandy-block-pagination--arrow';
		$page_class  = 'brandy-block-pagination-page';

		$previous_btn = '';

		if ( $total_pages > 1 ) {
			$previous_btn = sprintf(
				'<button class="%1$s" title="%3$s" %4$s>
			<span aria-hidden="true">%2$s</span>
			<span class="screen-reader-text">%3$s</span>
		</button>',
				"$page_class $arrow_class previous-arrow",
				'←',
				__( 'Previous page', 'brandy-blocks' ),
				1 === $this->attributes['page'] ? 'disabled' : ''
			);
		}

		$next_btn = '';

		if ( $total_pages > 1 ) {
			$next_btn = sprintf(
				'<button class="%1$s" title="%3$s" %4$s>
			<span aria-hidden="true">%2$s</span>
			<span class="screen-reader-text">%3$s</span>
		</button>',
				"$page_class $arrow_class next-arrow",
				'→',
				__( 'Next page', 'brandy-blocks' ),
				$this->attributes['page'] === $total_pages ? 'disabled' : ''
			);
		}

		$buttons = '';
		if ( $total_pages > 1 ) {
			for ( $index = 1; $index <= $total_pages; $index++ ) {
				$buttons .= sprintf(
					'<button class="%s" %s>
					<span aria-hidden="true">%s</span>
					<span class="screen-reader-text">%s</span>
					</button>',
					"$page_class page-number" . ( $index === $this->attributes['page'] ? ' current-page' : '' ),
					"data-page='$index' " . ( $index === $this->attributes['page'] ? 'disabled' : '' ),
					$index,
					sprintf( __( 'Page %s', 'brandy-blocks' ), $index )
				);
			}
		}

		return sprintf(
			'<div class="brandy-block-pagination">
			<div class="page-numbers brandy-block-pagination__list">
				%s %s %s
			</div>
		</div>',
			$previous_btn,
			$buttons,
			$next_btn
		);
	}

	public function ajax_render_list() {
		try {
			$nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( $_POST['nonce'] ) : '';

			if ( empty( $nonce ) ) {
				throw new Error( 'Null data!' );
			}

			if ( ! wp_verify_nonce( $nonce, self::RENDER_LIST_ACTION ) ) {
				throw new Error( 'Verify nonce failed!' );
			}

			$attributes = isset( $_POST['attributes'] ) ? Helpers::sanitize_array( $_POST['attributes'] ) : array();

			if ( empty( $attributes ) ) {
				throw new Error( 'Null data!' );
			}

			$this->attributes = $this->parse_attributes( $attributes );

			$query_result = $this->get_query_result();
			$products     = array_values( array_map( 'wc_get_product', $query_result ) );

			wp_send_json_success(
				array(
					'rendered' => $this->render_list( $products ),
				)
			);
		} catch ( \Error $error ) {
			wp_send_json_error(
				array(
					'message' => $error->getMessage(),
				)
			);
		}
	}

	public static function render_product_placeholder() {

		if ( ! function_exists( 'WC' ) ) {
			return '';
		}

		return sprintf(
			'<li class="brandy-block-product-placeholder" aria-hidden="true">
				<div class="brandy-block-product-placeholder__image">
					<img src="%s" alt="">
				</div>
				<div class="brandy-block-product-placeholder__title"></div>
				<div class="brandy-block-product-placeholder__price"></div>
				<div class="brandy-block-product-placeholder__add-to-cart">
					<button disabled></button>
				</div>
			</li>',
			\wc_placeholder_img_src()
		);
	}
}
