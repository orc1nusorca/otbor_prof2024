<?php

// С помощью PHP добавить водяной знак в самой темной области изображения

function addWatermark($imagePath, $watermarkText) {
    // Загружаем изображение
    $image = imagecreatefromjpeg($imagePath);
    if (!$image) {
        die('Не удалось загрузить изображение.');
    }

    // Получаем размеры изображения
    $width = imagesx($image);
    $height = imagesy($image);

    // Ищем самую темную область
    $darkestX = 0;
    $darkestY = 0;
    $darkestValue = 255; // Максимальное значение яркости

    for ($y = 0; $y < $height; $y++) {
        for ($x = 0; $x < $width; $x++) {
            $rgb = imagecolorat($image, $x, $y);
            $r = ($rgb >> 16) & 0xFF;
            $g = ($rgb >> 8) & 0xFF;
            $b = $rgb & 0xFF;

            // Вычисляем яркость
            $brightness = (0.299 * $r + 0.587 * $g + 0.114 * $b);
            if ($brightness < $darkestValue) {
                $darkestValue = $brightness;
                $darkestX = $x;
                $darkestY = $y;
            }
        }
    }

    // Устанавливаем цвет для водяного знака
    $fontColor = imagecolorallocate($image, 255, 255, 255); // Белый цвет

    // Добавляем водяной знак с использованием встроенного шрифта
    imagestring($image, 30, $darkestX, $darkestY, $watermarkText, $fontColor); // Размер шрифта 5

    // Сохраняем изображение с водяным знаком
    imagejpeg($image, 'watermarked_image.jpg');

    // Освобождаем память
    imagedestroy($image);
}

// Использование функции
addWatermark('ishodnik.jpg', 'Watermarked');

?>
