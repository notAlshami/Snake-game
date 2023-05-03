let tileSize = 50;
let currentPosition = 0;
let foodPosition = 1;
let foodSize = 50;
let snakeLength = 1;
let bodyColor = 0;
let snakeBody = new Array();
let lastMove = "d";
snakeBody.push(currentPosition);
console.log(snakeBody);
let playTiles = document.getElementById("playTiles");
playTiles.style.setProperty("--tileSize",tileSize);
for(let i=0;i<tileSize*tileSize;++i){
    let tile = document.createElement("div");
    tile.classList.add("tile")
    playTiles.appendChild(tile)
}


let tiles = document.getElementsByClassName("tile");
tiles[currentPosition].classList.add("right");

let runFlag = true;
function run(){
console.log("HI");
    if(runFlag){
        drawSnake();
        if(lastMove == "d" ){
            tiles[currentPosition].classList.add("right")
            moveRight();
        }else if(lastMove == "s"){
            tiles[currentPosition].classList.add("down")

            moveDown();
        }else if(lastMove == "a"){
            tiles[currentPosition].classList.add("left")

            moveLeft();
        }else if(lastMove == "w"){
            tiles[currentPosition].classList.add("up")

            moveUp();
        }
        if(foodPosition == currentPosition){
            snakeLength+=foodSize;
            tiles[foodPosition].classList.remove("food");
            generateFood();

        }
        if(tiles[currentPosition].classList.contains("snakeBody")){
            gameOver();
        }
    }
}

window.addEventListener("keydown",e =>{
    if(lastMove =="")
    lastMove = e.key;
    
    
})

function generateFood(){
    foodPosition = Math.floor(Math.random()*(tileSize*tileSize));
    if(tiles[foodPosition].classList.contains("snakeHead")||tiles[foodPosition].classList.contains("snakeBody")){
        generateFood();
    }
}
function gameOver(){
    console.log("gameOver");
    runFlag = false;
}
function moveRight(){
    if((currentPosition +1)%tileSize == 0){
        gameOver();
    }else{
        currentPosition+=1;
        snakeBody.push(currentPosition);
    }
}
function moveLeft(){
    if((currentPosition )%tileSize == 0){
        gameOver();
    }else{
        currentPosition-=1;
        snakeBody.push(currentPosition);
    }
}
function moveUp(){
    if(currentPosition < tileSize){
        gameOver();
    }else{
        currentPosition-= tileSize
        snakeBody.push(currentPosition);

    }
}
function moveDown(){
    if(currentPosition >= tileSize*tileSize - tileSize){
        gameOver();
    }else{
        currentPosition+= tileSize
        snakeBody.push(currentPosition);

    }
}
function drawSnake(){
    resetTiles();
    for(let i = 0 ;i < Math.min(snakeBody.length,snakeLength);++i){

        if(i==0){
            tiles[snakeBody[snakeBody.length - 1]].classList.add("snakeHead");
            tiles[snakeBody[snakeBody.length - 1]].style.setProperty("--color",0);
        }
        else{
            
            tiles[snakeBody[snakeBody.length - (i+1)]].classList.add("snakeBody");
            tiles[snakeBody[snakeBody.length - (i+1)]].style.setProperty("--color",(360/snakeLength)*i);
            
            
        }
    }
    tiles[foodPosition].classList.add("food")
}
function resetTiles(){
    for(let i = 0; i<tileSize*tileSize;++i){
        tiles[i].className = "tile"
        tiles[i].style.setProperty("--color","");
    }
}


setInterval(run,50);