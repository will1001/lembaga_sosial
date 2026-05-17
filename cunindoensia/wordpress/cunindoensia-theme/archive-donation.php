<?php get_header(); ?>

<section class="archive-hero">
    <div class="container">
        <h1>Program Donasi</h1>
        <p>Bergabunglah dalam kebaikan. Dukung program-program kami untuk membantu sesama.</p>
    </div>
</section>

<section class="section section-muted">
    <div class="container">
        <?php if (have_posts()) : ?>
            <div class="card-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <?php
                    $target = (float) get_post_meta(get_the_ID(), '_cun_donation_target_amount', true);
                    $current = (float) get_post_meta(get_the_ID(), '_cun_donation_current_amount', true);
                    $donors = (int) get_post_meta(get_the_ID(), '_cun_donation_donors_count', true);
                    $category = (string) get_post_meta(get_the_ID(), '_cun_donation_category', true);
                    $featured = get_post_meta(get_the_ID(), '_cun_donation_featured', true) === '1';
                    $progress = cun_progress($current, $target);
                    $image = cun_post_image_url(get_the_ID(), 'medium_large', 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=900');
                    ?>
                    <article class="content-card">
                        <?php if ($featured) : ?>
                            <div class="featured-ribbon">Program Unggulan</div>
                        <?php endif; ?>
                        <div class="card-image">
                            <img src="<?php echo esc_url($image); ?>" alt="<?php the_title_attribute(); ?>">
                            <?php if ($category) : ?>
                                <span class="donation-badge"><?php echo esc_html($category); ?></span>
                            <?php endif; ?>
                        </div>
                        <div class="card-body">
                            <h2><?php the_title(); ?></h2>
                            <p><?php echo esc_html(cun_excerpt(get_the_ID(), 20)); ?></p>
                            <div class="progress-meta">
                                <span>Terkumpul</span>
                                <span><?php echo esc_html(cun_currency($current)); ?> / <?php echo esc_html(cun_currency($target)); ?></span>
                            </div>
                            <div class="progress-track">
                                <div class="progress-bar" style="width: <?php echo esc_attr($progress); ?>%"></div>
                            </div>
                            <div class="progress-meta">
                                <span><?php echo esc_html($donors); ?> Donatur</span>
                                <span><?php echo esc_html(round($progress)); ?>%</span>
                            </div>
                            <a class="btn btn-primary" href="<?php the_permalink(); ?>">Donasi Sekarang</a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="section-footer"><?php the_posts_pagination(); ?></div>
        <?php else : ?>
            <div class="empty-state">Belum ada program donasi yang aktif.</div>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>
