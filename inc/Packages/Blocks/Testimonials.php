<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;

class Testimonials extends AbstractBlock {

	use SingletonTrait;

	public $name = 'Testimonials';

	protected function init_hooks() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	public function enqueue_scripts() {
		wp_enqueue_script( 'brandy-testimonials-js', BRANDY_TEMPLATE_URL . '/inc/Packages/dist/js/testimonials.js', array( 'jquery' ), BRANDY_VERSION, true );
	}

}
