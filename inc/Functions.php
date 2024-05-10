<?php

if ( ! function_exists( 'is_brandy_exists' ) ) {
	function is_brandy_exists() {
		return defined( 'BRANDY_VERSION' );
	}
}

if ( ! function_exists( 'brandy_blocks_get_content' ) ) {
	function brandy_blocks_get_content( $path, $args = array(), $root = BRANDY_BLOCKS_PLUGIN_PATH ) {

		if ( empty( $path ) ) {
			return '';
		}

		$path = $root . $path;

		if ( ! file_exists( $path ) ) {
			return '';
		}

		ob_start();
		include $path;
		$html = ob_get_contents();
		ob_end_clean();
		return wp_kses_post( $html );
	}
}

if ( ! function_exists( 'brandy_blocks_get_post_placeholder_thumbnail_url' ) ) {
	function brandy_blocks_get_post_placeholder_thumbnail_url() {
		if ( function_exists( 'brandy_get_post_placeholder_thumbnail_url' ) ) {
			return \brandy_get_post_placeholder_thumbnail_url();
		}
		return BRANDY_BLOCKS_PLUGIN_URL . '/assets/images/default-placeholder.png';
	}
}
if ( ! function_exists( 'brandy_blocks_get_post_placeholder_thumbnail' ) ) {
	function brandy_blocks_get_post_placeholder_thumbnail() {

		if ( function_exists( 'brandy_get_post_placeholder_thumbnail' ) ) {
			return \brandy_get_post_placeholder_thumbnail();
		}

		$src = brandy_blocks_get_post_placeholder_thumbnail_url();
		return sprintf( '<img src="%s" alt="Thumbnail placeholder" />', $src );
	}
}
if ( ! function_exists( 'brandy_blocks_the_post_thumbnail' ) ) {
	function brandy_blocks_the_post_thumbnail( $post = null ) {

		if ( function_exists( 'brandy_the_post_thumbnail' ) ) {
			\brandy_the_post_thumbnail( $post );
			return;
		}

		$thumbnail = get_the_post_thumbnail( $post );
		if ( empty( $thumbnail ) ) {
			echo wp_kses_post( brandy_blocks_get_post_placeholder_thumbnail() );
		} else {
			echo wp_kses_post( $thumbnail );
		}
	}
}

if ( ! function_exists( 'brandy_blocks_get_post_thumbnail_url' ) ) {
	function brandy_blocks_get_post_thumbnail_url( $post = null ) {

		$thumbnail_url = get_the_post_thumbnail_url( $post );

		if ( empty( $thumbnail_url ) ) {
			return brandy_blocks_get_post_placeholder_thumbnail_url();
		} else {
			return $thumbnail_url;
		}
	}
}
