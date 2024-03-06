<?php

namespace BrandyBlocks\Core;

class ProductController {

	protected $product = null;

	public function __construct( $product ) {
		$this->product = $product;
	}

	public function get_template_image() {
		$attr = array(
			'alt' => '',
		);

		if ( $this->product->get_image_id() ) {
			$image_alt = get_post_meta( $this->product->get_image_id(), '_wp_attachment_image_alt', true );
			$attr      = array(
				'alt' => ( $image_alt ? $image_alt : $this->product->get_name() ),
			);
		}

		return '<a class="brandy-block-product__image" href="' . $this->product->get_permalink() . '">' . $this->product->get_image( 'woocommerce_thumbnail', $attr ) . '</a>';
	}

	public function get_template_title() {
		return sprintf(
			'<h4 class="brandy-block-product__title %1$s"><a href="%2$s">%3$s</a></h4>',
			apply_filters( 'brandy_block_product_title_classes', '' ),
			$this->product->get_permalink(),
			esc_html( $this->product->get_title() )
		);
	}

	public function get_template_category() {

		$html = '';

		$terms = get_the_terms( $this->product->get_id(), 'product_cat' );

		$current_term = $terms[0];

		if ( ! empty( $current_term ) ) :
			$term_name = $current_term->name;
			$term_link = get_term_link( $current_term );
			$html      = sprintf(
				'<a class="brandy-block-product__category %1$s" href="%2$s">%3$s</a>',
				esc_attr( apply_filters( 'brandy_block_product_category_classes', '' ) ),
				esc_url( $term_link ),
				esc_html( $term_name )
			);
		endif;

		return $html;
	}

	public function get_template_sale_flash() {
		if ( ! $this->product->is_on_sale() ) {
			return '';
		}

		return sprintf( '<span class="brandy-block-product__sale-flash onsale">%s</span>', esc_html__( 'Sale!', 'woocommerce' ) );
	}

	public function get_template_pricing() {
		return sprintf(
			'<div class="brandy-block-product__price price">%s</div>',
			wp_kses_post( $this->product->get_price_html() )
		);
	}

	public function get_template_button() {

		$attributes = array(
			'aria-label'       => $this->product->add_to_cart_description(),
			'data-quantity'    => '1',
			'data-product_id'  => $this->product->get_id(),
			'data-product_sku' => $this->product->get_sku(),
			'data-price'       => wc_get_price_to_display( $this->product ),
			'rel'              => 'nofollow',
			'class'            => 'brandy-block-product__add-to-cart add_to_cart_button brandy-btn',
		);

		if (
			$this->product->supports( 'ajax_add_to_cart' ) &&
			$this->product->is_purchasable() &&
			( $this->product->is_in_stock() || $this->product->backorders_allowed() )
		) {
			$attributes['class'] .= ' ajax_add_to_cart';
		}

		$add_to_cart_btn = apply_filters(
			'brandy_block_product_add_to_cart',
			sprintf(
				'<a href="%s" %s>%s</span></a>',
				esc_url( $this->product->add_to_cart_url() ),
				wc_implode_html_attributes( $attributes ),
				esc_html( $this->product->add_to_cart_text() )
			),
			$this->product,
			$attributes
		);

		$product_added_to_cart_btn = apply_filters( 'brandy_block_product_added_to_cart', '', $this->product );

		return $add_to_cart_btn . $product_added_to_cart_btn;

	}

	public function get_template_rating() {
		$rating_count = $this->product->get_rating_count();
		$average      = $this->product->get_average_rating();

		if ( $rating_count > 0 ) {
			return sprintf(
				'<div class="brandy-block-product__rating">%s</div>',
				wc_get_rating_html( $average, $rating_count ) // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			);
		}
		return '';
	}

}
