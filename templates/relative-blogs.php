<?php
/**
 * The Template for relative posts
 *
 * @package Brandy
 * @version 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use BrandyBlocks\Utils\Helpers;

$related    = $args['related'] ?? 'categories';
$order_by   = $args['order_by'] ?? 'title';
$order_type = $args['order'] ?? 'asc';

$relative_posts = Helpers::get_relative_posts( get_the_ID(), $related, $order_by, $order_type );

?>

<div class="relative-blogs<?php echo is_brandy_exists() ? ' brandy-core-styles' : ''; ?>">
<?php
if ( ! empty( $relative_posts ) ) :
	;
	?>
	<div class="relative-blogs__list">
	<?php foreach ( $relative_posts as $relative_post ) : ?>
			<div class="relative-blogs__item">
				<a href="<?php echo esc_url( get_the_permalink( $relative_post ) ); ?>" class="relative-blogs__item__link">
					<img src="<?php echo esc_url( brandy_blocks_get_post_thumbnail_url( $relative_post ) ); ?>" alt="<?php echo esc_attr( get_the_title( $relative_post ) ); ?>" class="relative-blogs__item__image">
				</a>
				<div class="relative-blogs__content">
					<p class="relative-blogs__post-date"> 
						<?php echo esc_html( get_the_date( '', $relative_post ) ); ?>
					</p>
					<div class="relative-blogs__post-title">
						<a  class="relative-blogs__detail-link" href="<?php echo esc_url( get_the_permalink( $relative_post ) ); ?>">
							<?php echo esc_html( get_the_title( $relative_post ) ); ?>
						</a>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
<?php endif; ?>
</div>
