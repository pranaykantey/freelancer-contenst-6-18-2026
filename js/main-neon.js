(function() {
    'use strict';

    // Preloader
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('preloaderNeon')?.classList.add('hidden');
        }, 1500);
    });

    // Cursor glow (neon)
    const cursorNeon = document.getElementById('cursorNeon');
    if (cursorNeon && window.innerWidth > 768) {
        document.addEventListener('mousemove', e => {
            cursorNeon.style.left = e.clientX + 'px';
            cursorNeon.style.top = e.clientY + 'px';
        });
    } else if (cursorNeon) {
        cursorNeon.style.display = 'none';
    }

    // Hero canvas — neon particles
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h, particles = [];

        function resize() {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        }

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 0.5;
                this.color = ['#00f0ff', '#ff2d78', '#ffd000', '#00ff88'][Math.floor(Math.random() * 4)];
                this.alpha = Math.random() * 0.6 + 0.2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function init() {
            resize();
            particles = [];
            for (let i = 0; i < 120; i++) particles.push(new Particle());
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = particles[i].color;
                        ctx.globalAlpha = (1 - dist / 100) * 0.15;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => { p.update(); p.draw(); });
            drawLines();
            requestAnimationFrame(animate);
        }

        init();
        animate();
        window.addEventListener('resize', resize);
    }

    // Nav scroll + active link
    const navNeon = document.getElementById('navNeon');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], div[id]');

    function handleNavScroll() {
        const scrollY = window.scrollY;
        if (navNeon) {
            navNeon.classList.toggle('scrolled', scrollY > 50);
        }

        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (scrollY >= top) current = section.id;
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // Mobile menu
    const toggleNeon = document.getElementById('navToggleNeon');
    const mobileNeon = document.getElementById('mobileMenuNeon');

    if (toggleNeon && mobileNeon) {
        toggleNeon.addEventListener('click', () => {
            toggleNeon.classList.toggle('active');
            mobileNeon.classList.toggle('active');
        });

        mobileNeon.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleNeon.classList.remove('active');
                mobileNeon.classList.remove('active');
            });
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                const offset = navNeon ? navNeon.offsetHeight : 0;
                window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    // Stats counter
    const statNums = document.querySelectorAll('.stat-neon-num');
    let statsCounted = false;

    function animateStats() {
        statNums.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            if (!target) return;
            const duration = 2000;
            const start = performance.now();

            function step(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        });
        statsCounted = true;
    }

    // Reveal
    const revealEls = document.querySelectorAll('.style-neon-card, .event-neon-card, .service-neon-item, .quote-neon-card, .section-neon-header');
    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    function handleReveal() {
        revealEls.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });

        // Trigger stats
        if (!statsCounted && statNums.length > 0) {
            const statsSection = document.querySelector('.section-stats-neon');
            if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight * 0.9) {
                animateStats();
            }
        }
    }

    window.addEventListener('scroll', handleReveal, { passive: true });
    setTimeout(handleReveal, 200);

    // Glitch on style cards hover
    document.querySelectorAll('.style-neon-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'glitch 0.15s ease';
            setTimeout(() => card.style.animation = '', 150);
        });
    });

    console.log('%c RUMPUREE//NEON ', 'background:#020309; color:#00f0ff; padding:4px 8px; border:1px solid #00f0ff; font-size:12px; font-family:monospace;');
})();
