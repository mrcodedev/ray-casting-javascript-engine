let canvas;
let ctx;

const FPS = 50;

//DIMENSIONES DEL CANVAS EN PIXELS
const canvasWidth = 500;
const canvasHeight = 500;

//****************************
//LEVEL 1
//****************************

const levelOne = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function startEngine() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  //SETEAR WIDTH Y HEIGHT
  this.canvas.width = canvasWidth;
  this.canvas.height = canvasHeight;

  //INICIAMOS EL BUCLE PRINCIPAL DEL JUEGO
  setInterval(() => {
    drawEngine();
  }, 1000 / FPS);
}

function cleanCanvas() {
  this.canvas.width = this.canvas.width;
  this.canvas.height = this.canvas.height;
}

function drawEngine() {
  cleanCanvas();
}
