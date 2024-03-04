<?php

namespace BrandyBlocks\Core;

use BrandyBlocks\Traits\SingletonTrait;
use Automattic\WooCommerce\Blocks\Utils\BlocksWpQuery;

class ProductQuery {

    use SingletonTrait;

    protected $meta_query;

    protected $attributes = [];

    protected function parse_query_args() {

        $meta_query = \WC()->query->get_meta_query();

        return array(
			'post_type'           => 'product',
			'post_status'         => 'publish',
			'fields'              => 'ids',
			'ignore_sticky_posts' => true,
			'no_found_rows'       => false,
			'orderby'             => '',
			'order'               => '',
			'meta_query'          => $meta_query, // phpcs:ignore WordPress.DB.SlowDBQuery
			'tax_query'           => array(), // phpcs:ignore WordPress.DB.SlowDBQuery
			'posts_per_page'      => $this->get_products_limit(),
		);
    }

    protected function get_products_limit() {
		if ( isset( $this->attributes['rows'], $this->attributes['columns'] ) && ! empty( $this->attributes['rows'] ) ) {
			$this->attributes['limit'] = intval( $this->attributes['columns'] ) * intval( $this->attributes['rows'] );
		}
		return intval( $this->attributes['limit'] );
	}

    public function query( $attributes ) {

        $this->attributes = $attributes;

        $query_args = $this->parse_query_args();

        $is_cacheable      = (bool) apply_filters( 'woocommerce_blocks_product_grid_is_cacheable', true, $query_args );

		$transient_version = \WC_Cache_Helper::get_transient_version( 'product_query' );

		$query   = new BlocksWpQuery( $query_args );
		$results = wp_parse_id_list( $is_cacheable ? $query->get_cached_posts( $transient_version ) : $query->get_posts() );

		// Remove ordering query arguments which may have been added by get_catalog_ordering_args.
		WC()->query->remove_ordering_args();

		// Prime caches to reduce future queries. Note _prime_post_caches is private--we could replace this with our own
		// query if it becomes unavailable.
		if ( is_callable( '_prime_post_caches' ) ) {
			_prime_post_caches( $results );
		}

		$this->prime_product_variations( $results );

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
			array_fill_keys( $prime_product_ids, [] )
		);

		// Cache everything.
		foreach ( $primed_data as $product_id => $variation_meta_data ) {
			wp_cache_set(
				$product_id,
				[
					'last_modified' => get_the_modified_date( 'U', $product_id ),
					'data'          => $variation_meta_data,
				],
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