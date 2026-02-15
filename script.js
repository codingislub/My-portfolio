// Cosmic Bento Interactivity

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    init3DTilt();
    initMobileMenu();
    initScrollAnimations();
});

// 1. Smooth Scroll (Native behavior + Offset)
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                const menu = document.querySelector('.mobile-menu');
                if (menu.classList.contains('active')) toggleMenu();
            }
        });
    });
}

// 2. 3D Tilt Effect for Bento Cards
function init3DTilt() {
    const cards = document.querySelectorAll('.bento-card, .project-card, .contact-card, .timeline-content');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -3; // Even more subtle tilt
            const rotateY = ((x - centerX) / centerX) * 3;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// 3. Mobile Menu Toggle
function toggleMenu() {
    const menu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    
    // Animate hamburger
    if (menu.classList.contains('active')) {
        hamburger.innerHTML = '✕'; // Simple close icon
        hamburger.style.color = 'var(--text-main)';
        hamburger.style.fontSize = '2rem';
    } else {
        hamburger.innerHTML = '<div class="bar"></div><div class="bar"></div>';
    }
}

function initMobileMenu() {
    // Ensure hamburger exists before attaching events (handled inline in HTML mostly)
}

// 4. Scroll Reveal Animations (Enhanced)
function initScrollAnimations() {
    // Add reveal classes to specific elements
    document.querySelectorAll('.bento-card').forEach((el, index) => {
        el.classList.add('reveal-up');
        el.classList.add(`stagger-${(index % 4) + 1}`);
    });

    document.querySelectorAll('.project-card').forEach((el, index) => {
        el.classList.add('reveal-up');
        el.classList.add(`stagger-${(index % 3) + 1}`);
    });

    document.querySelectorAll('.timeline-item').forEach((el, index) => {
        el.classList.add('reveal-left');
    });

    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('reveal-scale');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const animatedElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale');
    animatedElements.forEach(el => observer.observe(el));
}

// 5. Dynamic Navbar Background
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(5, 5, 5, 0.95)';
        nav.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
    } else {
        nav.style.background = 'rgba(5, 5, 5, 0.8)';
        nav.style.boxShadow = 'none';
    }
});