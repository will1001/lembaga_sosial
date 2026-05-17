<?php get_header(); ?>

<section class="archive-hero">
    <div class="container">
        <h1>Program Kami</h1>
        <p>Berbagai inisiatif untuk membawa perubahan positif dan meningkatkan kualitas hidup masyarakat Indonesia.</p>
    </div>
</section>

<section class="section">
    <div class="container">
        <?php if (have_posts()) : ?>
            <div class="card-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <?php
                    $image = cun_post_image_url(get_the_ID(), 'medium_large', 'https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=900');
                    ?>
                    <article class="content-card">
                        <div class="card-image">
                            <img src="<?php echo esc_url($image); ?>" alt="<?php the_title_attribute(); ?>">
                        </div>
                        <div class="card-body">
                            <span class="card-icon"><?php echo cun_icon('book'); ?></span>
                            <h2><?php the_title(); ?></h2>
                            <p><?php echo esc_html(cun_excerpt(get_the_ID(), 26)); ?></p>
                            <a class="text-link" href="<?php the_permalink(); ?>">
                                <span>Lihat Program</span>
                                <?php echo cun_icon('arrow'); ?>
                            </a>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>
            <div class="section-footer"><?php the_posts_pagination(); ?></div>
        <?php else : ?>
            <div class="empty-state">Belum ada program yang ditambahkan.</div>
        <?php endif; ?>
    </div>
</section>

<section class="cta">
    <div class="container">
        <h2>Dukung Program Kami</h2>
        <p>Bantu kami mewujudkan program-program ini dengan menjadi donatur atau relawan.</p>
        <div class="cta-actions">
            <a class="btn btn-light" href="<?php echo esc_url(home_url('/donasi/')); ?>">Donasi Sekarang</a>
            <a class="btn btn-outline-light" href="<?php echo esc_url(home_url('/#kontak')); ?>">Hubungi Kami</a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
