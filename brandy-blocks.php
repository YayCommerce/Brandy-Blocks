<?php
/**
 * Plugin Name: Brandy Blocks - Extra blocks for Brandy theme
 * Plugin URI: https://yaycommerce.com/
 * Description: Brandy blocks.
 * Version: 0.1
 * Author: YayCommerce
 * Author URI: https://yaycommerce.com/
 * License: GPLv3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: brandy-blocks
 * Requires PHP: 5.7
 * Domain Path: /languages
 *
 * @package BrandyBlocks
 */

namespace BrandyBlocks;

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'BRANDY_BLOCKS_FILE' ) ) {
	define( 'BRANDY_BLOCKS_FILE', __FILE__ );
}
if ( ! defined( 'BRANDY_BLOCKS_ABSPATH' ) ) {
	define( 'BRANDY_BLOCKS_ABSPATH', __DIR__ . '/' );
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

require_once BRANDY_BLOCKS_PLUGIN_PATH . 'vendor/autoload.php';


add_action( 'init', '\\BrandyBlocks\\brandyblocks_load_plugin' );

if ( ! function_exists( 'BrandyBlocks\\brandyblocks_load_plugin' ) ) {
	/**
	 * Initialize plugin instance
	 */
	function brandyblocks_load_plugin() { //phpcs:ignore
		Initialize::get_instance();
	}
}
