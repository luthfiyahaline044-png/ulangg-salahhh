/* ================= 1. MUSIC PLAYER LOGIC ================= */
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
  if (!isPlaying) {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicText.textContent = 'Pause Music';
      musicIcon.classList.remove('fa-music');
      musicIcon.classList.add('fa-pause');
    }).catch(err => {
      console.log("Autoplay restricted: ", err);
    });
  } else {
    bgMusic.pause();
    isPlaying = false;
    musicText.textContent = 'Play Music';
    musicIcon.classList.remove('fa-pause');
    musicIcon.classList.add('fa-music');
  }
});

/* ================= 2. BABY BLUE & PINK HEART RAIN EFFECT ================= */
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 20;
    this.size = Math.random() * 14 + 6;
    this.speedY = Math.random() * 1.2 + 0.4;
    this.speedX = Math.sin(Math.random() * Math.PI) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.3;
    
    // Warna gabungan Baby Blue (195° - 210°) & Soft Pink (330° - 350°)
    const isBlue = Math.random() > 0.4;
    const hue = isBlue ? Math.random() * 20 + 195 : Math.random() * 20 + 330;
    this.color = `hsla(${hue}, 90%, 80%, ${this.opacity})`;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -20) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    let topCurveHeight = this.size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
    ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
    ctx.bezierCurveTo(0, this.size, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
    ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

function initHearts() {
  hearts = [];
  const heartCount = Math.floor(window.innerWidth / 22);
  for (let i = 0; i < heartCount; i++) {
    hearts.push(new Heart());
  }
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animateHearts);
}

initHearts();
animateHearts();

/* ================= 3. CONFETTI EFFECT ================= */
function triggerConfetti() {
  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#7dd3fc', '#f472b6', '#38bdf8', '#fbcfe8']
  });
}

function triggerSurprise() {
  confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#7dd3fc', '#f472b6'] });
  confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#7dd3fc', '#f472b6'] });
}

/* ================= 4. MODAL LOGIC ================= */
const letterModal = document.getElementById('letterModal');
const memoryModal = document.getElementById('memoryModal');

function openLetterModal() {
  letterModal.classList.add('modal-active');
  triggerConfetti();
}

function closeLetterModal() {
  letterModal.classList.remove('modal-active');
}

function openMemoryModal() {
  memoryModal.classList.add('modal-active');
}

function closeMemoryModal() {
  memoryModal.classList.remove('modal-active');
}

/* ================= 5. MEMORY SLIDER LOGIC ================= */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide-item');
const indicator = document.getElementById('slideIndicator');

function showSlide(index) {
  slides.forEach((slide, idx) => {
    if (idx === index) {
      slide.classList.remove('hidden');
    } else {
      slide.classList.add('hidden');
    }
  });
  indicator.textContent = `${index + 1} / ${slides.length}`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}