(function() {
    'use strict';

    // ===== SAFETY: if GSAP fails to load, reveal everything =====
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        document.documentElement.classList.add('js-ready');
        document.querySelectorAll('.hero-kinetic-title, .hero-kinetic-eyebrow, .hero-kinetic-desc, .hero-kinetic-actions, .schedule-kinetic-item, .style-kinetic-card, .event-kinetic-card, .about-kinetic-text, .about-kinetic-image, .about-kinetic-float-card, .service-kinetic-item, .testimonial-kinetic-card, .cta-kinetic-banner').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
        return;
    }

    const preloader = document.getElementById('preloader');
    document.documentElement.classList.add('js-ready');

    function initHeroAnimations() {
        const heroTitleLines = document.querySelectorAll('.hero-title-line');
        const heroEyebrow = document.querySelector('.hero-kinetic-eyebrow');
        const heroDesc = document.querySelector('.hero-kinetic-desc');
        const heroActions = document.querySelectorAll('.hero-kinetic-actions .btn-kinetic');

        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        if (heroEyebrow) heroTl.from(heroEyebrow, { y: 40, opacity: 0, duration: 0.8 }, 0.1);

        heroTitleLines.forEach((line, i) => {
            heroTl.from(line, { y: 100, opacity: 0, duration: 1, ease: 'power4.out' }, 0.3 + i * 0.15);
        });

        if (heroDesc) heroTl.from(heroDesc, { y: 30, opacity: 0, duration: 0.8 }, 0.8);

        if (heroActions.length) {
            heroTl.from(heroActions, { y: 20, opacity: 0, duration: 0.6, stagger: 0.15 }, 1);
        }

        gsap.from('.hero-kinetic-img', {
            yPercent: 15,
            opacity: 0.7,
            duration: 1.5,
            ease: 'power2.out'
        });

        gsap.from('.hero-kinetic-gradient', {
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out'
        });
    }

    function initAllAnimations() {
        initHeroAnimations();



        gsap.from('.schedule-kinetic-item', {
            y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.schedule-kinetic-list', start: 'top 82%', toggleActions: 'play none none none' }
        });

        document.querySelectorAll('.schedule-kinetic-item').forEach(item => {
            item.addEventListener('mouseenter', () => gsap.to(item, { x: 8, duration: 0.3, ease: 'power2.out' }));
            item.addEventListener('mouseleave', () => gsap.to(item, { x: 0, duration: 0.3, ease: 'power2.out' }));
        });

        gsap.from('.style-kinetic-card', {
            y: 60, opacity: 0, duration: 0.8, stagger: { amount: 0.8, from: 'start' }, ease: 'power3.out',
            scrollTrigger: { trigger: '.styles-kinetic-grid', start: 'top 78%', toggleActions: 'play none none none' }
        });

        document.querySelectorAll('.style-kinetic-card').forEach(card => {
            const hoverBg = card.querySelector('.style-kinetic-hover-bg');
            if (!hoverBg) return;
            card.addEventListener('mouseenter', () => {
                gsap.to(hoverBg, { opacity: 1, duration: 0.35, ease: 'power2.out' });
                gsap.to(card, { y: -5, duration: 0.3, ease: 'power2.out' });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(hoverBg, { opacity: 0, duration: 0.35, ease: 'power2.out' });
                gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
            });
        });

        gsap.from('.event-kinetic-card', {
            y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.events-kinetic-grid', start: 'top 80%', toggleActions: 'play none none none' }
        });

        gsap.from('.about-kinetic-text', {
            x: -60, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-kinetic-grid', start: 'top 76%', toggleActions: 'play none none none' }
        });

        gsap.from('.about-kinetic-image', {
            x: 60, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-kinetic-grid', start: 'top 76%', toggleActions: 'play none none none' }
        });

        gsap.from('.about-kinetic-float-card', {
            scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(1.7)', delay: 0.6,
            scrollTrigger: { trigger: '.about-kinetic-image-wrapper', start: 'top 72%', toggleActions: 'play none none none' }
        });

        const statNums = document.querySelectorAll('.about-kinetic-stat-num');
        let statsAnimated = false;
        ScrollTrigger.create({
            trigger: '.about-kinetic-stats',
            start: 'top 85%',
            onEnter: () => {
                if (statsAnimated) return;
                statsAnimated = true;
                statNums.forEach(el => {
                    const text = el.textContent.trim();
                    const hasPlus = text.includes('+');
                    const target = parseInt(text.replace(/\D/g, ''));
                    if (!target) return;
                    gsap.from(el, {
                        textContent: 0,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { textContent: 1 },
                        onUpdate: function() {
                            const current = Math.round(gsap.getProperty(el, 'textContent'));
                            el.textContent = current + (hasPlus ? '+' : '');
                        }
                    });
                });
            }
        });

        gsap.from('.service-kinetic-item', {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.services-kinetic-list', start: 'top 82%', toggleActions: 'play none none none' }
        });

        gsap.from('.testimonial-kinetic-card', {
            y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.testimonials-kinetic-grid', start: 'top 80%', toggleActions: 'play none none none' }
        });

        const ctaTl = gsap.timeline({
            scrollTrigger: { trigger: '.section-cta-kinetic', start: 'top 72%', toggleActions: 'play none none none' }
        });
        ctaTl.from('.cta-kinetic-banner', { y: 80, opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out' });
        ctaTl.from('.cta-kinetic-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.3);

        document.querySelectorAll('.section-kinetic-header').forEach(header => {
            const num = header.querySelector('.section-kinetic-num');
            const title = header.querySelector('.section-kinetic-title');
            const sub = header.querySelector('.section-kinetic-sub');
            const tl = gsap.timeline({
                scrollTrigger: { trigger: header, start: 'top 82%', toggleActions: 'play none none none' }
            });
            if (num) tl.from(num, { y: 20, opacity: 0, duration: 0.5 }, 0);
            if (title) tl.from(title, { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.1);
            if (sub) tl.from(sub, { y: 20, opacity: 0, duration: 0.5 }, 0.3);
        });

        ScrollTrigger.refresh();
    }

    // ===== CANVAS BACKGROUND =====
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h, particles = [], mouse = { x: null, y: null };

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.color = Math.random() > 0.5 ? '#d4532b' : '#2b5fd4';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (mouse.x !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) { this.x += dx * 0.01; this.y += dy * 0.01; }
                }
                if (this.x < -10 || this.x > w + 10 || this.y < -10 || this.y > h + 10) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
            }
        }

        for (let i = 0; i < 60; i++) particles.push(new Particle());

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = particles[i].color;
                        ctx.globalAlpha = (1 - dist / 150) * 0.12;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => { p.update(); p.draw(); });
            drawLines();
            ctx.globalAlpha = 1;
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();

        document.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
    }

    // ===== FLOATING SHAPES =====
    const floatShapes = [
        { x: '10%', y: '20%', size: 200, color: '#d4532b', opacity: 0.04, speed: 20 },
        { x: '80%', y: '60%', size: 300, color: '#2b5fd4', opacity: 0.03, speed: 25 },
        { x: '60%', y: '30%', size: 150, color: '#d4532b', opacity: 0.03, speed: 18 },
    ];

    floatShapes.forEach(shape => {
        const el = document.createElement('div');
        el.className = 'float-element';
        el.style.cssText = `width:${shape.size}px;height:${shape.size}px;background:${shape.color};left:${shape.x};top:${shape.y};opacity:${shape.opacity};filter:blur(80px);border-radius:50%;position:fixed;pointer-events:none;`;
        document.body.appendChild(el);

        gsap.to(el, {
            x: 'random(-50,50)',
            y: 'random(-50,50)',
            duration: shape.speed,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });

    // ===== MAGNETIC BUTTONS =====
    if (window.innerWidth > 768) {
        document.querySelectorAll('.btn-kinetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
            });
        });
    }

    // ===== NAV =====
    const nav = document.getElementById('navKinetic');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // ===== MOBILE MENU =====
    const toggle = document.getElementById('navToggleKinetic');
    const mobile = document.getElementById('mobileMenuKinetic');
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

    // ===== SMOOTH ANCHOR =====
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                const offset = nav ? nav.offsetHeight : 0;
                window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    // ===== BOOT =====
    function boot() {
        if (preloader) preloader.classList.add('hidden');
        initAllAnimations();
        ScrollTrigger.refresh();
        window.addEventListener('resize', () => ScrollTrigger.refresh());
    }

    if (document.readyState === 'complete') {
        setTimeout(boot, 100);
    } else {
        window.addEventListener('load', () => setTimeout(boot, 100));
    }

    console.log('%c RUMPUREE // KINETIC EDITION ', 'background:#0a0a0a; color:#d4532b; padding:5px 10px; font-family:serif; font-size:12px; letter-spacing:2px; border:1px solid #d4532b;');
})();
