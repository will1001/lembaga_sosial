<?php get_header(); ?>

<section class="archive-hero">
    <div class="container">
        <h1><?php echo cun_is_news_index() ? 'Berita & Aktivitas' : esc_html(get_the_archive_title() ?: get_bloginfo('name')); ?></h1>
        <p>
            <?php
            if (cun_is_news_index()) {
                echo 'Kabar terbaru tentang program, kegiatan, dan pencapaian Cahaya Untuk Negeri.';
            } elseif (get_the_archive_description()) {
                echo wp_kses_post(get_the_archive_description());
            }
            ?>
        </p>
    </div>
</section>

<section class="section">
    <div class="container">
        <?php if (have_posts()) : ?>
            <div class="card-grid news-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <article class="content-card">
                        <a class="card-link-wrap" href="<?php echo esc_url(cun_news_permalink(get_the_ID())); ?>">
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="card-image">
                                    <?php the_post_thumbnail('medium_large'); ?>
                                </div>
                            <?php endif; ?>
                            <div class="card-body">
                                <?php $category = cun_post_category_label(get_the_ID()); ?>
                                <?php if ($category) : ?>
                                    <span class="news-badge"><?php echo esc_html($category); ?></span>
                                <?php endif; ?>
                                <h2><?php the_title(); ?></h2>
                                <p class="clamp-5"><?php echo esc_html(cun_excerpt(get_the_ID(), 34)); ?></p>
                                <div class="news-meta">
                                    <span><?php echo esc_html(get_the_date()); ?></span>
                                    <span><?php echo esc_html(get_the_author()); ?></span>
                                </div>
                                <span class="text-link">
                                    <span>Baca Selengkapnya</span>
                                    <?php echo cun_icon('arrow'); ?>
                                </span>
                            </div>
                        </a>
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
