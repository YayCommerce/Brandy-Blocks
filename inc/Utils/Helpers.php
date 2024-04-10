<?php

namespace BrandyBlocks\Utils;

class Helpers {
	public static function sanitize_array( $var ) {
		if ( is_array( $var ) ) {
			return array_map( 'self::sanitize_array', $var );
		} else {
			return is_scalar( $var ) ? sanitize_text_field( $var ) : $var;
		}
	}

	public static function parse_bool( $value ) {
		if ( 'true' === $value ) {
			return true;
		}

		if ( 'false' === $value ) {
			return false;
		}

		return $value;
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
}
