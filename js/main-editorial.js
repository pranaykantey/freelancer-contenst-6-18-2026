(function() {
    'use strict';

    // Preloader
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('preloader')?.classList.add('hidden');
        }, 800);
    });

    // Nav scroll
    const nav = document.getElementById('navEditorial');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // Mobile menu
    const toggle = document.getElementById('navToggleEditorial');
    const mobile = document.getElementById('mobileMenuEditorial');

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
            const id = a.getAttribute('href');
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                const offset = nav ? nav.offsetHeight : 0;
                window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    // Reveal animations
    const revealEls = document.querySelectorAll('.schedule-editorial-item, .style-editorial-card, .event-editorial-card, .service-editorial-item, .section-editorial-header, .about-editorial-grid > *, .about-editorial-image');
    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    function handleReveal() {
        revealEls.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    window.addEventListener('scroll', handleReveal, { passive: true });
    setTimeout(handleReveal, 200);

    console.log('%c RUMPUREE // EDITORIAL ', 'background:#0a0a0a; color:#d4532b; padding:4px 8px; border:2px solid #d4532b; font-family:sans-serif; font-size:11px; letter-spacing:2px;');
})();
