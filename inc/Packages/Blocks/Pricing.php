<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;

class Pricing extends AbstractBlock {

	use SingletonTrait;

	public $name = 'Pricing';

	protected function init_hooks() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

		global $pagenow;
		if ( 'post.php' === $pagenow || 'page.php' === $pagenow ) {
			add_action( 'enqueue_block_assets', array( $this, 'enqueue_scripts' ) );
		}
	}

	public function enqueue_scripts() {
		wp_enqueue_script( 'brandy-pricing-js', BRANDY_BLOCKS_PLUGIN_URL . '/inc/Packages/dist/js/pricing.js', array( 'jquery' ), BRANDY_BLOCKS_VERSION, true );
	}
}
