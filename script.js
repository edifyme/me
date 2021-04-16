const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
const numberOfParticles = 700;
let title1 = document.getElementById('title1');
let titleMeasure = title1.getBoundingClientRect();
let title = {
  x:titleMeasure.left,
  y:titleMeasure.top,
  width:titleMeasure.width,
  height:10
}

class Particle {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 3;
    this.weight = 2;
    this.directionX = -2;
  }
  update(){
    if(this.y >canvas.height){
      this.size = Math.random()*3;
      this.y = 0-this.size;
      this.x = Math.random()*canvas.width+120;
      this.weight = 2;
    }
    this.weight += 0.05;
    this.y += this.weight;
    this.x += this.directionX;
    // check for collision between particle and title
    if( this.x < title.x + title.width &&
        this.x + this.size > title.x &&
        this.y < title.y + title.height &&
        this.y + this.size > title.y ){
          this.y  -= 3;
          this.weight *= -0.2;
        }
  }
  draw(){
    ctx.fillStyle = 'rgba(150,150,150,0.1)';
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
  }
}

function init(){
  particleArray = [];
  for(let i=0; i<numberOfParticles; i++){
    const x = Math.random()*canvas.width;
    const y = Math.random()*canvas.height;
    particleArray.push(new Particle(x,y));
  }
}
init();

function animate(){
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  for(let i=0; i<particleArray.length; i++){
    particleArray[i].update();
    particleArray[i].draw();
  }
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  titleMeasure = title1.getBoundingClientRect();
  title = {
    x: titleMeasure.left,
    y: titleMeasure.top,
    width: titleMeasure.width,
    height: 10
  }
  init();
})