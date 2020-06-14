let canvas;
let ctx;
let stage;
let player;

const FPS = 50;

//DIMENSIONES DEL CANVAS EN PIXELS
const canvasWidth = 500;
const canvasHeight = 500;

const wallColour = '#000000';
const floorColour = '#666666';

const playerColour = '#FFFFFF';



//********************************
//LEVEL 1
//********************************

const levelOne = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
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

class Player {
  constructor(ctx, stage, spawnX, spawnY) {
    this.ctx = ctx;
    this.stage = stage;

    this.spawnX = spawnX;
    this.spawnY = spawnY;

    // 0 = parado, 1 = adelante, -1 = atrás
    this.move = 0;
    // -1 = giro a la izquierda, 1 = giro a la derecha
    this.rotate = 0;

    this.rotationAngle = 0;

    //En pixels
    this.speedMove = 3;
    //Velocidad de giro y pasamos de radianes a grados
    this.speedRotation = 3 * (Math.PI / 180);
  }

  drawPlayer() {
    //Asignamos el color
    this.ctx.fillStyle = playerColour;
    //Asignamos el tamaño del jugador
    this.ctx.fillRect(this.spawnX - 3, this.spawnY - 3, 6, 6);
  }
}

function startEngine() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  //SETEAR WIDTH Y HEIGHT
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  stage = new Level(canvas, ctx, levelOne);
  player = new Player(ctx, stage, 100, 100);

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
  player.drawPlayer();
}