<?php
get_header();

$dashboard = cun_dashboard();
$hero_image = cun_image_url($dashboard['home_image_id'], 'full', cun_default_hero_url());
$about_image = cun_image_url($dashboard['about_image_id'], 'large', 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=900');

$programs = new WP_Query([
    'post_type' => 'program',
    'posts_per_page' => 3,
    'meta_key' => '_cun_program_featured',
    'meta_value' => '1',
]);

if (!$programs->have_posts()) {
    wp_reset_postdata();
    $programs = new WP_Query([
        'post_type' => 'program',
        'posts_per_page' => 3,
    ]);
}

$donations = new WP_Query([
    'post_type' => 'donation',
    'posts_per_page' => 3,
    'meta_query' => [
        [
            'key' => '_cun_donation_is_active',
            'value' => '1',
        ],
    ],
    'orderby' => [
        'meta_value' => 'DESC',
        'date' => 'DESC',
    ],
    'meta_key' => '_cun_donation_featured',
]);
?>

<section class="hero">
    <img class="hero-bg" src="<?php echo esc_url($hero_image); ?>" alt="">
    <div class="hero-content">
        <h1 class="hero-title"><?php echo esc_html($dashboard['home_title']); ?></h1>
        <p class="hero-desc"><?php echo esc_html($dashboard['home_desc']); ?></p>
        <div class="hero-actions">
            <a class="btn btn-primary" href="<?php echo esc_url(home_url('/donasi/')); ?>">
                <?php echo cun_icon('heart'); ?>
                <span>Donasi Sekarang</span>
            </a>
            <a class="btn btn-light" href="<?php echo esc_url(home_url('/program/')); ?>">
                <span>Program Kami</span>
                <?php echo cun_icon('arrow'); ?>
            </a>
        </div>
    </div>
</section>

<section class="section" id="tentang">
    <div class="container about-grid">
        <div class="about-copy">
            <h2>Tentang <span class="accent">Cahaya Untuk Negeri</span></h2>
            <div class="rich-text">
                <?php
                if (!empty($dashboard['about'])) {
                    echo wpautop(wp_kses_post($dashboard['about']));
                } else {
                    echo '<p>Kami bergerak bersama masyarakat untuk membuka akses pendidikan, kesehatan, dan pemberdayaan ekonomi yang lebih baik.</p>';
                }
                ?>
            </div>
            <a class="text-link" href="<?php echo esc_url(home_url('/#kontak')); ?>">
                <span>Pelajari Lebih Lanjut</span>
                <?php echo cun_icon('arrow'); ?>
            </a>
        </div>

        <div class="about-media">
            <img src="<?php echo esc_url($about_image); ?>" alt="Kegiatan Cahaya Untuk Negeri">
        </div>
    </div>
</section>

<section class="section section-muted">
    <div class="container">
        <div class="section-heading">
            <h2>Program <span class="accent">Unggulan Kami</span></h2>
            <p>Kami mengembangkan berbagai program untuk membantu masyarakat Indonesia dalam bidang pendidikan, kesehatan, dan pengembangan ekonomi.</p>
        </div>

        <?php if ($programs->have_posts()) : ?>
            <div class="card-grid">
                <?php while ($programs->have_posts()) : $programs->the_post(); ?>
                    <?php
                    $program_image = cun_post_image_url(get_the_ID(), 'medium_large', 'https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=900');
                    ?>
                    <article class="content-card">
                        <div class="card-image">
                            <img src="<?php echo esc_url($program_image); ?>" alt="<?php the_title_attribute(); ?>">
                        </div>
                        <div class="card-body">
                            <span class="card-icon"><?php echo cun_icon('book'); ?></span>
                            <h3><?php the_title(); ?></h3>
                            <p><?php echo esc_html(cun_excerpt(get_the_ID(), 22)); ?></p>
                            <a class="text-link" href="<?php echo esc_url(get_post_type_archive_link('program')); ?>">
                                <span>Selengkapnya</span>
                                <?php echo cun_icon('arrow'); ?>
                            </a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
        <?php else : ?>
            <div class="empty-state">Belum ada program yang ditambahkan.</div>
        <?php endif; ?>
        <?php wp_reset_postdata(); ?>

        <div class="section-footer">
            <a class="btn btn-primary" href="<?php echo esc_url(home_url('/program/')); ?>">
                <span>Lihat Semua Program</span>
                <?php echo cun_icon('arrow'); ?>
            </a>
        </div>
    </div>
</section>

<?php if ($donations->have_posts()) : ?>
    <section class="section">
        <div class="container">
            <div class="section-heading">
                <h2>Program <span class="accent">Donasi</span></h2>
                <p>Bergabunglah dalam kebaikan. Dukung program-program kami untuk membantu sesama.</p>
            </div>

            <div class="card-grid">
                <?php while ($donations->have_posts()) : $donations->the_post(); ?>
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
                            <h3><?php the_title(); ?></h3>
                            <p><?php echo esc_html(cun_excerpt(get_the_ID(), 18)); ?></p>
                            <div class="progress-meta">
                                <span>Terkumpul</span>
                                <span><?php echo esc_html(cun_currency($current)); ?></span>
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
        </div>
    </section>
    <?php wp_reset_postdata(); ?>
<?php endif; ?>

<section class="cta">
    <div class="container">
        <div class="cta-icon"><?php echo cun_icon('sun'); ?></div>
        <h2>Jadilah Bagian dari Perubahan</h2>
        <p>Bergabunglah dengan kami untuk membawa cahaya harapan bagi mereka yang membutuhkan. Setiap kontribusi akan membuat perbedaan.</p>
        <div class="cta-actions">
            <a class="btn btn-light" href="<?php echo esc_url(home_url('/donasi/')); ?>">
                <?php echo cun_icon('heart'); ?>
                <span>Donasi Sekarang</span>
            </a>
            <a class="btn btn-outline-light" href="<?php echo esc_url(home_url('/#kontak')); ?>">
                <span>Hubungi Kami</span>
                <?php echo cun_icon('arrow'); ?>
            </a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
