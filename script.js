
// --------------------------------------------------
// CUSTOM CURSOR
// --------------------------------------------------
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // cursorOutline.style.left = `${posX}px`;
    // cursorOutline.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// --------------------------------------------------
// NAVBAR SCROLL EFFECT
// --------------------------------------------------
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --------------------------------------------------
// PARTICLES.JS INITIALIZATION
// --------------------------------------------------
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#6366f1" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": false },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#6366f1", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
    },
    "retina_detect": true
});

// --------------------------------------------------
// THREE.JS FLOATING ELEMENTS
// --------------------------------------------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Add shapes
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshPhongMaterial({
    color: 0x38bdf8,
    wireframe: true,
    emissive: 0x6366f1,
    emissiveIntensity: 0.5
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Setup Lights
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(20, 20, 20);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

camera.position.z = 40;

function animateThree() {
    requestAnimationFrame(animateThree);
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.002;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animateThree();

// --------------------------------------------------
// GSAP TYPING EFFECT (Simulated by simple script)
// --------------------------------------------------
class TxtType {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }
    tick() {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        let that = this;
        let delta = 200 - Math.random() * 100;
        if (this.isDeleting) { delta /= 2; }
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        setTimeout(function () { that.tick(); }, delta);
    }
}

window.onload = function () {
    let elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = ["Full-Stack Software Developer", "Flutter Mobile Expert", "Laravel Backend Engineer", "Startup Visionary"];
        let period = 2000;
        new TxtType(elements[i], toRotate, period);
    }

    // AOS Init
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });
};

// --------------------------------------------------
// GSAP SCROLL TRIGGERS
// --------------------------------------------------
gsap.registerPlugin(ScrollTrigger);

// Animation for skill bars
gsap.utils.toArray('.progress-bar').forEach(bar => {
    gsap.from(bar, {
        scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        width: 0,
        duration: 2,
        ease: "power2.out"
    });
});

// Animation for stats
gsap.utils.toArray('.stat-number').forEach(stat => {
    const value = { val: 0 };
    const target = parseInt(stat.getAttribute('data-target'));

    gsap.to(value, {
        scrollTrigger: {
            trigger: stat,
            start: "top 90%"
        },
        val: target,
        duration: 2,
        onUpdate: () => {
            stat.innerText = Math.round(value.val) + (target === 5 || target === 3 ? "+" : "%");
        }
    });
});

// --------------------------------------------------
// INTERACTIVE DEMO: STARTUP IDEA GENERATOR
// --------------------------------------------------
const ideas = [
    "AI-powered delivery platform for urban logistics",
    "Subscription-based platform for sustainable agriculture",
    "Blockchain-based voting system for universities",
    "Smart university finder with career roadmap AI",
    "On-demand laundry service with real-time tracking",
    "Micro-learning platform for specialized tech skills",
    "Automated inventory management for SMEs via IoT",
    "Health-tech platform connecting patients to local pharmacies"
];

const generateBtn = document.querySelector('#generate-btn');
const ideaDisplay = document.querySelector('#idea-display');

generateBtn.addEventListener('click', () => {
    gsap.to(ideaDisplay, {
        opacity: 0, y: -20, duration: 0.3, onComplete: () => {
            const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
            ideaDisplay.innerText = randomIdea;
            gsap.to(ideaDisplay, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" });
        }
    });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
