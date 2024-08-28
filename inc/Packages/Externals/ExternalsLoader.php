<?php

namespace BrandyBlocks\Packages\Externals;

use BrandyBlocks\Traits\SingletonTrait;

class ExternalsLoader {
	use SingletonTrait;

	protected function __construct() {
		add_action(
			'enqueue_block_editor_assets',
			function() {
				wp_enqueue_script( 'brandy-blocks-external-settings', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Packages/build/external-settings/index.js', array( 'wp-edit-post' ) );
			}
		);
	}
}

ExternalsLoader::get_instance();
