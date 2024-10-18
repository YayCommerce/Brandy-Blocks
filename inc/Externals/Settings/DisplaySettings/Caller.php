<?php

namespace BrandyBlocks\Externals\Settings\DisplaySettings;

use BrandyBlocks\Traits\SingletonTrait;

class Caller
{

    use SingletonTrait;

    protected function __construct()
    {
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_assets')); //Enqueuing block assets for editor.
        add_action('enqueue_block_assets', array($this, 'enqueue_frontend_scripts')); //Enqueuing block assets for both editor and front-end
        add_filter('render_block', array($this, 'add_display_style_attribute'), 10, 3);
    }

    public function enqueue_editor_assets()
    {
        wp_enqueue_script('brandy-blocks/display-settings-controls', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Build/Gutenberg/DisplaySettings/index.js', array('wp-edit-post'), time(), true);
    }

    public function enqueue_frontend_scripts()
    {
        wp_enqueue_style('brandy-blocks/display-settings-style', BRANDY_BLOCKS_PLUGIN_URL . 'inc/Externals/Settings/DisplaySettings/style.css', array(), time());
    }

    public function add_display_style_attribute($block_content, $block, $instance)
    {
        $attributes = (array) $block['attrs'];

        if (empty($attributes)) {
            return $block_content;
        }

        $display_settings = isset($attributes['displaySettings']) ? $attributes['displaySettings'] : [];

        if (empty($display_settings)) {
            return $block_content;
        }

        $position = isset($display_settings['key']) ? $display_settings['key'] : '';

        if ('default' === $position) {
            return $block_content;
        }

        $style = '';

        if ('block' === $position || 'flex' === $position) {
            $style = '--display: ' . $position . ';' ;

            if ('flex' === $position) {
                $gap = isset($display_settings['gap']) ? $display_settings['gap'] : '';
                $justification = isset($display_settings['justification']) ? $display_settings['justification'] : '';
    
                if ($gap) {
                    $style .= '--gap: ' . $gap . ';';
                }
    
                if ($justification) {
                    $style .= '--justification: ' . $justification . ';';
                }
            }

        } else {
            $style = '--position: ' . $position . ';';
            $dimensions = isset($display_settings['dimensions']) ? $display_settings['dimensions'] : [];

            if (!empty($dimensions)) {
                $top = isset($dimensions['top']) ? $dimensions['top'] : '';
                $bottom = isset($dimensions['bottom']) ? $dimensions['bottom'] : '';
                $left = isset($dimensions['left']) ? $dimensions['left'] : '';
                $right = isset($dimensions['right']) ? $dimensions['right'] : '';
            }

            if ($top) {
                $style .= '--top: ' . $top . ';';
            }
            if ($bottom) {
                $style .= '--bottom: ' . $bottom . ';';
            }
            if ($left) {
                $style .= '--left: ' . $left . ';';
            }
            if ($right) {
                $style .= '--right: ' . $right . ';';
            }
        }

        if ($style) {
            $tags = new \WP_HTML_Tag_Processor($block_content);
            if ($tags->next_tag()) {
                $existing_style = $tags->get_attribute('style') ?? '';
                $tags->set_attribute('style', $existing_style . $style);
                $block_content = $tags->get_updated_html();
            }
        }

        return $block_content;
    }
}

Caller::get_instance();
