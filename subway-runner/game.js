const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight


let lane = 1
let lanes = [
canvas.width/2 -120,
canvas.width/2,
canvas.width/2 +120
]

let player = {
x: lanes[lane],
y: canvas.height-200,
width:60,
height:60,
vy:0
}


let obstacles = []

let score = 0


function spawnObstacle(){

let randomLane = Math.floor(Math.random()*3)

obstacles.push({

x: lanes[randomLane],
y:-100,
width:70,
height:70

})

}

setInterval(spawnObstacle,1200)



let startX = 0
let startY = 0

window.addEventListener("touchstart",e=>{

startX = e.touches[0].clientX
startY = e.touches[0].clientY

})

window.addEventListener("touchend",e=>{

let dx = e.changedTouches[0].clientX - startX
let dy = e.changedTouches[0].clientY - startY

if(Math.abs(dx) > Math.abs(dy)){

if(dx > 40) lane = Math.min(2,lane+1)
if(dx < -40) lane = Math.max(0,lane-1)

}else{

if(dy < -40 && player.y >= canvas.height-200){
player.vy = -18
}

}

})


function update(){

player.x += (lanes[lane] - player.x)*0.2

player.y += player.vy
player.vy += 1

if(player.y > canvas.height-200){
player.y = canvas.height-200
player.vy = 0
}


for(let i=0;i<obstacles.length;i++){

obstacles[i].y += 10

if(

player.x < obstacles[i].x + obstacles[i].width &&
player.x + player.width > obstacles[i].x &&
player.y < obstacles[i].y + obstacles[i].height &&
player.y + player.height > obstacles[i].y

){

alert("Game Over | Score: "+score)
location.reload()

}

if(obstacles[i].y > canvas.height){
obstacles.splice(i,1)
score++
}

}

}



function draw(){

ctx.fillStyle="#222"
ctx.fillRect(0,0,canvas.width,canvas.height)


ctx.fillStyle="red"
ctx.fillRect(player.x,player.y,player.width,player.height)


ctx.fillStyle="yellow"

for(let o of obstacles){

ctx.fillRect(o.x,o.y,o.width,o.height)

}


ctx.fillStyle="white"
ctx.font="40px Arial"
ctx.fillText("Score: "+score,40,60)

}


function gameLoop(){

update()
draw()

requestAnimationFrame(gameLoop)

}

gameLoop()