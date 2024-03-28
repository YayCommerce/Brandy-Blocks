<?php

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
