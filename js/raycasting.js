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

const visionPlayerColour = '#FFFFFF';
const widthVisionPlayer = 60;

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

  detectColisionMap(positionLevelX, positionLevelY) {
    let crash = false;

    crash = this.levelMatrix[positionLevelY][positionLevelX] !== 0 ? crash = true : crash;

    return crash;
  }

  //Dibujamos el nivel
  drawLevel() {
    let colour;

    //Pintamos la matriz asignando color
    for (let y = 0; y < this.heightMatrix; y++) {
      for (let x = 0; x < this.widthMatrix; x++) {
        colour = this.levelMatrix[y][x] === 1 ? colour = wallColour : colour = floorColour;

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

    //Donde aparece el jugador
    this.spawnX = spawnX;
    this.spawnY = spawnY;

    // 0 = parado, 1 = adelante, -1 = atrás
    this.move = 0;
    // -1 = giro a la izquierda, 1 = giro a la derecha
    this.rotate = 0;

    this.rotationAngle = 0;

    //En pixels
    this.speedMove = 1;
    //Velocidad de giro y pasamos de radianes a grados
    this.speedRotation = 3 * (Math.PI / 180);
  }

  //Mueve hacia arriba
  moveUp() {
    this.move = 1;
  }

  //Mueve hacia abajo
  moveDown() {
    this.move = -1;

  }

  //Mueve hacia la izquierda
  moveLeft() {
    this.rotate = -1;
  }

  //Mueve hacia la derecha
  moveRight() {
    this.rotate = 1;
  }

  //Para el movimiento cuando dejas de presionar arriba o abajo
  stopMove() {
    this.move = 0;
  }

  //Para la rotación cuando dejas de presionar izquierda o derecha
  stopRotate() {
    this.rotate = 0;
  }

  detectColisionPlayer(spawnX, spawnY) {
    let crash = false;

    //Averiguamos en que casilla está el jugador (box es casilla)
    let boxX = parseInt(spawnX / this.stage.widthTiles);
    let boxY = parseInt(spawnY / this.stage.widthTiles);

    crash = this.stage.detectColisionMap(boxX, boxY) ? crash = true : crash;

    return crash;
  }

  updatePlayerPosition() {
    //Nos movemos (avanzamos)
    let newX = this.spawnX + (this.move * Math.cos(this.rotationAngle) * this.speedMove);
    let newY = this.spawnY + (this.move * Math.sin(this.rotationAngle) * this.speedMove);

    if (!this.detectColisionPlayer(newX, newY)) {
      this.spawnX = newX;
      this.spawnY = newY;
    }

    //Giramos
    this.rotationAngle += this.rotate * this.speedRotation;
    this.rotationAngle = angleNormalizer(this.rotationAngle);
  }




  //Dibujamos al jugador con los datos
  drawPlayer() {
    this.updatePlayerPosition();

    //Asignamos el color
    this.ctx.fillStyle = playerColour;

    //Asignamos el tamaño del jugador
    this.ctx.fillRect(this.spawnX - 3, this.spawnY - 3, 6, 6);

    //Para ver la línea de dirección
    let xDestination = this.spawnX + Math.cos(this.rotationAngle) * widthVisionPlayer;
    let yDestination = this.spawnY + Math.sin(this.rotationAngle) * widthVisionPlayer;

    //Empezamos a dibujar la linea
    this.ctx.beginPath();
    this.ctx.moveTo(this.spawnX, this.spawnY);
    //Coordenadadas de destino
    this.ctx.lineTo(xDestination, yDestination);
    //Dibujamos la linea directamente
    this.ctx.strokeStyle = visionPlayerColour;
    this.ctx.stroke();
  }
}

function startEngine() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  //SETEAR WIDTH Y HEIGHT
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  //Inicializamos el stage
  stage = new Level(canvas, ctx, levelOne);
  //Inicializamos el jugador con su posición
  player = new Player(ctx, stage, 100, 100);

  //INICIAMOS EL BUCLE PRINCIPAL DEL JUEGO
  setInterval(() => {
    drawEngine();
  }, 1000 / this.FPS);
}

function cleanCanvas() {
  //Limpiamos el canvas llamándose a sí mismo
  canvas.width = canvas.width;
  canvas.height = canvas.height;
}

function drawEngine() {
  cleanCanvas();
  stage.drawLevel();
  player.drawPlayer();
}

function angleNormalizer(angle) {
  angle = angle % (2 * Math.PI);

  angle = angle < 0 ? angle + (2 * Math.PI) : angle;

  return angle;
}


//TODO: Para pasar a una clase
//Creamos un evento que detecte una tecla con arriba, abajo, izquierda y derecha
//38 Arriba, 40 Abajo, 37 Izquierda y 39 Derecha
this.document.addEventListener('keydown', (key) => {
  switch (key.keyCode) {
    case 38:
      player.moveUp();
      break;

    case 40:
      player.moveDown();
      break;

    case 37:
      player.moveLeft();
      break;

    case 39:
      player.moveRight();
      break;
  }

  //Creamos un evento cuando dejemos de presionar las teclas de movimiento
  //Dejamos de mover a la arriba y abajo, y paramos de girar a la izquierda o derecha
  document.addEventListener('keyup', (key) => {
    switch (key.keyCode) {
      case 38:
        player.stopMove();
        break;

      case 40:
        player.stopMove();
        break;

      case 37:
        player.stopRotate();
        break;

      case 39:
        player.stopRotate();
        break;
    }
  })
});