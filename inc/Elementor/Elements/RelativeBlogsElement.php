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
		return 'eicon-post-list';
	}

	public function get_categories() {
		return array( 'basic' );
	}

	public function get_keywords() {
		return array( __( 'Relative Blogs', 'brandy-blocks' ), __( 'Relative Blogs element', 'brandy-blocks' ) );
	}

	protected function _register_controls() {

		$this->start_controls_section(
			'content_section',
			array(
				'label' => esc_html__( 'Post Query', 'brandy-blocks' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			)
		);

		$this->add_control(
			'posts_related',
			array(
				'label'   => esc_html__( 'Related posts by', 'brandy-blocks' ),
				'type'    => \Elementor\Controls_Manager::SELECT,
				'default' => 'categories',
				'options' => array(
					'categories' => esc_html__( 'Categories', 'brandy-blocks' ),
					'tag'        => esc_html__( 'Tags', 'brandy-blocks' ),
				),

			)
		);

		$this->add_control(
			'posts_order_by',
			array(
				'label'   => esc_html__( 'Order by', 'brandy-blocks' ),
				'type'    => \Elementor\Controls_Manager::SELECT,
				'default' => 'title',
				'options' => array(
					'date'          => esc_html__( 'Date', 'brandy-blocks' ),
					'title'         => esc_html__( 'Title', 'brandy-blocks' ),
					'menu_order'    => esc_html__( 'Post Order', 'brandy-blocks' ),
					'rand'          => esc_html__( 'Random', 'brandy-blocks' ),
					'comment_count' => esc_html__( 'Comment Counts', 'brandy-blocks' ),
				),

			)
		);

		$this->add_control(
			'posts_order',
			array(
				'label'   => esc_html__( 'Order', 'brandy-blocks' ),
				'type'    => \Elementor\Controls_Manager::SELECT,
				'default' => 'asc',
				'options' => array(
					'asc'  => esc_html__( 'Ascending', 'brandy-blocks' ),
					'desc' => esc_html__( 'Descending', 'brandy-blocks' ),
				),

			)
		);

		$this->end_controls_section();
	}

	protected function render() {
		$this->settings = $this->get_settings_for_display();
		$shortcode      = sprintf( '[brandy_relative_blogs related="%s" order_by="%s" order="%s"]', $this->settings['posts_related'] ?? '', $this->settings['posts_order_by'] ?? '', $this->settings['posts_order'] ?? '' );

		?>
		<?php echo wp_kses_post( do_shortcode( $shortcode ) ); ?>
		<?php
	}
}
