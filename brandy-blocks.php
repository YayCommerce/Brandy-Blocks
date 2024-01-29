<?php
/**
 * Plugin Name: Brandy Blocks - Extra blocks for Brandy theme
 * Plugin URI: https://yaycommerce.com/
 * Description:
 * Version: 0.1
 * Author: YayCommerce
 * Author URI: https://yaycommerce.com/
 * Text Domain: brandy-blocks
 * Requires PHP: 5.7
 * Domain Path: /languages
 *
 * @package BrandyBlocks
 */

namespace BrandyBlocks;

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'BRANDY_BLOCKS' ) ) {
	define( 'BRANDY_BLOCKS', __FILE__ );
}
if ( ! defined( 'BRANDY_BLOCKS_ABSPATH' ) ) {
	define( 'BRANDY_BLOCKS_ABSPATH', dirname( __FILE__ ) . '/' );
}
if ( ! defined( 'BRANDY_BLOCKS_PLUGIN_PATH' ) ) {
	define( 'BRANDY_BLOCKS_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
}
if ( ! defined( 'BRANDY_BLOCKS_PLUGIN_URL' ) ) {
	define( 'BRANDY_BLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}
if ( ! defined( 'BRANDY_BLOCKS_PLUGIN_BASENAME' ) ) {
	define( 'BRANDY_BLOCKS_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
}
if ( ! defined( 'BRANDY_BLOCKS_VERSION' ) ) {
	define( 'BRANDY_BLOCKS_VERSION', '0.1' );
}

require_once BRANDY_BLOCKS_PLUGIN_PATH . '/vendor/autoload.php';


add_action( 'plugins_loaded', '\\BRANDY_BLOCKS\\load_plugin' );

if ( ! function_exists( 'BRANDY_BLOCKS\\load_plugin' ) ) {
	/**
	 * Initialize plugin instance
	 */
	function load_plugin() { //phpcs:ignore
		
	}
}