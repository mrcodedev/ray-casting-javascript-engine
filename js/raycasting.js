let canvas;
let ctx;
let stage;

const FPS = 50;

//DIMENSIONES DEL CANVAS EN PIXELS
const canvasWidth = 500;
const canvasHeight = 500;

const wallColour = '#000000';
const floorColour = '#666666';

//********************************
//LEVEL 1
//********************************

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

//********************************

class Level {
  constructor(canvas, ctx, levelMatrix) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.levelMatrix = levelMatrix;

    //DIMENSION ARRAY
    this.widthMatrix = this.levelMatrix[0].length;
    this.heightMatrix = this.levelMatrix.length;

    //DIMENSiONES REALES DEL CANVAN
    this.widthCanvas = this.canvas.width;
    this.heightCanvas = this.canvas.height;

    //DIMENSIONES DE LOS TILES
    this.widthTiles = parseInt(this.widthCanvas / this.widthMatrix);
    this.heightTiles = parseInt(this.heightCanvas / this.heightMatrix);
  }

  drawLevel() {
    let colour;

    for (let y = 0; y < this.heightMatrix; y++) {
      for (let x = 0; x < this.widthMatrix; x++) {
        if (this.levelMatrix[y][x] === 1) {
          colour = wallColour;
        } else {
          colour = floorColour;
        }

        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x * this.widthTiles, y * this.heightTiles, this.widthTiles, this.heightTiles);
      }
    }
  }
}

function startEngine() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  //SETEAR WIDTH Y HEIGHT
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  stage = new Level(canvas, ctx, levelOne);

  //INICIAMOS EL BUCLE PRINCIPAL DEL JUEGO
  setInterval(() => {
    drawEngine();
  }, 1000 / this.FPS);
}

function cleanCanvas() {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
}

function drawEngine() {
  cleanCanvas();
  stage.drawLevel();
}