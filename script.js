/* =========================================
   1. MOBILE MENU & NAVIGATION LOGIC
   ========================================= */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggle Menu on Click
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); // আইকন ক্রস (X) হয়ে যাবে
    navbar.classList.toggle('active'); // মেনু স্লাইড করে আসবে
};

/* =========================================
   2. STICKY HEADER & ACTIVE LINK HIGHLIGHT
   ========================================= */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    // স্ক্রল করার সাথে সাথে মেনু হাইলাইট হবে
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

    // স্টিকি হেডার (Sticky Header) এফেক্ট
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // স্ক্রল করলে মোবাইল মেনু অটো বন্ধ হয়ে যাবে
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* =========================================
   3. SCROLL REVEAL ANIMATION (HIGH-END)
   ========================================= */
ScrollReveal({
    reset: true, // বারবার এনিমেশন হবে (চাইলে false করতে পারেন)
    distance: '80px',
    duration: 2000,
    delay: 200
});

// উপর থেকে আসবে
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });

// নিচ থেকে আসবে
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });

// বাম দিক থেকে আসবে
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });

// ডান দিক থেকে আসবে
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* =========================================
   4. TYPED.JS (AUTO TYPING TEXT)
   ========================================= */
const typed = new Typed('.multiple-text', {
    strings: ['Data Scientist', 'AI Engineer', 'Python Developer', 'Problem Solver'],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1000,
    loop: true
});

/* =========================================
   5. DARK/LIGHT MODE TOGGLE
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
   6. OPTIMIZED NEURAL NETWORK BACKGROUND 🧠
   ========================================= */
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// ক্যানভাস সাইজ ঠিক করা
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});
resizeCanvas(); 

// Particle Class (কণা তৈরির লজিক)
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // কণা আঁকা
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // কণার নড়াচড়া
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

// কণাগুলোর অ্যারে তৈরি করা
function initParticles() {
    particlesArray = [];
    // স্ক্রিন সাইজ অনুযায়ী কণার সংখ্যা নির্ধারণ (Performance Boost)
    let numberOfParticles = (canvas.height * canvas.width) / 12000; 

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        
        // গতিবেগ (Speed Control)
        let directionX = (Math.random() * 0.4) - 0.2; 
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#00f2ff'; // Cyan Color (Futuristic Look)

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// কণাগুলোর মধ্যে লাইন কানেক্ট করা (Neural Connections)
function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (canvas.width/9) * (canvas.height/9)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(0, 242, 255,' + opacityValue + ')'; // Cyan Lines
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// অ্যানিমেশন লুপ
function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

// অ্যানিমেশন শুরু
initParticles();
animateCanvas();

/* =========================================
   7. CONTACT FORM (EMAIL JS SYSTEM) 📧
   ========================================= */
(function() {
    emailjs.init("zEqO8VxQ6Jyt0azg6"); 
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const btn = this.querySelector('button');
    const originalText = 'Send Message'; // আপনার বাটনের ডিফল্ট টেক্সট
    
    // লোডিং স্টেট
    btn.innerText = 'Sending...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    const serviceID = 'service_rmicabe'; 
    const templateID = 'template_4i4885g'; 

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            // ১. কোনো alert থাকবে না
            // ২. বাটনের টেক্সট এবং লুক পরিবর্তন (Neon Success)
            btn.innerText = 'Message Sent! ✅';
            btn.style.background = '#2ecc71'; // Green
            btn.style.borderColor = '#2ecc71';
            btn.style.boxShadow = '0 0 20px #2ecc71';
            btn.style.opacity = '1';

            document.getElementById('contact-form').reset();

            // ৩. ৫ সেকেন্ড পর বাটন আগের অবস্থায় ফিরবে
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = ''; // CSS থেকে ডিফল্ট কালার নিবে
                btn.style.borderColor = '';
                btn.style.boxShadow = '';
                btn.disabled = false;
            }, 5000);

        }, (err) => {
            // ব্যর্থ হলে বাটনের লুক (Neon Error)
            btn.innerText = 'Error! ❌';
            btn.style.background = '#ff4d4d'; // Red
            btn.style.borderColor = '#ff4d4d';
            btn.style.boxShadow = '0 0 20px #ff4d4d';
            btn.disabled = false;
            
            console.log(JSON.stringify(err));
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.boxShadow = '';
            }, 5000);
        });
});
