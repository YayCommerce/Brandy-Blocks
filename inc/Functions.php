<?php

if ( ! function_exists( 'is_brandy_exists' ) ) {
	function is_brandy_exists() {
		return defined( 'BRANDY_VERSION' );
	}
}
