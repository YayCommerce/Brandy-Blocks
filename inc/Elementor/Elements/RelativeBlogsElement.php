<?php

namespace BrandyBlocks\Elementor\Elements;

class RelativeBlogsElement extends \Elementor\Widget_Base {
	protected $settings = array();

	public function get_name() {
		return 'relative-blogs-element';
	}

	public function get_title() {
		return esc_html__( 'Relative Blogs', 'brandy-blocks' );
	}

	public function get_icon() {
		return 'eicon-products';
	}

	public function get_categories() {
		return array( 'brandy-blocks' );
	}

	public function get_keywords() {
		return array( __( 'Relative Blogs', 'brandy-blocks' ), __( 'Relative Blogs element', 'brandy-blocks' ) );
	}

	protected function _register_controls() {
		$this->start_controls_section(
			'section_title',
			array(
				'label' => esc_html__( 'Title', 'brandy-blocks' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			)
		);

		$this->add_control(
			'title',
			array(
				'label'   => esc_html__( 'Title', 'brandy-blocks' ),
				'type'    => \Elementor\Controls_Manager::TEXTAREA,
				'default' => esc_html__( 'Brandy', 'brandy-blocks' ),
			)
		);

		$this->end_controls_section();
	}

	protected function render() {
		$this->settings = $this->get_settings_for_display();
		?>

		<p> Hello <?php echo esc_html( $settings['title'] ); ?> </p>

		<?php
	}
}
