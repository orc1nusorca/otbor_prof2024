<?php

// Функция для затемнения окружности в центре изображения
function darkenCircle($imagePath, $radius, $outputPath) {
    // Загружаем изображение
    $image = imagecreatefromjpeg($imagePath);
    if (!$image) {
        die('Не удалось загрузить изображение. Проверьте путь и формат файла.');
    }

    // Получаем размеры изображения
    $width = imagesx($image);
    $height = imagesy($image);

    // Находим центр изображения
    $centerX = $width / 2;
    $centerY = $height / 2;

    // Создаем черный цвет с прозрачностью
    $blackColor = imagecolorallocatealpha($image, 0, 0, 0, 60); // 60 - уровень прозрачности

    // Рисуем затемненную окружность
    imagefilledellipse($image, $centerX, $centerY, $radius * 2, $radius * 2, $blackColor);

    // Сохраняем изображение с затемненной окружностью
    imagejpeg($image, $outputPath);

    // Освобождаем память
    imagedestroy($image);
}

// Использование функции
darkenCircle('C:/Users/User/Desktop/Модуль Г. Спидтаски/Задание 10/mountains_peak_slope_175846_3840x2400.jpg', 100, 'darkened_circle_image.jpg');
     

?>
