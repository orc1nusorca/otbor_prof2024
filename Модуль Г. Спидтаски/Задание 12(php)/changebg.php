<?php

// Замените фон изображения рисунком 150x200 (фон должен повторяться)


$background_image_url = 'Solar_Eclipse.jpg'; 

// Начало HTML-документа
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Замена фона</title>
    <style>
        body {
            background-image: url('<?php echo htmlspecialchars($background_image_url); ?>');
            background-repeat: repeat; /* Фон будет повторяться */
            background-size: auto; /* Автоматический размер */
            margin: 0; /* Убираем отступы */
            height: 100vh; /* Высота на весь экран */
        }
    </style>
</head>
<body>
    <h1>Добро пожаловать!</h1>
    <p>Это пример страницы с фоном, который повторяется.</p>
</body>
</html>

