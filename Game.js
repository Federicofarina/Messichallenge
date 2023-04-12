const canvas = document.querySelector("canvas");
canvas.style.border ="4px solid black";
canvas.style.display = "none";
const ctx = canvas.getContext('2d');
const startScreen = document.querySelector(".game-intro");

  //Pitch Image
  const pitchImg = new Image()
  pitchImg.src = 'Assets/Pitch.jpg'
  //Messi Image
  const messiImg = new Image()
  messiImg.src = 'Assets/Messi.png'
  //Defender Image
  const defenderImg = new Image()
  defenderImg.src = 'Assets/Defender.png'

window.onload = () => {
  //hide the canvas until we press the start

  const restartBtn = document.querySelector("#restart");
  restartBtn.style.display = "none";
  const startBtn = document.querySelector("#start")

  function restart () {
    messiX = 430;
    messiY = 500;
    gameOver = false;
    defenders = []
    score = 0;
    restartBtn.style.display = "none";
    startGame();
  }

  let isMovingLeft = false;
  let isMovingRight = false;
  let isMovingUp = false;
  let isMovingDown = false;

  let messiX = 430;
  let messiY = 500;
  let messiWidth = 40;
  let messiHeight = 70;
  let messiSpeed = 4;


  
  /*let defenderX = 100;
  let defenderY = 100;
  let defenderWidth = 100;
  let defenderHeight = 120;*/

  let defenders = []

  class Defender {
    constructor (x, y, height, width, speed){
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.speed = speed
    }

  }

  const defender = () => {
    ctx.beginPath()
    ctx.drawImage(defenderImg, defenderX, defenderY, defenderWidth, defenderHeight)
    ctx.closePath()
  }
  //Random movement of the Defender
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max-min+1)) +min;
  }

  setInterval(function() {
    defenders.forEach(defender => {
      defender.x += getRandomInt(-1,3);
      defender.y += getRandomInt(-1,1);
    })
  }, 60);

  //Gol Line
  let rectX = 385;
  let rectY = 30;
  let rectWidth = 90;
  let rectHeight = 1;

  //Pitch Area
  let limitX = 52;
  let limitY = 31;
  let limitWidth = 755;
  let limitHeight = 638;

  let gameOver = false
  let animateId
  let score = 0

  const messi = () => {
    ctx.beginPath()
    ctx.drawImage(messiImg, messiX, messiY, messiWidth, messiHeight)
    ctx.closePath()
  }

  function drawRectangle () {
    document.getElementById('canvas');
    ctx.beginPath()
    ctx.fillStyle = "red"
    ctx.globalAlpha = 0,2;
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    ctx.globalAlpha = 1,0;
    ctx.globalAlpha = 0,2;
    ctx.strokeRect(limitX, limitY, limitWidth, limitHeight);
    ctx.globalAlpha = 1,0;
    ctx.lineWidth = 3;
    ctx.display
    ctx.closePath()
  };

  function drawScore () {
    ctx.beginPath();
    ctx.font = "24px verdana";
    ctx.fillStyle = "yellow";
    ctx.fillText(`Score : ${score}`, 10, 24);
    ctx.closePath
  }

  function checkCollision() {
    if(messiX + messiWidth > rectX &&
      // check if Messi´s left edge is to the left of the rectangle´s right edge
      messiX < rectX + rectWidth &&
      // check if Messi´s bottom edge is below the rectangle´s top edge
      messiY + messiHeight > rectY &&
      // check if Messi´s top edge is above the rectangle´s bottom edge
      messiY < rectY + rectHeight) {

        //Returns players to its initial position
        messiX = 430;
        messiY = 500;

        score++;
        defenders.push(new Defender(100, 200, 60, 80, 1))



      }else if(messiX < limitX ||
        // check if Messi´s left edge is to the left of the limit right edge
        messiX + messiWidth > limitX + limitWidth ||
        // check if Messi´s bottom edge is below the limit top edge
        messiY  < limitY ||
        // check if Messi´s top edge is above the limit bottom edge
        messiY + messiHeight > limitY + limitHeight) {
          console.log("collision!")

          gameOver = true;
        
        };
        
        defenders.forEach(defender =>{
          if(messiX + messiWidth > defender.x &&
            // check if Messi´s left edge is to the left of the defender right edge
            messiX < defender.x + defender.width &&
            // check if Messi´s bottom edge is below the defender top edge
            messiY + messiHeight > defender.y &&
            // check if Messi´s top edge is above the defender bottom edge
            messiY < defender.y + defender.height) {
    
              gameOver = true;
            }

        })
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(pitchImg, 0, 0, canvas.width, canvas.height);
    messi()
    defenders.forEach(defender =>{
    ctx.beginPath()
    ctx.drawImage(defenderImg, defender.x, defender.y, defender.width, defender.height)
    ctx.closePath()
    })
    drawScore()
    drawRectangle()
    checkCollision()

    if(isMovingLeft){
      messiX -= messiSpeed
    }
    else if(isMovingRight){
      messiX += messiSpeed
    }
    else if(isMovingDown){
        messiY += messiSpeed
    }
    else if(isMovingUp){
        messiY -= messiSpeed
    };

    if (gameOver){
      cancelAnimationFrame(animateId);
      restartBtn.style.display = "block";
    }
    else {
      animateId = requestAnimationFrame(animate)
    }
  }

  document.addEventListener('keydown', event =>{
    //console.log(event)
    if (event.key === 'ArrowLeft'){
      isMovingLeft = true
    }
    if (event.key === 'ArrowRight'){
      isMovingRight = true
    }
    if (event.key === 'ArrowUp'){
        isMovingUp = true
      }
      if (event.key === 'ArrowDown'){
        isMovingDown = true
      }
})

document.addEventListener('keyup', event =>{
  //console.log(event)
  if (event.key === 'ArrowLeft'){
    isMovingLeft = false
  }
  if (event.key === 'ArrowRight'){
    isMovingRight = false
  }
  if (event.key === 'ArrowUp'){
    isMovingUp = false
  }
  if (event.key === 'ArrowDown'){
    isMovingDown = false
  }
})

  function startGame() {
    console.log("Kick Off");
    startScreen.style.display = "none";
    canvas.style.display = "block";
    defenders.push(new Defender(100, 200, 60, 80, 1))
    animate()
    }
    startBtn.addEventListener('click', startGame)
    restartBtn.addEventListener('click',restart)
  }  