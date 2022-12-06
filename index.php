<?php

/*
  Plugin Name: API Post Slider
  Description: Add a post slider to your post/page using the Gutenburg Slider
  Version: 1.0
  Author: Shalom Taiwo
  Author URI: https://www.shalomt.com
*/

if (!defined('ABSPATH')) exit; // Exit if accessed directly


class SliderPostApi
{
  function __construct()
  {
    add_action('init', array($this, 'adminAssets'));
  }

  function adminAssets()
  {
    wp_register_style('slidereditcss', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_register_script('sliderapinewblock', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
    register_block_type('apipsl/api-post-slider', array(
      'editor_script' => 'sliderapinewblock',
      'editor_style' => 'slidereditcss',
      'render_callback' => array($this, 'theHTML')
    ));
  }

  function theHTML($attributes)
  {
    if (!is_admin()) {
      wp_enqueue_script('sliderFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
      wp_enqueue_style('sliderFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
    }


    ob_start(); ?>
    <div id="apislider">
      <pre><?php echo wp_json_encode($attributes) ?></pre>
    </div>
<?php return ob_get_clean();
  }
}

$sliderPostApi = new SliderPostApi();


// Register Style
function api_post_slider_custom_styles()
{
  wp_deregister_style('swiper_css');
  wp_register_style('swiper_css', 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css', false, false);
  wp_enqueue_style('swiper_css');
}
add_action('admin_enqueue_scripts', 'api_post_slider_custom_styles');
add_action('wp_enqueue_scripts', 'api_post_slider_custom_styles');


function swiper_user_scripts()
{
  $plugin_url = plugin_dir_url(__FILE__);
  wp_enqueue_style('style',  $plugin_url . "src/css/index.css");
}

add_action('admin_print_styles', 'swiper_user_scripts');
