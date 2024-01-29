<?php

namespace BrandyBlocks\Packages;

use BrandyBlocks\Traits\SingletonTrait;

class PackagesLoader {

	use SingletonTrait;

	protected function __construct() {
		$this->register_blocks();

		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_filter(
			'block_categories_all',
			function( $test ) {
				$test[] = array(
					'slug'  => 'brandy-blocks',
					'title' => 'Brandy',
					'icon'  => null,
				);
				return $test;
			}
		);

	}

	public function register_blocks() {
		$dir = new \DirectoryIterator( BRANDY_TEMPLATE_DIR . '/inc/Packages/build/blocks' );
		foreach ( $dir as $fileinfo ) {
			if ( $fileinfo->isDot() ) {
				continue;
			}
			$folder_name = $fileinfo->getFilename();

			if ( ! file_exists( BRANDY_TEMPLATE_DIR . '/inc/Packages/build/blocks/' . $folder_name ) ) {
				continue;
			}

			$class_name = 'BrandyBlocks\\Packages\\Blocks\\' . $folder_name;

			if ( ! class_exists( $class_name ) || ! is_callable( array( $class_name, 'get_instance' ) ) ) {
				continue;
			}

			$class_name::get_instance();

		}
	}

	public function enqueue_scripts() {
		wp_enqueue_style( 'brandy_block_editor_styles', BRANDY_TEMPLATE_URL . '/inc/Packages/dist/css/editor-style.css', array(), BRANDY_VERSION );
	}
}
