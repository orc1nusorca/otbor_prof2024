document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // Установим размер canvas равным размерам окна браузера
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Нарисуем круг по центру экрана
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 350; // Можете изменить радиус круга по вашему усмотрению

    // Обработчик события перемещения мыши
    canvas.addEventListener("mousemove", function(event) {
        drawLine(centerX, centerY, event.clientX, event.clientY);
    });

    function drawLine(centerX, centerY, mouseX, mouseY) {
        // Очищаем canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Нарисуем круг по центру экрана
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "lightblue"; // Цвет круга
        ctx.fill();

        // Найдем координаты точки на прямой между центром круга и курсором мыши
        var dx = mouseX - centerX;
        var dy = mouseY - centerY;
        var angle = Math.atan2(dy, dx);
        var endX = centerX + Math.cos(angle) * canvas.width * 2; // умножаем на 2, чтобы точно дойти до края экрана
        var endY = centerY + Math.sin(angle) * canvas.height * 2;

        // Нарисуем линию от центра круга до найденной точки
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "purple"; // Цвет линии
        ctx.lineWidth = 5; // Толщина линии
        ctx.stroke();
    }
});