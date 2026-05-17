<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
    <section class="single-wrap">
        <div class="container">
            <article>
                <h1 class="single-title"><?php the_title(); ?></h1>
                <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail('large', ['class' => 'single-featured']); ?>
                <?php endif; ?>
                <div class="single-content">
                    <?php the_content(); ?>
                </div>
            </article>
        </div>
    </section>
<?php endwhile; ?>

<?php get_footer(); ?>
