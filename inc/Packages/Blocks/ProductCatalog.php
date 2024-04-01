<?php

namespace BrandyBlocks\Packages\Blocks;
use BrandyBlocks\Core\ProductController;
use BrandyBlocks\Packages\Abstracts\AbstractBlock;
use BrandyBlocks\Traits\SingletonTrait;


class ProductCatalog extends AbstractBlock {

	use SingletonTrait;

	public $name = 'ProductCatalog';

	public const DEFAULT_ATTRIBUTES = array(
		'banner_settings' => array(
            "primary"=>array(
                "mediaID"=> null,
                "imageURL" => "https://thien.ninjateam.org/wp-content/uploads/2024/01/fashion-banner-img.png",
                "title" => "Our top stars",
                "subtitle" => "Discover and shop our most popular plants, pots and accessories"
            ),
            "secondary"=> array(
                "mediaID"=> null,
                "imageURL" => "https://thien.ninjateam.org/wp-content/uploads/2024/01/fashion-banner-img.png",
                "title" => "Love Your Space",
                "subtitle" => "Get 25% off everything"
            )
        ),
		'content_settings'         => array(
            "showImage"=> true,
            "showCategory" => true,
            "showTitle"=>true,
            "showPrice"=>true,
            "showRating"=> true,
            "showAddToCart"=> true
		),
        'product_category_settings' => array(
            "selectedCategories" =>array(),
            "searchTerm" => ""
        )
		
	);

	protected $attributes = array();

	protected function __construct() {

		if ( ! function_exists( 'WC' ) ) {
			return;
		}

		parent::__construct();

	}

	protected function init_hooks() {

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

		global $pagenow;
		if ( 'post.php' === $pagenow || 'page.php' === $pagenow ) {
			add_action( 'enqueue_block_assets', array( $this, 'enqueue_scripts' ) );
		}
	}

    protected function get_block_attributes() {
		return array(
			'render_callback' => array( $this, 'render' ),
		);
	}

    public function render( $attributes = array(), $content = '', $block = null ) {
		$this->attributes = $this->parse_attributes_from_block_attributes( $attributes );
		$products     = $this->get_query_result( $this->attributes );
		$content          = sprintf(
			'<div class="brandy-block-product-catalog" data-settings="%s">%s%s%s</div>',
			esc_attr( wp_json_encode( $this->attributes ) ),
            self::render_banner('primary' ),
			$this->render_list( $products ),
            self::render_banner('secondary' ),
		);
		return $content;
	}

	public function enqueue_scripts() {
        if ( ! is_admin() ) {
            wp_enqueue_script( 'brandy-product-catalog-js', BRANDY_BLOCKS_PLUGIN_URL . '/inc/Packages/dist/js/product-catalog.js', array( 'jquery' ), BRANDY_BLOCKS_VERSION, true );
        }
	}

	public function get_query_result( $attributes ) {
        $category_ids = isset($attributes['product_category_settings']['selectedCategories']) && !empty( $attributes['product_category_settings']['selectedCategories'] ) ? $attributes['product_category_settings']['selectedCategories'] : [];
        
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => 5,
            'orderby' => 'date',
            'order' => 'DESC',
        );

        if($category_ids) {
            
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'product_cat',
                    'field' => 'term_id',
                    'terms' => $category_ids,
                    'operator' => 'IN',
                )
            );
        }
        
        $result = new \WP_Query( $args );
        $result     = array_values( array_map( 'wc_get_product', $result->posts ) );
		return $result;
	}

    protected function render_banner( $key = 'primary' ) {
        $banner = $this->attributes['banner_settings'][$key];
        $imageURL = isset($banner['imageURL'] ) && !empty($banner['imageURL']) ? $banner['imageURL'] : '';
        $title = !empty($banner['title']) ? $banner['title'] : self::DEFAULT_ATTRIBUTES['banner_settings'][$key]['title'];
        $subTitle = !empty($banner['subtitle']) ? $banner['subtitle'] : self::DEFAULT_ATTRIBUTES['banner_settings'][$key]['subtitle'];

        return sprintf( '<div class="product brandy-banner-wrapper %1$s" id="%2$s">
                <div class="brandy-product-catalog-banner">
                    <img src="%3$s" alt="%4$s">
                    <div class="banner-content">
                    <h2>%4$s</h2>
                    <p>%5$s</p>
                    </div>
                    <p><a href="#" class="brandy-button-banner">Shop Now</a></p>
            </div>
        </div>', esc_attr('brandy-'.$key.'-banner-wrapper'), esc_attr('brandy_'.$key.'_banner_'.md5(uniqid())), esc_url($imageURL), esc_html($title), esc_html($subTitle) );
    }

	public function render_list( $products ) {
        return implode( '', array_map( array( $this, 'render_product' ), $products ) );
	}

    private function parse_bool( $value ) {
		if ( 'true' === $value ) {
			return true;
		}

		if ( 'false' === $value ) {
			return false;
		}

		return $value;
	}

	protected function parse_attributes_from_block_attributes( $block_attributes ) {
		return array(
			'banner_settings' => isset( $block_attributes['banner_settings'] ) ? $block_attributes['banner_settings'] : self::DEFAULT_ATTRIBUTES['banner_settings'],
			'content_settings'         => isset( $block_attributes['content_settings'] ) ? $block_attributes['content_settings'] : self::DEFAULT_ATTRIBUTES['content_settings'],
            'product_category_settings' => isset( $block_attributes['product_category_settings'] ) ? $block_attributes['product_category_settings'] : self::DEFAULT_ATTRIBUTES['product_category_settings'],
        );
	}

	public function render_product( $product ) {
        $content_settings = isset( $this->attributes['content_settings'] ) ? $this->attributes['content_settings'] : self::DEFAULT_ATTRIBUTES['content_settings'];
        $product_controller = new ProductController( $product );

        $content            = sprintf(
			'<div class="product">
				<div class="brandy-block-product__thumbnail">%s%s</div>
				<div class="brandy-block-product__content">%s%s%s%s%s</div>
			</div>',
			$this->parse_bool($content_settings['showImage']) ? $product_controller->get_template_sale_flash() : '',
			$this->parse_bool($content_settings['showImage']) ? $product_controller->get_template_image() : '',
			$this->parse_bool($content_settings['showCategory']) ? $product_controller->get_template_category() : '',
			$this->parse_bool($content_settings['showTitle']) ? $product_controller->get_template_title() : '',
			$this->parse_bool($content_settings['showRating']) ? $product_controller->get_template_rating() : '',
			$this->parse_bool($content_settings['showPrice']) ? $product_controller->get_template_pricing() : '',
			$this->parse_bool($content_settings['showAddToCart']) ? $product_controller->get_template_button() : ''
		);
       
		return apply_filters( 'brandy_block_product_content', $content, $product, $product_controller );
	}

}
