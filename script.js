const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const loading = document.getElementById('loading');
const backToTop = document.getElementById('backToTop');
const typewriter = document.getElementById('typewriter');

window.addEventListener('load', function() {
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1500);
});

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

if (backToTop) {
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const phrases = [
    'Custom Script Roblox Berkualitas Tinggi',
    'Fast Delivery & Support 24/7',
    'Solusi Terbaik untuk Game Anda',
    'Developer Profesional Terpercaya'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterSpeed = 100;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typewriterSpeed = 50;
    } else {
        typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typewriterSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typewriterSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typewriterSpeed = 500;
    }
    
    setTimeout(typeWriter, typewriterSpeed);
}

if (typewriter) {
    setTimeout(typeWriter, 1000);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        }
    });
});

const canvas = document.getElementById('hero-canvas');

if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.floor(window.innerWidth / 10);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2,
                alpha: Math.random() * 0.5
            });
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${particle.alpha})`;
            ctx.fill();
        });
        
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    createParticles();
    animateParticles();
    
    window.addEventListener('resize', function() {
        resizeCanvas();
        createParticles();
    });
}

// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-slider');
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (!slider || !track || slides.length === 0) {
        console.log('Slider elements not found');
        return;
    }
    
    console.log('Slider initialized with', slides.length, 'slides');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    // Determine how many slides to show at once based on screen width
    function getSlidesPerView() {
        if (window.innerWidth <= 768) {
            return 1; // Mobile: show 1 card
        } else if (window.innerWidth <= 992) {
            return 2; // Tablet: show 2 cards
        } else {
            return 3; // Desktop: show 3 cards
        }
    }
    
    // Calculate total number of slide positions (considering cards per view)
    function getTotalSlidePositions() {
        const slidesPerView = getSlidesPerView();
        return Math.max(1, totalSlides - slidesPerView + 1);
    }
    
    function goToSlide(index) {
        const slidesPerView = getSlidesPerView();
        const translateX = (index * 100) / slidesPerView;
        track.style.transform = `translateX(-${translateX}%)`;
        
        slides.forEach((slide, i) => {
            const card = slide.querySelector('.testimonial-card');
            if (i >= index && i < index + slidesPerView) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const totalPositions = getTotalSlidePositions();
        const next = (currentSlide + 1) % totalPositions;
        goToSlide(next);
    }
    
    function prevSlide() {
        const totalPositions = getTotalSlidePositions();
        const prev = (currentSlide - 1 + totalPositions) % totalPositions;
        goToSlide(prev);
    }

    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Arrow click handlers
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            goToSlide(index);
        });
    });
    
    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }, { passive: true });
    
    // Handle resize to adjust slides per view
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const slidesPerView = getSlidesPerView();
            // Reset to first slide position if current position is invalid
            const maxSlide = totalSlides - slidesPerView;
            if (currentSlide > maxSlide) {
                currentSlide = Math.max(0, maxSlide);
            }
            goToSlide(currentSlide);
        }, 250);
    });
    stopAutoPlay();
    startAutoPlay();
});
