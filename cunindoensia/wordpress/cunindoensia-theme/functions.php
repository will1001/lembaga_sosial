<?php
if (!defined('ABSPATH')) {
    exit;
}

function cun_theme_setup(): void
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);

    register_nav_menus([
        'primary' => __('Primary Menu', 'cunindoensia-landing'),
    ]);
}
add_action('after_setup_theme', 'cun_theme_setup');

function cun_theme_assets(): void
{
    wp_enqueue_style('cunindoensia-style', get_stylesheet_uri(), [], '1.0.0');
    wp_enqueue_script('cunindoensia-main', get_template_directory_uri() . '/assets/js/main.js', [], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'cun_theme_assets');

function cun_asset(string $path): string
{
    return get_template_directory_uri() . '/assets/' . ltrim($path, '/');
}

function cun_dashboard(): array
{
    return wp_parse_args(get_option('cunindoensia_dashboard', []), [
        'home_title' => 'Cahaya Untuk Negeri',
        'home_desc' => 'Menerangi jalan menuju Indonesia yang lebih baik melalui pendidikan, kesehatan, dan pengembangan masyarakat.',
        'home_image_id' => 0,
        'about' => '',
        'about_image_id' => 0,
    ]);
}

function cun_contact(): array
{
    return wp_parse_args(get_option('cunindoensia_contact_profile', []), [
        'address' => '',
        'phone' => '',
        'email' => '',
    ]);
}

function cun_image_url($attachment_id, string $size = 'large', string $fallback = ''): string
{
    $attachment_id = absint($attachment_id);

    if ($attachment_id) {
        $image = wp_get_attachment_image_url($attachment_id, $size);
        if ($image) {
            return $image;
        }
    }

    return $fallback;
}

function cun_post_image_url(int $post_id, string $size = 'large', string $fallback = ''): string
{
    if (has_post_thumbnail($post_id)) {
        $image = get_the_post_thumbnail_url($post_id, $size);
        if ($image) {
            return $image;
        }
    }

    return $fallback;
}

function cun_currency($amount): string
{
    return 'Rp ' . number_format((float) $amount, 0, ',', '.');
}

function cun_progress($current, $target): float
{
    $target = (float) $target;
    if ($target <= 0) {
        return 0;
    }

    return min(100, max(0, ((float) $current / $target) * 100));
}

function cun_icon(string $name): string
{
    $icons = [
        'heart' => '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
        'arrow' => '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
        'book' => '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/></svg>',
        'sun' => '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
        'menu' => '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>',
        'mail' => '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
        'phone' => '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6A2 2 0 0 1 22 16.9z"/></svg>',
        'map' => '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    ];

    return $icons[$name] ?? '';
}

function cun_default_hero_url(): string
{
    return 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1600';
}

function cun_excerpt(int $post_id, int $length = 24): string
{
    $excerpt = has_excerpt($post_id) ? get_the_excerpt($post_id) : wp_strip_all_tags(get_post_field('post_content', $post_id));
    return wp_trim_words($excerpt, $length, '...');
}
