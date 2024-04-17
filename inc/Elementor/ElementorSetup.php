<?php

namespace BrandyBlocks\Elementor;

use BrandyBlocks\Elementor\Elements\TestElement;
use BrandyBlocks\Elementor\Elements\RelativeBlogsElement;
use BrandyBlocks\Traits\SingletonTrait;

class ElementorSetup {
	use SingletonTrait;

	protected function __construct() {
		add_action( 'elementor/widgets/register', array( $this, 'register_elements' ) );

	}

	public function register_elements( $widgets_manager ) {
		$widgets_manager->register( new TestElement() );
		$widgets_manager->register( new RelativeBlogsElement() );
	}
}
