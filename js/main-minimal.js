(function() {
    'use strict';

    // Preloader
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('preloader')?.classList.add('hidden');
        }, 800);
    });

    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(() => hero.classList.add('active'), 100);
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const img = document.querySelector('.hero-img');
            if (img && scrolled < window.innerHeight) {
                img.style.transform = `scale(${1.05 - scrolled * 0.0001}) translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    // Nav scroll
    const nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // Mobile menu
    const toggle = document.getElementById('navToggle');
    const mobile = document.getElementById('mobileMenu');
    if (toggle && mobile) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            mobile.classList.toggle('active');
        });
        mobile.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                mobile.classList.remove('active');
            });
        });
    }

    // Smooth anchor
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = nav ? nav.offsetHeight : 0;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    // Testimonial slider
    const slides = document.querySelectorAll('.testimonial');
    const dotsContainer = document.getElementById('testDots');
    const prev = document.getElementById('testPrev');
    const next = document.getElementById('testNext');
    let current = 0;

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });
    }

    function goTo(i) {
        slides.forEach(s => s.classList.remove('active'));
        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
        slides[i].classList.add('active');
        current = i;
    }

    if (slides.length > 0) {
        createDots();
        if (prev) prev.addEventListener('click', () => goTo((current - 1 + slides.length) % slides.length));
        if (next) next.addEventListener('click', () => goTo((current + 1) % slides.length));
        setInterval(() => goTo((current + 1) % slides.length), 6000);
    }

    // Reveal animations
    const revealEls = document.querySelectorAll('.schedule-item, .style-card, .feature-item, .section-header, .about-grid > *, .cta-card');
    function handleReveal() {
        revealEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    window.addEventListener('scroll', handleReveal, { passive: true });
    setTimeout(handleReveal, 200);

    console.log('%c Rumpuree · Minimal Edition ', 'background:#1a1a1a; color:#ff6b35; padding:4px 8px; font-size:12px; letter-spacing:1px;');
})();
