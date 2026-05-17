<?php get_header(); ?>

<section class="archive-hero">
    <div class="container">
        <h1>Galeri</h1>
        <p>Dokumentasi kegiatan dan program Cahaya Untuk Negeri.</p>
    </div>
</section>

<section class="section">
    <div class="container">
        <?php if (have_posts()) : ?>
            <div class="card-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <?php $image = cun_post_image_url(get_the_ID(), 'large', ''); ?>
                    <article class="content-card">
                        <?php if ($image) : ?>
                            <div class="card-image">
                                <img src="<?php echo esc_url($image); ?>" alt="<?php the_title_attribute(); ?>">
                            </div>
                        <?php endif; ?>
                        <div class="card-body">
                            <h2><?php the_title(); ?></h2>
                            <?php
                            $terms = get_the_terms(get_the_ID(), 'gallery_category');
                            if ($terms && !is_wp_error($terms)) :
                            ?>
                                <p><?php echo esc_html($terms[0]->name); ?></p>
                            <?php endif; ?>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="section-footer"><?php the_posts_pagination(); ?></div>
        <?php else : ?>
            <div class="empty-state">Belum ada galeri yang ditambahkan.</div>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
