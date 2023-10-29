let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

ctx.beginPath();
ctx.fillRect(50, 0, 100, 100)
ctx.stroke();