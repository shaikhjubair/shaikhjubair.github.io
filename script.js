/* =========================================
   1. Toggle Icon Navbar (Mobile Menu)
   ========================================= */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); // Change icon to 'X'
    navbar.classList.toggle('active'); // Show menu
};

/* =========================================
   2. Scroll Sections Active Link & Sticky Header
   ========================================= */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    // Highlight Navbar Links
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Sticky Header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when clicking a link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* =========================================
   3. Scroll Reveal Animation
   ========================================= */
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* =========================================
   4. Typed.js (AI Developer Personas)
   ========================================= */
const typed = new Typed('.multiple-text', {
    strings: ['AI Engineer', 'Deep Learning Specialist', 'Data Scientist', 'Python Developer'],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1000,
    loop: true
});

/* =========================================
   5. Dark/Light Mode Toggle
   ========================================= */
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('i');
const body = document.body;

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if(body.classList.contains('light-mode')){
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

/* =========================================
   6. Optimized Neural Network Background
   ========================================= */
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Resize Canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});
resizeCanvas(); // Initial call

// Create Particle Class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Update particle position
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Create particle array
function initParticles() {
    particlesArray = [];
    // Reduced particle count for better performance (Lag-free)
    let numberOfParticles = (canvas.height * canvas.width) / 15000; 

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        // Slower speed for smoother, less chaotic look
        let directionX = (Math.random() * 0.4) - 0.2; 
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#00f2ff'; // Cyan color

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Draw lines between particles (Neural Connections)
function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            // Connection distance limit
            if (distance < (canvas.width/9) * (canvas.height/9)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(0, 242, 255,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation Loop
function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

// Start Canvas
initParticles();
animateCanvas();