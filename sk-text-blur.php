<?php
/**
 * Plugin Name:       Sk Text Blur
 * Description:       This block create selected text is blur for guest user.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            jalal
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       sk-text-blur
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_sk_text_blur_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_sk_text_blur_block_init' );
