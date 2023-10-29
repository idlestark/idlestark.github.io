


//let canvas = document.getElementById("canvas");
//let ctx = canvas.getContext('2d');

var columnCount = 7;
var rowCount = 6;
var cellSize = 60;
var backgroundImage = new Image();

// Cargar la imagen de fondo    
backgroundImage.src = "https://mathcentral.uregina.ca/QQ/database/QQ.09.14/h/michael4.1.gif";

// Dibuja el fondo una vez que la imagen cargó
backgroundImage.onload = function() {
    for (let y = 0; y < rowCount; y++) {
        for (let x = 0; x < columnCount; x++) {
            const cellX = x * cellSize;
            const cellY = y * cellSize;
            ctx.drawImage(backgroundImage, cellX, cellY, cellSize, cellSize);
        }
    }
}

const buttons = [
    { x: 50, y: 100, width: 100, height: 40, label: "Botón 1" },
    { x: 50, y: 150, width: 100, height: 40, label: "Botón 2" },
    { x: 50, y: 200, width: 100, height: 40, label: "Botón 3" },
];

// Función para dibujar los botones
function drawButtons() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#3498db";
    ctx.font = "18px Arial";

    buttons.forEach((button) => {
        ctx.fillRect(button.x, button.y, button.width, button.height);
        ctx.fillStyle = "white";
        ctx.fillText(button.label, button.x + 10, button.y + 25);
    });
}

// Función para ocultar los botones
function hideButtons() {
    buttons.forEach((button) => {
        button.hidden = true;
    });
}

// Función a ejecutar al hacer clic en cualquiera de los botones
function onClickButton(event) {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;
    buttons.forEach((button) => {
        if (!button.hidden && x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height) {
            hideButtons();
            console.log("apretaste un botón")
        }
    });
}

// Dibujar los botones iniciales
drawButtons();

// Asignar el evento de clic al canvas
canvas.addEventListener("click", onClickButton);