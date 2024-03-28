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

	public static function brandy_get_relative_posts( $post_id, $related = 'categories', $order_by = 'title', $order_type = 'asc' ) {
		$term_ids          = array();
		$current_post_type = get_post_type( $post_id );

		$terms = ( 'tags' === $related ) ? get_the_tags( $post_id ) : get_the_category( $post_id );

		if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
			$term_ids = wp_list_pluck( $terms, 'term_id' );
		}

		$query_args = array(
			'update_post_meta_cache' => false,
			'posts_per_page'         => 3,
			'no_found_rows'          => true,
			'post_status'            => 'publish',
			'post_type'              => $current_post_type,
			'orderby'                => $order_by,
			'fields'                 => 'ids',
			'order'                  => $order_type,
		);

		$taxonomy_key = ( 'tags' === $related ) ? 'tag__in' : 'category__in';

		$query_args[ $taxonomy_key ] = $term_ids;

		$query_args['post__not_in'] = array( $post_id );

		$query_posts = new \WP_Query( $query_args );

		return $query_posts->get_posts();
	}
}
