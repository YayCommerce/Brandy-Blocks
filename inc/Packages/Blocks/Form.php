<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;

class Form extends AbstractBlock {

	use SingletonTrait;

	public $name = 'Form';

	protected function get_block_attributes() {
		return array(
			'render_callback' => array( $this, 'render' ),
		);
	}

	public function init_hooks() {
		add_action(
			'woocommerce_login_failed',
			function() {
				$_GET['wc_login_failed'] = true;
			}
		);
	}

	public function render( $attributes, $content, $block ) {

		$class = 'wp-block-brandy-form';
		if ( ! empty( $attributes['className'] ) ) {
			$class .= ' ' . $attributes['className'];
		}

		$html = '';
		ob_start(); ?>
		<form class="<?php echo esc_attr( $class ); ?>" method="post">
			<?php
			if ( ! empty( $_GET['wc_login_failed'] ) ) {
				echo esc_html( $attributes['failedMessage'] ?? '' );
			}
			?>
			<?php
			foreach ( $block->inner_blocks as $inner_block ) {
				echo $inner_block->render(); //XSS: ignore
			}
			?>
			<?php
			if ( 'login' === $attributes['action'] ) {
				wp_nonce_field( 'woocommerce-login', 'woocommerce-login-nonce' );
			}
			?>
			<?php
			if ( ! empty( $attributes['successUrl'] ) ) {
				echo '<input type="hidden" name="redirect" value="' . esc_url( $attributes['successUrl'] ) . '" />';
			}
			if ( ! empty( $attributes['failedUrl'] ) ) {
				echo '<input type="hidden" name="fallbackRedirect" value="' . esc_url( $attributes['failedUrl'] ) . '" />';
			}
			?>
		</form>
		<?php
		$html = ob_get_contents();
		ob_end_clean();
		return $html;
	}

}
