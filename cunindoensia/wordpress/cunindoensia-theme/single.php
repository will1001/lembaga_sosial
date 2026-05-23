<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
    <?php if (get_post_type() === 'post') : ?>
        <section class="single-wrap news-detail">
            <?php if (has_post_thumbnail()) : ?>
                <div class="news-hero-image">
                    <?php the_post_thumbnail('full'); ?>
                </div>
            <?php endif; ?>

            <div class="container single-narrow">
                <article>
                    <?php $category = cun_post_category_label(get_the_ID()); ?>
                    <?php if ($category) : ?>
                        <span class="news-badge"><?php echo esc_html($category); ?></span>
                    <?php endif; ?>
                    <h1 class="single-title"><?php the_title(); ?></h1>
                    <div class="news-meta single-meta">
                        <span><?php echo esc_html(get_the_date()); ?></span>
                        <span><?php echo esc_html(get_the_author()); ?></span>
                    </div>
                    <?php if (has_excerpt()) : ?>
                        <p class="single-excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
                    <?php endif; ?>
                    <div class="single-content">
                        <?php the_content(); ?>
                    </div>
                    <a class="btn btn-primary" href="<?php echo esc_url(cun_news_url()); ?>">Kembali ke Berita</a>
                </article>
            </div>
        </section>
    <?php else : ?>
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
    <?php endif; ?>
<?php endwhile; ?>

<?php get_footer(); ?>
