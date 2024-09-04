<?php

namespace BrandyBlocks\Packages\Blocks;

use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;

class FormSubmit extends AbstractBlock {

	use SingletonTrait;

	public $name = 'FormSubmit';

	protected function get_block_attributes() {
		return array(
			'render_callback' => array( $this, 'render' ),
		);
	}

	public function render( $attributes, $content, $block ) {

		$class = 'wp-block-brandy-form-submit wp-element-button';
		if ( ! empty( $attributes['className'] ) ) {
			$class .= ' ' . $attributes['className'];
		}

		$button_attributes = array(
			'class' => $class,
			'name'  => '',
		);

		if ( isset( $block->context['formAction'] ) && 'login' === $block->context['formAction'] ) {
			$button_attributes['name'] = 'login';
		}
		if ( isset( $block->context['formAction'] ) && 'reset_password' === $block->context['formAction'] ) {
			$button_attributes['name'] = 'Reset password';
		}
		if ( isset( $block->context['formAction'] ) && 'custom' === $block->context['formAction'] ) {
			$button_attributes['name'] = 'custom_action';
		}

		$html = '';
		ob_start(); ?>
		<button 
			class="<?php echo esc_attr( $button_attributes['class'] ); ?>" 
			name="<?php echo esc_attr( $button_attributes['name'] ); ?>" >
			<?php echo esc_html( $attributes['text'] ?? 'Submit' ); ?>
		</button>
		<?php
		$html = ob_get_contents();
		ob_end_clean();
		return $html;
	}

}
