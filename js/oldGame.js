/// Variables
//Розмір клітинки
const grid = 16;

//Очки
var score = 0;
var maxScore = 0;

//Швидкість змійки
var count = 0;

//Кількість їжі
var food_num = 1;

//Колір скіна
var skin = 1;

//Кольори
var color = {
    pink: '#910033',
    pink_light: '#E10056',
    blue: '#120286',
    blue_light: '#1C00EC',
    red: '#BA0100',
    red_light: '#FF0100',
}

//! Змійка
var snake = {
    //Початкові корди
    x: 11 * grid,
    y: 12 * grid,
    // Швидкість змійки - в кожному новому кадрі змійка зміщається по осі X або Y
    // На старті змійка буде рухатись горизонтально, тому швидкість по Y = 0
    dx: grid,
    dy: 0,
    // Хвіст
    cells: [],
    // Стартова довжина - 4 клітинки
    maxCells: 4,
};

//! Їжа
var berry = {
    //Початкові корди
    x: getRandomInt(0, 25) * grid,
    y: getRandomInt(0, 25) * grid,
};
var berry2 = {
    //Початкові корди
    x: getRandomInt(0, 25) * grid,
    y: getRandomInt(0, 25) * grid,
};
var berry3 = {
    //Початкові корди
    x: getRandomInt(0, 25) * grid,
    y: getRandomInt(0, 25) * grid,
};

//Швидкість
var speed = 4;

/// Functions
//Генератор рандомних чисел
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/// Main Options
const canvas = document.getElementById('game');
const cx = canvas.getContext('2d');

/// Game Loop
function loop() {
    //Speed
    requestAnimationFrame(loop);
    if (++count < speed) {
        return;
    }

    //Обнулення змінної швидкості
    count = 0;

    //Очищаємо ігрове поле
    cx.clearRect(0, 0, canvas.width, canvas.height);

    //Рухаємо змійку з потрібною швидкістю
    snake.x += snake.dx;
    snake.y += snake.dy;

    //Якщо змійка на краю поля, то вихід з іншої сторони
    //Горизонталь
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }
    //Вертикаль
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    //Продовження руху у вибраному напрямку
    snake.cells.unshift({
        x: snake.x,
        y: snake.y,
    });

    //Видалення останньоло елементу масиву
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    /// Малюємо їжу
    //Skin 1 - Default
    if (skin == 1) {
        cx.fillStyle = color.pink_light;
        cx.shadowColor = color.pink_light;
    } else if (skin == 2) {
        cx.fillStyle = color.blue_light;
        cx.shadowColor = color.blue_light;
    } else if (skin == 3) {
        cx.fillStyle = color.red_light;
        cx.shadowColor = color.red_light;
    }
    cx.shadowBlur = 5;
    var miz = grid / 3.5;
    if (food_num == 1) {
        cx.fillRect(
            berry.x + miz / 2,
            berry.y + miz / 2,
            grid - miz,
            grid - miz
        );
    } else if (food_num == 2) {
        cx.fillRect(
            berry.x + miz / 2,
            berry.y + miz / 2,
            grid - miz,
            grid - miz
        );
        cx.fillRect(
            berry2.x + miz / 2,
            berry2.y + miz / 2,
            grid - miz,
            grid - miz
        );
    } else if (food_num == 3) {
        cx.fillRect(
            berry.x + miz / 2,
            berry.y + miz / 2,
            grid - miz,
            grid - miz
        );
        cx.fillRect(
            berry2.x + miz / 2,
            berry2.y + miz / 2,
            grid - miz,
            grid - miz
        );
        cx.fillRect(
            berry3.x + miz / 2,
            berry3.y + miz / 2,
            grid - miz,
            grid - miz
        );
    }

    /// Малюємо змійку
    snake.cells.forEach(function (cell, index) {
        //Skin 1 - Default
        if (skin == 1) {
            cx.shadowColor = color.pink_light;
            if (index == 0) {
                //Голова
                cx.fillStyle = color.pink_light;
            } else {
                //Тіло
                cx.fillStyle = color.pink;
            }
        }
        //Skin 2 - Blue
        else if (skin == 2) {
            cx.shadowColor = color.blue_light;
            if (index == 0) {
                //Голова
                cx.fillStyle = color.blue_light;
            } else {
                //Тіло
                cx.fillStyle = color.blue;
            }
        }
        //Skin 3 - Red
        else if (skin == 3) {
            cx.shadowColor = color.red_light;
            if (index == 0) {
                //Голова
                cx.fillStyle = color.red_light;
            } else {
                //Тіло
                cx.fillStyle = color.red;
            }
        }
        cx.shadowBlur = 30;
        cx.fillRect(cell.x, cell.y, grid, grid);

        /// Змійка з'їла їжу
        if (cell.x === berry.x && cell.y === berry.y) {
            //Збільшуємо довжину змійки і очки
            snake.maxCells++;
            score++;
            //Малюємо нову їжу
            //Поле 400x400 розбите на 25 клітинок
            berry.x = getRandomInt(0, 25) * grid;
            berry.y = getRandomInt(0, 25) * grid;
        }
        /// Змійка з'їла їжу 2
        if (cell.x === berry2.x && cell.y === berry2.y) {
            snake.maxCells++;
            score++;
            berry2.x = getRandomInt(0, 25) * grid;
            berry2.y = getRandomInt(0, 25) * grid;
        }
        /// Змійка з'їла їжу 3
        if (cell.x === berry3.x && cell.y === berry3.y) {
            snake.maxCells++;
            score++;
            berry3.x = getRandomInt(0, 25) * grid;
            berry3.y = getRandomInt(0, 25) * grid;
        }

        /// Кінець гри
        //Перевіряємо, чи змія не чіпає себе
        //Перебираємо масив і дивимось, чи є клітинки змійки з однаковими кордами
        for (var i = index + 1; i < snake.cells.length; i++) {
            //Якщо такі клітинки є, то починаєм гру заново
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                //Задаємо стартові параметри
                snake.x = 11 * grid;
                snake.y = 12 * grid;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                //Обнуляємо очки
                score = 0;
                //Ставимо їжу в рандомне місце
                berry.x = getRandomInt(0, 25) * grid;
                berry.y = getRandomInt(0, 25) * grid;
                //Ставимо їжу 2 в рандомне місце
                berry2.x = getRandomInt(0, 25) * grid;
                berry2.y = getRandomInt(0, 25) * grid;
                //Ставимо їжу 3 в рандомне місце
                berry3.x = getRandomInt(0, 25) * grid;
                berry3.y = getRandomInt(0, 25) * grid;
            }
        }
    });

    //Відображення очків
    var HTML_score = document.getElementById('score');
    HTML_score.innerHTML = 'Score: ' + score;

    //Відображення максимальних очків
    if (score > maxScore) {
        maxScore = score;
    }
    var HTML_score = document.getElementById('max');
    HTML_score.innerHTML = 'Max: ' + maxScore;
}

/// Controls
document.addEventListener('keydown', function (e) {
    //Якщо змійка рухається вліво, то якщо ще раз нажати вліво - нічого не зміниться
    //Якщо нажата стрілка вліво і при цьому змійка нікуди не рухається по горизонталі...
    //То ми їй жаємо рух по горизонталі (вліво), а по вертикалі - зупиняємо
    //Така ж логіка і в інших кнопках
    /// Стрілки
    if (e.which === 37 && snake.dx === 0) {
        //Вліво
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        //Вверх
        snake.dx = 0;
        snake.dy = -grid;
    } else if (e.which === 39 && snake.dx === 0) {
        //Вправо
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        //Вниз
        snake.dx = 0;
        snake.dy = grid;
    }
    /// ASWD
    if (e.which === 65 && snake.dx === 0) {
        //Вліво
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 87 && snake.dy === 0) {
        //Вверх
        snake.dx = 0;
        snake.dy = -grid;
    } else if (e.which === 68 && snake.dx === 0) {
        //Вправо
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 83 && snake.dy === 0) {
        //Вниз
        snake.dx = 0;
        snake.dy = grid;
    }
    // Кнопки
    //$(document).on("click", "#left", function () {
    //  snake.dx = -grid;
    //  snake.dy = 0;
    //});
    //$(document).on("click", "#up", function () {
    //  snake.dx = 0;
    //  snake.dy = -grid;
    //});
    //$(document).on("click", "#right", function () {
    //  snake.dx = grid;
    //  snake.dy = 0;
    //});
    //$(document).on("click", "#down", function () {
    //  snake.dx = 0;
    //  snake.dy = grid;
    //});
});

requestAnimationFrame(loop);
