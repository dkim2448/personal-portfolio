const canvas = document.getElementById('petalsCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const TOTAL = 20;
const petalArray = [];
const petalImg = new Image();
petalImg.src = 'assets/lightgraypetal.png';

let mouseX = 0;
function touchHandler(e) {
  mouseX = (e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0)) / window.innerWidth;
}
window.addEventListener('mousemove', touchHandler);
window.addEventListener('touchmove', touchHandler);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Petal {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 2 - canvas.height;
    this.w = 15 + Math.random() * 15;
    this.h = 20 + Math.random() * 10;
    this.opacity = this.w / 40;
    this.flip = Math.random();
    this.xSpeed = 1.5 + Math.random() * 2;
    this.ySpeed = 1 + Math.random() * 1;
    this.flipSpeed = Math.random() * 0.03;
  }
  
  draw() {
    if (this.y > canvas.height || this.x > canvas.width) {
      this.reset();
    }
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(
      petalImg,
      this.x,
      this.y,
      this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
      this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5)
    );
  }
  
  animate() {
    this.x += this.xSpeed + mouseX * 5;
    this.y += this.ySpeed + mouseX * 2;
    this.flip += this.flipSpeed;
    this.draw();
  }
}

// Add error handling for image loading
petalImg.onerror = (e) => {
  console.error('Error loading petal image:', e);
};

petalImg.onload = () => {
  console.log('Petal image loaded successfully');
  for (let i = 0; i < TOTAL; i++) {
    petalArray.push(new Petal());
  }
  render();
};

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petalArray.forEach((petal) => petal.animate());
  requestAnimationFrame(render);
}