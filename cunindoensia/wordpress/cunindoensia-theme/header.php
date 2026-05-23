<?php
if (!defined('ABSPATH')) {
    exit;
}

$is_home = is_front_page();
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header <?php echo $is_home ? 'is-home' : ''; ?>" data-site-header>
    <div class="container header-inner">
        <a class="brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="<?php echo esc_attr(get_bloginfo('name')); ?>">
            <img class="brand-logo light" src="<?php echo esc_url(cun_asset('images/logo_white.png')); ?>" alt="">
            <img class="brand-logo dark" src="<?php echo esc_url(cun_asset('images/logo.png')); ?>" alt="">
            <span><?php echo esc_html(get_bloginfo('name') ?: 'Cahaya Untuk Negeri'); ?></span>
        </a>

        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-menu" data-menu-toggle>
            <span class="screen-reader-text">Buka menu</span>
            <?php echo cun_icon('menu'); ?>
        </button>

        <nav class="nav-links" id="primary-menu" aria-label="Menu utama">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="<?php echo is_front_page() ? 'current' : ''; ?>">Beranda</a>
            <a href="<?php echo esc_url(home_url('/#tentang')); ?>">Tentang Kami</a>
            <a href="<?php echo esc_url(home_url('/program/')); ?>" class="<?php echo is_post_type_archive('program') ? 'current' : ''; ?>">Program</a>
            <a href="<?php echo esc_url(home_url('/galeri/')); ?>" class="<?php echo is_post_type_archive('gallery') ? 'current' : ''; ?>">Galeri</a>
            <a href="<?php echo esc_url(cun_news_url()); ?>" class="<?php echo (cun_is_news_index() || is_singular('post')) ? 'current' : ''; ?>">Berita</a>
            <a href="<?php echo esc_url(home_url('/#kontak')); ?>">Kontak</a>
            <a class="btn btn-primary" href="<?php echo esc_url(home_url('/donasi/')); ?>">
                <?php echo cun_icon('heart'); ?>
                <span>Donasi</span>
            </a>
        </nav>
    </div>
</header>

<main id="content">
