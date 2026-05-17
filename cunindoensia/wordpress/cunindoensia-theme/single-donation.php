<?php
get_header();

while (have_posts()) :
    the_post();

    $target = (float) get_post_meta(get_the_ID(), '_cun_donation_target_amount', true);
    $current = (float) get_post_meta(get_the_ID(), '_cun_donation_current_amount', true);
    $donors = (int) get_post_meta(get_the_ID(), '_cun_donation_donors_count', true);
    $category = (string) get_post_meta(get_the_ID(), '_cun_donation_category', true);
    $progress = cun_progress($current, $target);
    $image = cun_post_image_url(get_the_ID(), 'large', '');
?>

<section class="single-wrap">
    <div class="container single-layout">
        <article>
            <p class="accent"><?php echo esc_html($category); ?></p>
            <h1 class="single-title"><?php the_title(); ?></h1>
            <?php if ($image) : ?>
                <img class="single-featured" src="<?php echo esc_url($image); ?>" alt="<?php the_title_attribute(); ?>">
            <?php endif; ?>
            <div class="single-content">
                <?php the_content(); ?>
            </div>
        </article>

        <aside class="side-panel">
            <h2>Progress Donasi</h2>
            <div class="progress-meta">
                <span>Terkumpul</span>
                <span><?php echo esc_html(cun_currency($current)); ?></span>
            </div>
            <div class="progress-track">
                <div class="progress-bar" style="width: <?php echo esc_attr($progress); ?>%"></div>
            </div>
            <div class="progress-meta">
                <span>Target <?php echo esc_html(cun_currency($target)); ?></span>
                <span><?php echo esc_html(round($progress)); ?>%</span>
            </div>
            <p><?php echo esc_html($donors); ?> donatur sudah berkontribusi.</p>
            <a class="btn btn-primary" href="<?php echo esc_url(home_url('/#kontak')); ?>">Hubungi Admin Donasi</a>
        </aside>
    </div>
</section>

<?php
endwhile;
get_footer();
