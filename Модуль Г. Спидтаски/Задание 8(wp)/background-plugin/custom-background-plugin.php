<?php
/*
Создайте плагин для добавления фона на страницу поста в WP
Plugin Name: Custom Background Plugin
Description: Плагин для добавления фона на страницу поста.
Version: 1.0
*/

function cbp_add_background_meta_box() {
    add_meta_box(
        'cbp_background_meta_box',
        'Фоновое изображение',
        'cbp_render_background_meta_box',
        'post',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'cbp_add_background_meta_box');

function cbp_render_background_meta_box($post) {
    $background_image = get_post_meta($post->ID, '_cbp_background_image', true);
    ?>
    <label for="cbp_background_image">URL фона:</label>
    <input type="text" id="cbp_background_image" name="cbp_background_image" value="<?php echo esc_attr($background_image); ?>" style="width: 100%;" />
    <?php
}

function cbp_save_background_meta_box($post_id) {
    if (array_key_exists('cbp_background_image', $_POST)) {
        update_post_meta($post_id, '_cbp_background_image', sanitize_text_field($_POST['cbp_background_image']));
    }
}
add_action('save_post', 'cbp_save_background_meta_box');

function cbp_add_background_style() {
    if (is_single()) {
        global $post;
        $background_image = get_post_meta($post->ID, '_cbp_background_image', true);
        if ($background_image) {
            echo '<style>
                body {
                    background-image: url("' . esc_url($background_image) . '");
                    background-size: cover;
                    background-position: center;
                }
            </style>';
        }
    }
}
add_action('wp_head', 'cbp_add_background_style');
