<?php

namespace BrandyBlocks\Elementor\Elements;

class TestElement extends \Elementor\Widget_Base {

	public function get_name() {
		return 'test_element';
	}

	public function get_title() {
		return esc_html__( 'Brandy element', 'brandy-blocks' );
	}

	public function get_icon() {
		return 'eicon-code';
	}

	public function get_categories() {
		return array( 'basic' );
	}

	public function get_keywords() {
		return array( 'hello', 'world' );
	}

	protected function register_controls() {
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

		$settings = $this->get_settings_for_display();

		?>

		<p> Hello <?php echo $settings['title']; ?> </p>

		<?php
	}
}
