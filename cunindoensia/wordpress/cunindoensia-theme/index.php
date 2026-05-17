<?php get_header(); ?>

<section class="archive-hero">
    <div class="container">
        <h1><?php echo esc_html(get_the_archive_title() ?: get_bloginfo('name')); ?></h1>
        <?php if (get_the_archive_description()) : ?>
            <p><?php echo wp_kses_post(get_the_archive_description()); ?></p>
        <?php endif; ?>
    </div>
</section>

<section class="section">
    <div class="container">
        <?php if (have_posts()) : ?>
            <div class="card-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <article class="content-card">
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="card-image">
                                <?php the_post_thumbnail('medium_large'); ?>
                            </div>
                        <?php endif; ?>
                        <div class="card-body">
                            <h2><?php the_title(); ?></h2>
                            <p><?php echo esc_html(cun_excerpt(get_the_ID(), 24)); ?></p>
                            <a class="text-link" href="<?php the_permalink(); ?>">
                                <span>Baca Selengkapnya</span>
                                <?php echo cun_icon('arrow'); ?>
                            </a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="section-footer"><?php the_posts_pagination(); ?></div>
        <?php else : ?>
            <div class="empty-state">Belum ada konten.</div>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
