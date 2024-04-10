<?php

namespace BrandyBlocks\Utils;

class ProductHelpers {

	public static function parse_bool( $value ) {
		if ( 'true' === $value ) {
			return true;
		}

		if ( 'false' === $value ) {
			return false;
		}

		return $value;
	}

	public static function product_content_settings() {
		return array(
			'show_image'      => true,
			'show_category'   => true,
			'show_title'      => true,
			'show_price'      => true,
			'show_rating'     => true,
			'show_ad_to_cart' => true,
			'show_meta'       => true,
			'show_short_desc' => true,
			'show_tag'        => true,
		);
	}

	public static function get_allow_html() {
		$rules = array(
			'div'    => array(
				'id'    => array(),
				'class' => array(),
			),
			'p'      => array(
				'id'    => array(),
				'class' => array(),
			),
			'select' => array(
				'id'    => array(),
				'class' => array(),
				'name'  => array(),
			),
			'option' => array(
				'id'       => array(),
				'class'    => array(),
				'value'    => array(),
				'selected' => array(),
				'name'     => array(),
			),
		);
		return $rules;
	}


	public static function get_random_feature_product( $type = 'ID' ) {
		$args = array(
			'post_type'      => 'product',
			'posts_per_page' => -1,
			'post__in'       => wc_get_featured_product_ids(),
		);

		$query = new \WP_Query( $args );
		if ( 'ID' === $type ) {
			$random_product_id = 0;
			if ( $query->have_posts() ) {
				$featured_product_ids = wp_list_pluck( $query->posts, 'ID' );
				shuffle( $featured_product_ids );
				$random_product_id = $featured_product_ids[0];
			}
			return $random_product_id;
		} else {
			$data = array();
			if ( $query->have_posts() ) {
				foreach ( $query->posts as $key => $post ) {
					if ( $key <= 20 ) {
						$data[ $post->ID ] = $post->post_title;
					}
				}
			}
			return $data;
		}

	}

	public static function feature_product_category_names( $product_id, $separator = ', ', $final_separator = ' and ' ) {
		$categories = wp_get_post_terms( $product_id, 'product_cat' );
		if ( ! empty( $categories ) && ! is_wp_error( $categories ) ) {
			$category_names = array();
			foreach ( $categories as $category ) {
				$category_names[] = '<a href="' . get_term_link( $category ) . '">' . $category->name . '</a>';
			}
			if ( count( $category_names ) > 2 ) {
				$last_category_name = array_pop( $category_names );
				return implode( $separator, $category_names ) . $final_separator . $last_category_name;
			} else {
				return implode( $final_separator, $category_names );
			}
		}
		return '';
	}

	public static function feature_product_image( $product_controller, $content_settings ) {
		return sprintf(
			'<div class="brandy-feature-product-image">%s</div>',
			self::parse_bool( $content_settings['show_image'] ) ? $product_controller->get_template_image() : ''
		);
	}

	public static function feature_product_price( $product, $content_settings ) {
		$product_id   = $product->get_id();
		$rating       = get_post_meta( $product_id, '_wc_average_rating', true );
		$review_count = get_post_meta( $product_id, '_wc_review_count', true );
		$rating_html  = '';
		if ( $rating > 0 ) {
			$rating_html .= '<span class="brandy-feature-product-length-area">|</span>';
			$rating_html .= '<div class="brandy-feature-product-rating">';
			$rating_html .= '<span class="brandy-feature-product-star">';
			$rating_html .= '<span style="width:' . ( ( $rating / 5 ) * 100 ) . '%">';
			$rating_html .= '</span></span>';
			$rating_html .= '</div>';
			$rating_html .= '<span class="brandy-feature-product-count-review-text">' . $review_count . ' reviews</span>';
		}

		return sprintf(
			'<div class="brandy-feature-product-price-area-wrapper">%s %s</div>',
			self::parse_bool( $content_settings['show_price'] ) ? $product->get_price_html() : '',
			self::parse_bool( $content_settings['show_rating'] ) ? $rating_html : ''
		);
	}

	public static function feature_product_add_to_cart( $product_id ) {
		global $product;

		$product = wc_get_product( $product_id );

		ob_start();
		do_action( 'woocommerce_' . $product->get_type() . '_add_to_cart' );
		$add_to_cart_form = ob_get_contents();
		ob_end_clean();

		return $add_to_cart_form;
	}

	public static function feature_product_meta( $product, $content_settings ) {
		$attributes         = $product->get_attributes();
		$product_attributes = '';
		if ( ! empty( $attributes ) ) {
			$product_attributes .= '<div class="product-attributes">';
			foreach ( $attributes as $attribute ) {
				$terms                    = get_terms(
					array(
						'taxonomy'   => $attribute->get_data()['name'],
						'hide_empty' => false,
					)
				);
				$value_product_attributes = '';
				if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
					$attribute_values = array();
					foreach ( $terms as $term ) {
						$attribute_values[] = $term->name;
					}
					$value_product_attributes = implode( ', ', $attribute_values );
				}
				$product_attributes .= '<p class="brandy-feature-product-attribute-container"><label class="brandy-feature-attribute-label-text">' . wc_attribute_label( $attribute->get_name() ) . '</label>:<span class="brandy-feature-attribute-value"> ' . esc_html( $value_product_attributes ) . '</span></p>';
			}
			$product_attributes .= '</div>';
		}

		return sprintf(
			'<div class="brandy-feature-product-data-container">%s %s %s</div>',
			self::parse_bool( $content_settings['show_meta'] ) ? '<p class="brandy-feature-product-metadata-info">
			<label class="brandy-feature-product-sku-label-text">' . esc_html__( 'SKU', 'woocommerce' ) . '</label>: <span class="brandy-feature-product-sku-value">' . $product->get_sku() . '</span> -  <span class="brandy-feature-product-instock-text">In stock</span>
		</p>' : '',
			$product_attributes,
			self::parse_bool( $content_settings['show_short_desc'] ) ? '<div class="brandy-feature-product-description-container">' . $product->get_short_description() . '</div>' : '',
		);

	}

	public static function feature_product_tags( $product ) {
		$html         = '';
		$product_tags = wp_get_post_terms( $product->get_id(), 'product_tag' );
		if ( ! empty( $product_tags ) && ! is_wp_error( $product_tags ) ) {
			$html = '<div class="brandy-feature-product-tag-container">';
			foreach ( $product_tags as $tag ) {
				$html .= '<span class="brandy-product-tag-text">' . esc_html( $tag->name ) . '</span>';
			}
			$html .= '</div>';
		}
		return $html;

	}
}
