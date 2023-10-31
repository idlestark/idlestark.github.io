//let canvas = document.getElementById("canvas");
//let ctx = canvas.getContext('2d');

var columnCount = 7;
var rowCount = 6;
var cellSize = 60;
var backgroundImage = new Image();


const buttons = [
    { x: 50, y: 100, width: 100, height: 40, label: "Botón 1" },
    { x: 50, y: 150, width: 100, height: 40, label: "Botón 2" },
    { x: 50, y: 200, width: 100, height: 40, label: "Botón 3" },
];

 // Definir una variable para rastrear si los botones están visibles
 var botonesVisibles = true;

        function dibujarBotones() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (botonesVisibles) {
                ctx.fillStyle = "blue";
                ctx.fillRect(50, 50, 135, 50);
                ctx.fillStyle = "green";
                ctx.fillRect(200, 50, 135, 50);
                ctx.fillStyle = "red";
                ctx.fillRect(350, 50, 135, 50);

                ctx.fillStyle = "white";
                ctx.font = "20px Arial";
                ctx.fillText("4 en Línea", 69, 85);
                ctx.fillText("5 en Línea", 220, 85);
                ctx.fillText("6 en Línea", 370, 85);
            }
        }

        function clicEnBoton(event) {
            if (botonesVisibles) {
                var x = event.clientX - canvas.getBoundingClientRect().left;
                var y = event.clientY - canvas.getBoundingClientRect().top;

                if (x >= 50 && x <= 150 && y >= 50 && y <= 100) {
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
                    
                } else if (x >= 200 && x <= 300 && y >= 50 && y <= 100) {
                // Cargar la imagen de fondo    
                backgroundImage.src = "https://mathcentral.uregina.ca/QQ/database/QQ.09.14/h/michael4.1.gif";

                 // Dibuja el fondo una vez que la imagen cargó
                 backgroundImage.onload = function() {
                rowCount = 8;
                columnCount = 7;
                 for (let y = 0; y < rowCount; y++) {
                    for (let x = 0; x < columnCount; x++) {
                         const cellX = x * cellSize;
                         const cellY = y * cellSize;
                        ctx.drawImage(backgroundImage, cellX, cellY, cellSize, cellSize);
                        }
                     }
                }
                    
                } else if (x >= 350 && x <= 450 && y >= 50 && y <= 100) {
                    // Cargar la imagen de fondo    
                backgroundImage.src = "https://mathcentral.uregina.ca/QQ/database/QQ.09.14/h/michael4.1.gif";

                // Dibuja el fondo una vez que la imagen cargó
                backgroundImage.onload = function() {
               rowCount = 9;
               columnCount = 11;
                for (let y = 0; y < rowCount; y++) {
                   for (let x = 0; x < columnCount; x++) {
                        const cellX = x * cellSize;
                        const cellY = y * cellSize;
                       ctx.drawImage(backgroundImage, cellX, cellY, cellSize, cellSize);
                       }
                    }
               }
                
                }
            }
        }

        canvas.addEventListener("click", clicEnBoton);

 canvas.addEventListener("click", clicEnBoton);

 dibujarBotones();