<!-- Создайте функцию для сортировки букв заданной строки в порядке возрастания. «backdsts» => «abcdsst» -->

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Сортировка букв</title>
</head>
<body>
    <h2>Введите строку для сортировки букв</h2>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
        Строка: <input type="text" name="input_string" required>
        <input type="submit" value="Сортировать">
    </form>

    <?php
    // Функция для сортировки букв в строке
    function sortString($str) {
        $chars = str_split($str); // Разбиваем строку на массив символов
        sort($chars); // Сортируем массив символов
        return implode('', $chars); // Объединяем символы обратно в строку
    }

    // Обработка данных формы
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $inputString = $_POST["input_string"];
        $sortedString = sortString($inputString);
        echo "<p>Отсортированная строка: " . htmlspecialchars($sortedString) . "</p>";
    }
    ?>
</body>
</html>
