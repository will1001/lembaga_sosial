<?php
/**
 * Plugin Name: Cunindoensia CMS
 * Description: WordPress content model for Cunindoensia social institution content, migrated from Sanity schemas.
 * Version: 1.0.0
 * Author: Cunindoensia
 * Text Domain: cunindoensia-cms
 */

if (!defined('ABSPATH')) {
    exit;
}

final class Cunindoensia_CMS
{
    private const OPTION_DASHBOARD = 'cunindoensia_dashboard';
    private const OPTION_CONTACT = 'cunindoensia_contact_profile';
    private const NONCE_ACTION = 'cunindoensia_cms_save_meta';
    private const NONCE_NAME = 'cunindoensia_cms_nonce';

    private const DONATION_CATEGORIES = [
        'zakat' => 'Zakat',
        'infak' => 'Infak',
        'sedekah' => 'Sedekah',
        'kurban' => 'Kurban',
        'pendidikan' => 'Pendidikan',
        'kesehatan' => 'Kesehatan',
        'bencana' => 'Bencana',
        'lainnya' => 'Lainnya',
    ];

    private const PAYMENT_METHODS = [
        'transfer' => 'Transfer Bank',
        'ewallet' => 'E-Wallet',
        'credit_card' => 'Kartu Kredit',
        'qris' => 'QRIS',
    ];

    private const PAYMENT_STATUSES = [
        'pending' => 'Menunggu Pembayaran',
        'success' => 'Berhasil',
        'failed' => 'Gagal',
        'cancelled' => 'Dibatalkan',
    ];

    public static function boot(): void
    {
        $plugin = new self();
        add_action('init', [$plugin, 'register_post_types']);
        add_action('init', [$plugin, 'register_taxonomies']);
        add_action('init', [$plugin, 'register_meta_fields']);
        add_action('add_meta_boxes', [$plugin, 'add_meta_boxes']);
        add_action('save_post', [$plugin, 'save_post_meta']);
        add_action('admin_menu', [$plugin, 'add_settings_page']);
        add_action('admin_post_cunindoensia_save_options', [$plugin, 'save_options']);
        add_action('admin_enqueue_scripts', [$plugin, 'enqueue_admin_assets']);
    }

    public static function activate(): void
    {
        $plugin = new self();
        $plugin->register_post_types();
        $plugin->register_taxonomies();
        flush_rewrite_rules();
    }

    public static function deactivate(): void
    {
        flush_rewrite_rules();
    }

    public function register_post_types(): void
    {
        register_post_type('program', [
            'labels' => [
                'name' => 'Program',
                'singular_name' => 'Program',
                'add_new_item' => 'Tambah Program',
                'edit_item' => 'Edit Program',
            ],
            'public' => true,
            'menu_icon' => 'dashicons-groups',
            'show_in_rest' => true,
            'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
            'rewrite' => ['slug' => 'program'],
        ]);

        register_post_type('donation', [
            'labels' => [
                'name' => 'Donasi',
                'singular_name' => 'Donasi',
                'add_new_item' => 'Tambah Program Donasi',
                'edit_item' => 'Edit Program Donasi',
            ],
            'public' => true,
            'menu_icon' => 'dashicons-heart',
            'show_in_rest' => true,
            'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
            'rewrite' => ['slug' => 'donasi'],
        ]);

        register_post_type('donation_record', [
            'labels' => [
                'name' => 'Riwayat Donasi',
                'singular_name' => 'Riwayat Donasi',
                'add_new_item' => 'Tambah Riwayat Donasi',
                'edit_item' => 'Edit Riwayat Donasi',
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_rest' => true,
            'menu_icon' => 'dashicons-list-view',
            'supports' => ['title'],
        ]);

        register_post_type('gallery', [
            'labels' => [
                'name' => 'Gallery',
                'singular_name' => 'Gallery',
                'add_new_item' => 'Tambah Gallery',
                'edit_item' => 'Edit Gallery',
            ],
            'public' => true,
            'menu_icon' => 'dashicons-format-gallery',
            'show_in_rest' => true,
            'supports' => ['title', 'thumbnail', 'revisions'],
            'rewrite' => ['slug' => 'galeri'],
        ]);
    }

    public function register_taxonomies(): void
    {
        register_taxonomy('program_category', ['program'], [
            'labels' => [
                'name' => 'Kategori Program',
                'singular_name' => 'Kategori Program',
            ],
            'public' => true,
            'hierarchical' => false,
            'show_in_rest' => true,
            'rewrite' => ['slug' => 'kategori-program'],
        ]);

        register_taxonomy('gallery_category', ['gallery'], [
            'labels' => [
                'name' => 'Kategori Gallery',
                'singular_name' => 'Kategori Gallery',
            ],
            'public' => true,
            'hierarchical' => false,
            'show_in_rest' => true,
            'rewrite' => ['slug' => 'kategori-galeri'],
        ]);
    }

    public function register_meta_fields(): void
    {
        $this->register_meta('program', '_cun_program_featured', 'boolean');
        $this->register_meta('donation', '_cun_donation_target_amount', 'number');
        $this->register_meta('donation', '_cun_donation_current_amount', 'number');
        $this->register_meta('donation', '_cun_donation_donors_count', 'integer');
        $this->register_meta('donation', '_cun_donation_category', 'string');
        $this->register_meta('donation', '_cun_donation_is_active', 'boolean');
        $this->register_meta('donation', '_cun_donation_start_date', 'string');
        $this->register_meta('donation', '_cun_donation_end_date', 'string');
        $this->register_meta('donation', '_cun_donation_featured', 'boolean');
        $this->register_meta('donation_record', '_cun_record_donation_program', 'integer');
        $this->register_meta('donation_record', '_cun_record_donor_name', 'string');
        $this->register_meta('donation_record', '_cun_record_donor_email', 'string');
        $this->register_meta('donation_record', '_cun_record_donor_phone', 'string');
        $this->register_meta('donation_record', '_cun_record_amount', 'number');
        $this->register_meta('donation_record', '_cun_record_message', 'string');
        $this->register_meta('donation_record', '_cun_record_payment_method', 'string');
        $this->register_meta('donation_record', '_cun_record_payment_status', 'string');
        $this->register_meta('donation_record', '_cun_record_is_anonymous', 'boolean');
        $this->register_meta('donation_record', '_cun_record_created_at', 'string');
        $this->register_meta('post', '_cun_post_featured', 'boolean');
    }

    private function register_meta(string $post_type, string $key, string $type): void
    {
        register_post_meta($post_type, $key, [
            'type' => $type,
            'single' => true,
            'show_in_rest' => true,
            'auth_callback' => static function (): bool {
                return current_user_can('edit_posts');
            },
            'sanitize_callback' => [$this, 'sanitize_registered_meta'],
        ]);
    }

    public function sanitize_registered_meta($value, string $key)
    {
        if (strpos($key, 'email') !== false) {
            return sanitize_email((string) $value);
        }

        if (strpos($key, 'amount') !== false || strpos($key, 'count') !== false) {
            return max(0, (float) $value);
        }

        if (strpos($key, 'featured') !== false || strpos($key, 'active') !== false || strpos($key, 'anonymous') !== false) {
            return (bool) $value;
        }

        return sanitize_text_field((string) $value);
    }

    public function add_meta_boxes(): void
    {
        add_meta_box('cun_program_details', 'Detail Program', [$this, 'render_program_meta_box'], 'program');
        add_meta_box('cun_donation_details', 'Detail Donasi', [$this, 'render_donation_meta_box'], 'donation');
        add_meta_box('cun_record_details', 'Detail Riwayat Donasi', [$this, 'render_record_meta_box'], 'donation_record');
        add_meta_box('cun_post_details', 'Detail Artikel', [$this, 'render_post_meta_box'], 'post', 'side');
    }

    public function render_program_meta_box(WP_Post $post): void
    {
        $this->nonce_field();
        $this->checkbox_field('_cun_program_featured', 'Featured?', $post);
    }

    public function render_donation_meta_box(WP_Post $post): void
    {
        $this->nonce_field();
        $this->number_field('_cun_donation_target_amount', 'Target Donasi (Rp)', $post);
        $this->number_field('_cun_donation_current_amount', 'Jumlah Terkumpul (Rp)', $post);
        $this->number_field('_cun_donation_donors_count', 'Jumlah Donatur', $post);
        $this->select_field('_cun_donation_category', 'Kategori', $post, self::DONATION_CATEGORIES);
        $this->date_field('_cun_donation_start_date', 'Tanggal Mulai', $post);
        $this->date_field('_cun_donation_end_date', 'Tanggal Selesai', $post);
        $this->checkbox_field('_cun_donation_is_active', 'Aktif?', $post, true);
        $this->checkbox_field('_cun_donation_featured', 'Unggulan?', $post);
    }

    public function render_record_meta_box(WP_Post $post): void
    {
        $this->nonce_field();
        $this->donation_program_field($post);
        $this->text_field('_cun_record_donor_name', 'Nama Donatur', $post);
        $this->email_field('_cun_record_donor_email', 'Email Donatur', $post);
        $this->text_field('_cun_record_donor_phone', 'Telepon Donatur', $post);
        $this->number_field('_cun_record_amount', 'Jumlah Donasi (Rp)', $post);
        $this->textarea_field('_cun_record_message', 'Pesan', $post);
        $this->select_field('_cun_record_payment_method', 'Metode Pembayaran', $post, self::PAYMENT_METHODS);
        $this->select_field('_cun_record_payment_status', 'Status Pembayaran', $post, self::PAYMENT_STATUSES, 'pending');
        $this->datetime_field('_cun_record_created_at', 'Tanggal Donasi', $post);
        $this->checkbox_field('_cun_record_is_anonymous', 'Donasi Anonymous?', $post);
    }

    public function render_post_meta_box(WP_Post $post): void
    {
        $this->nonce_field();
        $this->checkbox_field('_cun_post_featured', 'Featured?', $post);
    }

    public function save_post_meta(int $post_id): void
    {
        if (!$this->can_save_post($post_id)) {
            return;
        }

        $post_type = get_post_type($post_id);
        $fields = [
            'program' => ['_cun_program_featured'],
            'donation' => [
                '_cun_donation_target_amount',
                '_cun_donation_current_amount',
                '_cun_donation_donors_count',
                '_cun_donation_category',
                '_cun_donation_is_active',
                '_cun_donation_start_date',
                '_cun_donation_end_date',
                '_cun_donation_featured',
            ],
            'donation_record' => [
                '_cun_record_donation_program',
                '_cun_record_donor_name',
                '_cun_record_donor_email',
                '_cun_record_donor_phone',
                '_cun_record_amount',
                '_cun_record_message',
                '_cun_record_payment_method',
                '_cun_record_payment_status',
                '_cun_record_is_anonymous',
                '_cun_record_created_at',
            ],
            'post' => ['_cun_post_featured'],
        ];

        foreach ($fields[$post_type] ?? [] as $field) {
            $value = $_POST[$field] ?? '';

            if (in_array($field, ['_cun_program_featured', '_cun_donation_is_active', '_cun_donation_featured', '_cun_record_is_anonymous', '_cun_post_featured'], true)) {
                update_post_meta($post_id, $field, $value === '1' ? '1' : '0');
                continue;
            }

            update_post_meta($post_id, $field, $this->sanitize_meta_field($field, $value));
        }
    }

    private function can_save_post(int $post_id): bool
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return false;
        }

        if (!isset($_POST[self::NONCE_NAME]) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST[self::NONCE_NAME])), self::NONCE_ACTION)) {
            return false;
        }

        return current_user_can('edit_post', $post_id);
    }

    private function sanitize_meta_field(string $field, $value)
    {
        $value = is_string($value) ? wp_unslash($value) : $value;

        if (strpos($field, 'email') !== false) {
            return sanitize_email((string) $value);
        }

        if (strpos($field, 'message') !== false) {
            return sanitize_textarea_field((string) $value);
        }

        if (strpos($field, 'amount') !== false || strpos($field, 'count') !== false || strpos($field, 'program') !== false) {
            return max(0, (int) $value);
        }

        return sanitize_text_field((string) $value);
    }

    public function add_settings_page(): void
    {
        add_menu_page(
            'Cunindoensia',
            'Cunindoensia',
            'manage_options',
            'cunindoensia-cms',
            [$this, 'render_settings_page'],
            'dashicons-admin-home',
            30
        );
    }

    public function render_settings_page(): void
    {
        if (!current_user_can('manage_options')) {
            return;
        }

        $dashboard = $this->get_dashboard_options();
        $contact = $this->get_contact_options();
        ?>
        <div class="wrap cunindoensia-settings">
            <h1>Cunindoensia CMS</h1>
            <?php if (isset($_GET['updated'])) : ?>
                <div class="notice notice-success is-dismissible"><p>Pengaturan berhasil disimpan.</p></div>
            <?php endif; ?>

            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <input type="hidden" name="action" value="cunindoensia_save_options">
                <?php wp_nonce_field('cunindoensia_save_options'); ?>

                <h2>Dashboard / Beranda</h2>
                <?php
                $this->option_text_field('dashboard[home_title]', 'Home Title', $dashboard['home_title']);
                $this->option_textarea_field('dashboard[home_desc]', 'Home Description', $dashboard['home_desc']);
                $this->option_media_field('dashboard[home_image_id]', 'Home Image', $dashboard['home_image_id']);
                $this->option_textarea_field('dashboard[about]', 'About', $dashboard['about']);
                $this->option_media_field('dashboard[about_image_id]', 'About Image', $dashboard['about_image_id']);
                ?>

                <h2>Contact Profile</h2>
                <?php
                $this->option_textarea_field('contact[address]', 'Address', $contact['address']);
                $this->option_text_field('contact[phone]', 'Phone', $contact['phone']);
                $this->option_text_field('contact[email]', 'Email', $contact['email'], 'email');
                submit_button('Simpan Pengaturan');
                ?>
            </form>
        </div>
        <?php
    }

    public function save_options(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }

        check_admin_referer('cunindoensia_save_options');

        $dashboard = isset($_POST['dashboard']) && is_array($_POST['dashboard']) ? wp_unslash($_POST['dashboard']) : [];
        $contact = isset($_POST['contact']) && is_array($_POST['contact']) ? wp_unslash($_POST['contact']) : [];

        update_option(self::OPTION_DASHBOARD, [
            'home_title' => sanitize_text_field($dashboard['home_title'] ?? ''),
            'home_desc' => sanitize_textarea_field($dashboard['home_desc'] ?? ''),
            'home_image_id' => absint($dashboard['home_image_id'] ?? 0),
            'about' => wp_kses_post($dashboard['about'] ?? ''),
            'about_image_id' => absint($dashboard['about_image_id'] ?? 0),
        ]);

        update_option(self::OPTION_CONTACT, [
            'address' => sanitize_textarea_field($contact['address'] ?? ''),
            'phone' => sanitize_text_field($contact['phone'] ?? ''),
            'email' => sanitize_email($contact['email'] ?? ''),
        ]);

        wp_safe_redirect(add_query_arg('updated', '1', admin_url('admin.php?page=cunindoensia-cms')));
        exit;
    }

    public function enqueue_admin_assets(string $hook): void
    {
        if ($hook !== 'toplevel_page_cunindoensia-cms') {
            return;
        }

        wp_enqueue_media();
        wp_add_inline_script('media-editor', "
            document.addEventListener('click', function (event) {
                if (!event.target.classList.contains('cun-media-button')) return;
                event.preventDefault();
                const input = document.querySelector(event.target.dataset.target);
                const frame = wp.media({title: 'Pilih gambar', multiple: false, library: {type: 'image'}});
                frame.on('select', function () {
                    const attachment = frame.state().get('selection').first().toJSON();
                    input.value = attachment.id;
                });
                frame.open();
            });
        ");
    }

    private function get_dashboard_options(): array
    {
        return wp_parse_args(get_option(self::OPTION_DASHBOARD, []), [
            'home_title' => '',
            'home_desc' => '',
            'home_image_id' => 0,
            'about' => '',
            'about_image_id' => 0,
        ]);
    }

    private function get_contact_options(): array
    {
        return wp_parse_args(get_option(self::OPTION_CONTACT, []), [
            'address' => '',
            'phone' => '',
            'email' => '',
        ]);
    }

    private function nonce_field(): void
    {
        wp_nonce_field(self::NONCE_ACTION, self::NONCE_NAME);
    }

    private function get_meta(WP_Post $post, string $key, $default = ''): string
    {
        $value = get_post_meta($post->ID, $key, true);
        return $value === '' ? (string) $default : (string) $value;
    }

    private function text_field(string $key, string $label, WP_Post $post, string $type = 'text'): void
    {
        printf(
            '<p><label for="%1$s"><strong>%2$s</strong></label><br><input class="widefat" type="%3$s" id="%1$s" name="%1$s" value="%4$s"></p>',
            esc_attr($key),
            esc_html($label),
            esc_attr($type),
            esc_attr($this->get_meta($post, $key))
        );
    }

    private function email_field(string $key, string $label, WP_Post $post): void
    {
        $this->text_field($key, $label, $post, 'email');
    }

    private function number_field(string $key, string $label, WP_Post $post): void
    {
        $this->text_field($key, $label, $post, 'number');
    }

    private function date_field(string $key, string $label, WP_Post $post): void
    {
        $this->text_field($key, $label, $post, 'date');
    }

    private function datetime_field(string $key, string $label, WP_Post $post): void
    {
        $value = $this->get_meta($post, $key, current_time('Y-m-d\TH:i'));
        printf(
            '<p><label for="%1$s"><strong>%2$s</strong></label><br><input class="widefat" type="datetime-local" id="%1$s" name="%1$s" value="%3$s"></p>',
            esc_attr($key),
            esc_html($label),
            esc_attr($value)
        );
    }

    private function textarea_field(string $key, string $label, WP_Post $post): void
    {
        printf(
            '<p><label for="%1$s"><strong>%2$s</strong></label><br><textarea class="widefat" rows="4" id="%1$s" name="%1$s">%3$s</textarea></p>',
            esc_attr($key),
            esc_html($label),
            esc_textarea($this->get_meta($post, $key))
        );
    }

    private function checkbox_field(string $key, string $label, WP_Post $post, bool $default = false): void
    {
        $checked = $this->get_meta($post, $key, $default ? '1' : '0') === '1';
        printf(
            '<p><label><input type="checkbox" name="%1$s" value="1" %2$s> %3$s</label></p>',
            esc_attr($key),
            checked($checked, true, false),
            esc_html($label)
        );
    }

    private function select_field(string $key, string $label, WP_Post $post, array $options, string $default = ''): void
    {
        $value = $this->get_meta($post, $key, $default);
        printf('<p><label for="%1$s"><strong>%2$s</strong></label><br><select class="widefat" id="%1$s" name="%1$s">', esc_attr($key), esc_html($label));
        echo '<option value="">Pilih</option>';

        foreach ($options as $option_value => $option_label) {
            printf(
                '<option value="%1$s" %2$s>%3$s</option>',
                esc_attr($option_value),
                selected($value, $option_value, false),
                esc_html($option_label)
            );
        }

        echo '</select></p>';
    }

    private function donation_program_field(WP_Post $post): void
    {
        $value = (int) $this->get_meta($post, '_cun_record_donation_program');
        $programs = get_posts([
            'post_type' => 'donation',
            'numberposts' => -1,
            'post_status' => ['publish', 'draft', 'pending'],
            'orderby' => 'title',
            'order' => 'ASC',
        ]);

        echo '<p><label for="_cun_record_donation_program"><strong>Program Donasi</strong></label><br>';
        echo '<select class="widefat" id="_cun_record_donation_program" name="_cun_record_donation_program">';
        echo '<option value="">Pilih program</option>';

        foreach ($programs as $program) {
            printf(
                '<option value="%1$d" %2$s>%3$s</option>',
                (int) $program->ID,
                selected($value, $program->ID, false),
                esc_html(get_the_title($program))
            );
        }

        echo '</select></p>';
    }

    private function option_text_field(string $name, string $label, string $value, string $type = 'text'): void
    {
        printf(
            '<p><label><strong>%1$s</strong><br><input class="regular-text" type="%2$s" name="%3$s" value="%4$s"></label></p>',
            esc_html($label),
            esc_attr($type),
            esc_attr($name),
            esc_attr($value)
        );
    }

    private function option_textarea_field(string $name, string $label, string $value): void
    {
        printf(
            '<p><label><strong>%1$s</strong><br><textarea class="large-text" rows="5" name="%2$s">%3$s</textarea></label></p>',
            esc_html($label),
            esc_attr($name),
            esc_textarea($value)
        );
    }

    private function option_media_field(string $name, string $label, int $value): void
    {
        $id = 'field_' . sanitize_key(str_replace(['[', ']'], '_', $name));
        printf(
            '<p><label><strong>%1$s</strong><br><input class="small-text" type="number" id="%2$s" name="%3$s" value="%4$d"> <button class="button cun-media-button" data-target="#%2$s">Pilih Gambar</button></label></p>',
            esc_html($label),
            esc_attr($id),
            esc_attr($name),
            $value
        );
    }
}

Cunindoensia_CMS::boot();

register_activation_hook(__FILE__, ['Cunindoensia_CMS', 'activate']);
register_deactivation_hook(__FILE__, ['Cunindoensia_CMS', 'deactivate']);
