<?php
if (!defined('ABSPATH')) {
    exit;
}

$contact = cun_contact();
?>
</main>

<footer class="site-footer" id="kontak">
    <div class="container footer-grid">
        <section>
            <div class="footer-brand">
                <img src="<?php echo esc_url(cun_asset('images/logo_white.png')); ?>" alt="">
                <span><?php echo esc_html(get_bloginfo('name') ?: 'Cahaya Untuk Negeri'); ?></span>
            </div>
            <p>Menerangi jalan menuju Indonesia yang lebih baik melalui pendidikan, kesehatan, dan pengembangan masyarakat.</p>
        </section>

        <section>
            <h2 class="footer-title">Kontak Kami</h2>
            <div class="footer-contact">
                <?php if (!empty($contact['address'])) : ?>
                    <p><?php echo cun_icon('map'); ?> <?php echo esc_html($contact['address']); ?></p>
                <?php endif; ?>
                <?php if (!empty($contact['phone'])) : ?>
                    <p><?php echo cun_icon('phone'); ?> <?php echo esc_html($contact['phone']); ?></p>
                <?php endif; ?>
                <?php if (!empty($contact['email'])) : ?>
                    <p><?php echo cun_icon('mail'); ?> <a href="mailto:<?php echo esc_attr($contact['email']); ?>"><?php echo esc_html($contact['email']); ?></a></p>
                <?php endif; ?>
            </div>
        </section>

        <section>
            <h2 class="footer-title">Tautan Cepat</h2>
            <ul class="footer-list">
                <li><a href="<?php echo esc_url(home_url('/')); ?>">Beranda</a></li>
                <li><a href="<?php echo esc_url(home_url('/#tentang')); ?>">Tentang Kami</a></li>
                <li><a href="<?php echo esc_url(home_url('/program/')); ?>">Program</a></li>
                <li><a href="<?php echo esc_url(home_url('/galeri/')); ?>">Galeri</a></li>
                <li><a href="<?php echo esc_url(home_url('/donasi/')); ?>">Donasi</a></li>
            </ul>
        </section>
    </div>

    <div class="container footer-bottom">
        &copy; <?php echo esc_html(date_i18n('Y')); ?> <?php echo esc_html(get_bloginfo('name') ?: 'Cahaya Untuk Negeri'); ?>. Hak Cipta Dilindungi.
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
