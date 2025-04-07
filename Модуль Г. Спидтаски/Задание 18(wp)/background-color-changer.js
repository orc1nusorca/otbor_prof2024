document.addEventListener('DOMContentLoaded', function() {
    // Получаем текущее время
    var currentHour = new Date().getHours();
    
    // Устанавливаем цвет фона в зависимости от времени
    if (currentHour >= 6 && currentHour < 18) {
        // День: #fff
        document.body.style.backgroundColor = '#fff';
    } else {
        // Ночь: #ccc
        document.body.style.backgroundColor = '#ccc';
    }
});
