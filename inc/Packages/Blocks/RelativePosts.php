<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Core\ProductController;
use BrandyBlocks\Core\ProductQuery;
use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;
use BrandyBlocks\Utils\Helpers;
use Error;

class RelativePosts extends AbstractBlock {

	use SingletonTrait;

	public $name = 'RelativePosts';

	protected $attributes = array();

	protected function init_hooks() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

		global $pagenow;
		if ( 'post.php' === $pagenow || 'page.php' === $pagenow ) {
			add_action( 'enqueue_block_assets', array( $this, 'enqueue_scripts' ) );
		}
	}

	public function enqueue_scripts() {
		wp_enqueue_script( 'brandy-relative-posts-js', BRANDY_BLOCKS_PLUGIN_URL . '/inc/Packages/dist/js/relative-posts.js', array( 'jquery' ), BRANDY_BLOCKS_VERSION, true );
	}

	protected function get_block_attributes() {
		return array(
			'render_callback' => array( $this, 'render' ),
		);
	}

	public function render( $attributes = array(), $content = '', $block = null ) {
		$posts_query = $attributes['posts_query'] ?? array();
		$shortcode   = sprintf( '[brandy_relative_blogs related="%s" order_by="%s" order="%s"]', $posts_query['related'] ?? '', $posts_query['order_by'] ?? '', $posts_query['order'] ?? '' );
		return do_shortcode( $shortcode );
	}

}
