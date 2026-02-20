let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
            });
        }
    });
    
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 100);

    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
};

ScrollReveal({
    reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200
});
ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(".home-img, .services-container, .portfolio-box, .contact form", { origin: "bottom" });
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

const typed = new Typed(".multiple-text", {
    strings: ["Data Scientist", "AI Engineer", "Python Developer", "Problem Solver"],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1000,
    loop: true
});

const themeBtn = document.getElementById("theme-toggle");
const themeIcon = themeBtn.querySelector("i");
const body = document.body;

themeBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
});

const canvas = document.getElementById("neural-canvas");
const ctx = canvas.getContext("2d");
let particlesArray;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
});
resizeCanvas();

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 12000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
        let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
        let directionX = Math.random() * 0.4 - 0.2;
        let directionY = Math.random() * 0.4 - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, "#00f2ff"));
    }
}

function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) 
                         + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (canvas.width / 9) * (canvas.height / 9)) {
                opacityValue = 1 - distance / 20000;
                ctx.strokeStyle = "rgba(0, 242, 255," + opacityValue + ")";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}
initParticles();
animateCanvas();

// ==========================================
// 6. EMAILJS (CONTACT FORM SUBMISSION)
// ==========================================
emailjs.init("_dvPiEqtWRR326LJR"); 

document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let btn = this.querySelector("button");
    let originalText = "Send Message";
    
    btn.innerText = "Sending...";
    btn.style.opacity = "0.7";
    btn.disabled = true;
    
    emailjs.sendForm("service_jubair", "template_2usk70q", this)
        .then(() => {
            btn.innerText = "Message Sent! ✅";
            btn.style.background = "#2ecc71";
            btn.style.borderColor = "#2ecc71";
            btn.style.boxShadow = "0 0 20px #2ecc71";
            btn.style.opacity = "1";
            
            document.getElementById("contact-form").reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
                btn.style.borderColor = "";
                btn.style.boxShadow = "";
                btn.disabled = false;
            }, 5000);
            
        }, (error) => {
            btn.innerText = "Error! ❌";
            btn.style.background = "#ff4d4d";
            btn.style.borderColor = "#ff4d4d";
            btn.style.boxShadow = "0 0 20px #ff4d4d";
            btn.disabled = false;
            
            console.log(JSON.stringify(error));
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "";
                btn.style.borderColor = "";
                btn.style.boxShadow = "";
            }, 5000);
        });
});
