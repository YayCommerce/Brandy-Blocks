<?php

namespace BrandyBlocks\Externals\Settings\VisibilityConditions;

use BrandyBlocks\Traits\SingletonTrait;
use BrandyBlocks\Utils\Helpers;

class Caller {
	use SingletonTrait;

	protected function __construct() {
		add_action(
			'init',
			function() {
				add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
				add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_scripts' ) );

			}
		);
		add_filter( 'render_block', array( $this, 'render_block_with_visibility' ), 999, 2 );
	}

	public function enqueue_scripts() {
		$wp_args = array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data','wp-i18n','wp-plugins','wp-edit-post','wp-api','wp-hooks');
		wp_enqueue_script( 'brandy-condition-blocks', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Settings/VisibilityConditions/script.js', $wp_args , time(), true );
		wp_enqueue_style( 'brandy-condition-blocks', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Settings/VisibilityConditions/style.css', array(), time() );
		wp_localize_script(
			'brandy-condition-blocks',
			'brandyBlocksData',
			array(
				'roles' => Helpers::get_user_roles(),
				'browsers' => apply_filters('brandy_browsers',['Chrome', 'Firefox', 'Safari', 'Edge', 'Internet Explorer']),
				'isUserLoggedIn' => is_user_logged_in(),
				'currentUserRole' => wp_get_current_user()->roles[0] ?? 'guest',
				'currentBrowser' => $_SERVER['HTTP_USER_AGENT'],
				'currentDay' => date('l'), // Gets the current day of the week
			)
		);
	}

	// Filter the block output to apply visibility rules
	public function render_block_with_visibility($block_content, $block) {
		if ( !self::check_block_visibility($block['attrs']) ) {
			return ''; // Hide block if conditions are met
		}

		return $block_content; // Show block otherwise
	}

	protected function check_block_visibility($block_attributes) {
		$current_user = wp_get_current_user();
		$current_day = date('l'); // Current day in 'Monday' format
		$current_browser = $_SERVER['HTTP_USER_AGENT']; // Fetch the browser's User-Agent
		
		// Hide when logged in or logged out
		if ( is_user_logged_in() && !empty($block_attributes['hideLoggedIn']) ) {
			return false;
		}
	
		if ( !is_user_logged_in() && !empty($block_attributes['hideLoggedOut']) ) {
			return false;
		}
	
		// Hide based on user role
		if ( !empty($block_attributes['hideRoles']) && array_intersect($block_attributes['hideRoles'], $current_user->roles) ) {
			return false;
		}
	
		// Hide based on browser (simple example)
		if ( !empty($block_attributes['hideBrowsers']) ) {
			foreach ($block_attributes['hideBrowsers'] as $browser) {
				
				error_log('Checking against browser: ' . $browser);
				if (strpos($current_browser, $browser) !== false) {
					return false; // Hide the block if the user agent contains the browser string
				}
			}
		}
	
		// Hide based on day of the week
		if ( !empty($block_attributes['hideDays']) && in_array($current_day, $block_attributes['hideDays']) ) {
			return false;
		}
	
		return true;
	}

}

Caller::get_instance();
