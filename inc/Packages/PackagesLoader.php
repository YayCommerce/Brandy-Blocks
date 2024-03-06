<?php

namespace BrandyBlocks\Packages;

use BrandyBlocks\Packages\Blocks\AllProducts;
use BrandyBlocks\Traits\SingletonTrait;

class PackagesLoader {

	use SingletonTrait;

	protected function __construct() {
		$this->register_blocks();
		global $pagenow;
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		if ( 'post.php' === $pagenow || 'page.php' === $pagenow ) {
			add_action( 'enqueue_block_assets', array( $this, 'enqueue_scripts' ) );
		}
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
		$dir = new \DirectoryIterator( BRANDY_BLOCKS_PLUGIN_PATH . 'inc/Packages/build/blocks' );
		foreach ( $dir as $fileinfo ) {
			if ( $fileinfo->isDot() ) {
				continue;
			}
			$folder_name = $fileinfo->getFilename();

			if ( ! file_exists( BRANDY_BLOCKS_PLUGIN_PATH . 'inc/Packages/build/blocks/' . $folder_name ) ) {
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
		wp_enqueue_script( 'brandy_blocks_script', BRANDY_BLOCKS_PLUGIN_URL . '/inc/Packages/dist/js/script.js', array( 'jquery' ), BRANDY_BLOCKS_VERSION, true );
		wp_enqueue_style( 'brandy_block_editor_styles', BRANDY_BLOCKS_PLUGIN_URL . '/inc/Packages/dist/css/editor-style.css', array(), BRANDY_BLOCKS_VERSION );
		wp_localize_script(
			'brandy_blocks_script',
			'brandyBlocks',
			array(
				'ajax'   => array(
					'path' => admin_url( 'admin-ajax.php' ),
				),
				'blocks' => array(
					'allProducts' => array(
						'nonces'    => array(
							'render_list' => wp_create_nonce( AllProducts::RENDER_LIST_ACTION ),
						),
						'templates' => array(
							'product_placeholder' => AllProducts::render_product_placeholder(),
						),
					),
				),
			)
		);

	}
}
