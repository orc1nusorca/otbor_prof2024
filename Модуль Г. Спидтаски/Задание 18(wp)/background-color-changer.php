<?php
/**
 * Plugin Name: Background Color Changer
 * Description: Меняет цвет фона страницы в зависимости от времени на компьютере пользователя.
 * Version: 1.0
 * Exercize: Создать плагин, который изменит цвет фона страницы с #fff на #ccc в зависимости от времени на компьютере
 */

// Добавляем скрипт для изменения цвета фона
function bcc_enqueue_scripts() {
    wp_enqueue_script('background-color-changer', plugin_dir_url(__FILE__) . 'background-color-changer.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'bcc_enqueue_scripts');
