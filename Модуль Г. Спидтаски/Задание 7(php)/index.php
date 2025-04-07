<!-- Дана строка. Необходимо найти подстроку, которая является самым длинным палиндромо -->

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Поиск палиндрома</title>
</head>
<body>
    <h1>Найдите самую длинную палиндромную подстроку</h1>
    <form method="post" action="">
        <label for="inputString">Введите строку:</label>
        <input type="text" id="inputString" name="inputString" required>
        <button type="submit">Найти</button>
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        function longestPalindrome($s) {
            $n = mb_strlen($s, 'UTF-8'); // mb_strlen для поддержки UTF-8
            if ($n < 1) return "";

            $start = 0;
            $end = 0;

            for ($i = 0; $i < $n; $i++) {
                // Проверка для нечетной длины палиндрома
                $len1 = expandAroundCenter($s, $i, $i);
                // Проверка для четной длины палиндрома
                $len2 = expandAroundCenter($s, $i, $i + 1);
                $maxLen = max($len1, $len2);

                if ($maxLen > ($end - $start)) {
                    $start = $i - (int)(($maxLen - 1) / 2);
                    $end = $i + (int)($maxLen / 2);
                }
            }

            return mb_substr($s, $start, $end - $start + 1, 'UTF-8'); // mb_substr для поддержки UTF-8
        }

        function expandAroundCenter($s, $left, $right) {
            while ($left >= 0 && $right < mb_strlen($s, 'UTF-8') && mb_substr($s, $left, 1, 'UTF-8') === mb_substr($s, $right, 1, 'UTF-8')) {
                $left--;
                $right++;
            }
            return $right - $left - 1;
        }

        // Получаем введенную строку
        $inputString = $_POST['inputString'];
        // Находим самую длинную палиндромную подстроку
        $result = longestPalindrome($inputString);
        
        echo "<h2>Результат:</h2>";
        echo "<p>Самая длинная палиндромная подстрока: '<strong>$result</strong>'</p>";
    }
    ?>
</body>
</html>