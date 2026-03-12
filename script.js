// Load click sound from GitHub raw URL
const CLICK_SOUND_URL = 'https://cdn.jsdelivr.net/gh/ketukini55/ketan-portfolio@main/click-sound.mp3';

let audioBuffer = null;
let audioContext = null;

// Initialize Audio Context
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Load the audio file from GitHub
async function loadClickSound() {
    if (audioBuffer) return;
    
    try {
        const context = initAudioContext();
        const response = await fetch(CLICK_SOUND_URL);
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer = await context.decodeAudioData(arrayBuffer);
    } catch (error) {
        console.error('Error loading sound:', error);
    }
}

// Play Custom Sound
function playCustomSound() {
    if (!audioContext) {
        initAudioContext();
    }
    
    if (!audioBuffer) {
        loadClickSound().then(() => {
            playSoundBuffer();
        });
    } else {
        playSoundBuffer();
    }
}

// Play the audio buffer
function playSoundBuffer() {
    try {
        if (audioBuffer && audioContext) {
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 0.3;
            
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            source.start(0);
        }
    } catch (error) {
        console.error('Error playing sound:', error);
    }
}

// Initialize audio on first user interaction
document.addEventListener('click', () => {
    initAudioContext();
    loadClickSound();
}, { once: true });

// Filter Projects Function
function filterProjects(category) {
    const cards = document.querySelectorAll('.graphic-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.5s ease-out';
        } else {
            card.classList.add('hidden');
        }
    });
}

// Filter Web Projects Function
function filterWebProjects(category) {
    const cards = document.querySelectorAll('.web-card');
    const buttons = document.querySelectorAll('.web-filter-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.5s ease-out';
        } else {
            card.classList.add('hidden');
        }
    });
}

// Cursor Animation
const cursorLight = document.querySelector('.cursor-light');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    if (cursorLight && cursorDot) {
        cursorLight.style.left = (e.clientX - 200) + 'px';
        cursorLight.style.top = (e.clientY - 200) + 'px';
        cursorDot.style.left = (e.clientX - 4) + 'px';
        cursorDot.style.top = (e.clientY - 4) + 'px';
    }
});

// Form Submission
function handleFormSubmit(event) {
    event.preventDefault();
    playCustomSound();
    
    const form = event.target;
    const formData = new FormData(form);
    
    console.log('Form submitted:', Object.fromEntries(formData));
    
    form.reset();
    alert('Thank you for reaching out! I will get back to you soon. 🚀');
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            playCustomSound();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        playCustomSound();
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '60px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.background = 'rgba(255, 255, 255, 0.95)';
        navMenu.style.backdropFilter = 'blur(10px)';
        navMenu.style.gap = '1rem';
        navMenu.style.padding = '2rem';
        navMenu.style.zIndex = '999';
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
}, 100);
