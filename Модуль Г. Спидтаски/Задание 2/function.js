//Напишите js функцию для вычисления расстояния между двумя точками (x и y)

function calculateDistance(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    return distance;
}

// Тестирование
const x = { x: 3, y: 4 };
const y = { x: 7, y: 1 };

const distance = calculateDistance(x.x, x.y, y.x, y.y);
console.log(`Расстояние между точками: ${distance}`);
