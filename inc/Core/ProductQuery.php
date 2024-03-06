<?php

namespace BrandyBlocks\Core;

use BrandyBlocks\Traits\SingletonTrait;
use Automattic\WooCommerce\Blocks\Utils\BlocksWpQuery;

class ProductQuery {

	use SingletonTrait;

	protected $meta_query;

	protected $attributes = array();

	protected function parse_query_args() {

		$meta_query = \WC()->query->get_meta_query();

		$order_by = isset( $this->attributes['order_by'] ) ? $this->attributes['order_by'] : 'latest';
		$orderby  = '';
		$order    = '';
		$meta_key = '';

		if ( 'latest' === $order_by ) {
			$orderby = 'date';
			$order   = 'DESC';
		}

		if ( 'popularity' === $order_by ) {
			$meta_key = 'total_sales';
			$orderby  = 'meta_value_num';
		}

		if ( 'rating' === $order_by ) {
			$meta_key = '_wc_average_rating';
			$orderby  = 'meta_value_num';
		}

		if ( 'lowest' === $order_by ) {
			$meta_key = '_price';
			$orderby  = 'meta_value_num';
			$order    = 'asc';
		}

		if ( 'highest' === $order_by ) {
			$meta_key = '_price';
			$orderby  = 'meta_value_num';
			$order    = 'desc';
		}

		return array(
			'post_type'           => 'product',
			'post_status'         => 'publish',
			'fields'              => 'ids',
			'ignore_sticky_posts' => true,
			'no_found_rows'       => false,
			'orderby'             => $orderby,
			'order'               => $order,
			'meta_query'          => $meta_query, // phpcs:ignore WordPress.DB.SlowDBQuery
			'tax_query'           => array(), // phpcs:ignore WordPress.DB.SlowDBQuery
			'meta_key'            => $meta_key,
			'posts_per_page'      => $this->get_products_limit(),
			'offset'              => $this->get_offset(),
		);
	}

	protected function get_offset() {
		$current_page = isset( $this->attributes['page'] ) ? $this->attributes['page'] : 1;
		$current_page = max( 1, $current_page );
		$offset       = ( $current_page - 1 ) * ( $this->get_products_limit() );
		return $offset;
	}

	protected function get_products_limit() {

		if ( false === $this->attributes['pagination'] ) {
			return -1;
		}

		if ( ! isset( $this->attributes['number_products'] ) ) {
			return 9;
		}
		return intval( $this->attributes['number_products'] );
	}

	public function query( $attributes ) {

		$this->attributes = $attributes;

		$query_args = $this->parse_query_args();

		$query = new BlocksWpQuery( $query_args );

		$results = $query->get_posts();

		return $results;
	}

	protected function prime_product_variations( $product_ids ) {
		$cache_group       = 'product_variation_meta_data';
		$prime_product_ids = $this->get_non_cached_ids( wp_parse_id_list( $product_ids ), $cache_group );

		if ( ! $prime_product_ids ) {
			return;
		}

		global $wpdb;

		// phpcs:disable WordPress.DB.PreparedSQL.NotPrepared
		$product_variations      = $wpdb->get_results( "SELECT ID as variation_id, post_parent as product_id from {$wpdb->posts} WHERE post_parent IN ( " . implode( ',', $prime_product_ids ) . ' )', ARRAY_A );
		$prime_variation_ids     = array_column( $product_variations, 'variation_id' );
		$variation_ids_by_parent = array_column( $product_variations, 'product_id', 'variation_id' );

		if ( empty( $prime_variation_ids ) ) {
			return;
		}

		$all_variation_meta_data = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT post_id as variation_id, meta_key as attribute_key, meta_value as attribute_value FROM {$wpdb->postmeta} WHERE post_id IN (" . implode( ',', array_map( 'esc_sql', $prime_variation_ids ) ) . ') AND meta_key LIKE %s',
				$wpdb->esc_like( 'attribute_' ) . '%'
			)
		);
		// phpcs:enable
		// Prepare the data to cache by indexing by the parent product.
		$primed_data = array_reduce(
			$all_variation_meta_data,
			function( $values, $data ) use ( $variation_ids_by_parent ) {
				$values[ $variation_ids_by_parent[ $data->variation_id ] ?? 0 ][] = $data;
				return $values;
			},
			array_fill_keys( $prime_product_ids, array() )
		);

		// Cache everything.
		foreach ( $primed_data as $product_id => $variation_meta_data ) {
			wp_cache_set(
				$product_id,
				array(
					'last_modified' => get_the_modified_date( 'U', $product_id ),
					'data'          => $variation_meta_data,
				),
				$cache_group
			);
		}
	}

	protected function get_non_cached_ids( $product_ids, $cache_key ) {
		$non_cached_ids = array();
		$cache_values   = wp_cache_get_multiple( $product_ids, $cache_key );

		foreach ( $cache_values as $id => $value ) {
			if ( ! $value ) {
				$non_cached_ids[] = (int) $id;
			}
		}

		return $non_cached_ids;
	}

}
