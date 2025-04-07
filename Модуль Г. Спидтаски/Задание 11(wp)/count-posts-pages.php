<?php
/**
 * Plugin Name: Count Posts and Pages
 * Description: Плагин для отображения количества сообщений и страниц на странице администратора.
 * Version: 1.0
 * Exersize: Создайте плагин Wordpress, который добавляет на страницу администратора поле, содержащее количество сообщений и страниц
 */

// Защита от прямого доступа к файлу
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

// Функция для отображения количества сообщений и страниц
function cpp_display_count() {
    // Получаем количество сообщений и страниц
    $post_count = wp_count_posts();
    $page_count = wp_count_posts('page');

    // Отображаем информацию
    echo '<div class="wrap">';
    echo '<h2>Статистика сообщений и страниц</h2>';
    echo '<p><strong>Количество сообщений:</strong> ' . $post_count->publish . '</p>';
    echo '<p><strong>Количество страниц:</strong> ' . $page_count->publish . '</p>';
    echo '</div>';
}

// Добавляем страницу в админ-меню
function cpp_add_admin_menu() {
    add_menu_page(
        'Статистика', // Заголовок страницы
        'Статистика', // Название меню
        'manage_options', // Возможности
        'cpp_statistics', // Уникальный слаг
        'cpp_display_count' // Функция отображения содержимого
    );
}

// Хук для добавления страницы в админ-меню
add_action('admin_menu', 'cpp_add_admin_menu');