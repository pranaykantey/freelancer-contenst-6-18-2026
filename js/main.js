(function() {
    'use strict';

    // ===== LOADING SCREEN =====
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }, 800);
    });

    // ===== CURSOR GLOW =====
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    } else if (cursorGlow) {
        cursorGlow.style.display = 'none';
    }

    // ===== PARTICLES BACKGROUND =====
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const colors = [
            'rgba(255, 107, 53, 0.4)',
            'rgba(108, 92, 231, 0.4)',
            'rgba(0, 206, 201, 0.4)',
            'rgba(253, 121, 168, 0.3)',
            'rgba(0, 184, 148, 0.3)',
            'rgba(255, 255, 255, 0.2)'
        ];

        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 4 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 25000);
        }

        for (let i = 0; i < 40; i++) {
            setTimeout(createParticle, Math.random() * 10000);
        }
        setInterval(createParticle, 600);
    }

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    function openMobileMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // ===== HERO CAROUSEL =====
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroIndicators = document.querySelectorAll('.hero-indicator');
    let currentHeroSlide = 0;
    let heroInterval;

    function goToHeroSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroIndicators.forEach(ind => ind.classList.remove('active'));

        heroSlides[index].classList.add('active');
        heroIndicators[index].classList.add('active');
        currentHeroSlide = index;
    }

    function nextHeroSlide() {
        const next = (currentHeroSlide + 1) % heroSlides.length;
        goToHeroSlide(next);
    }

    function startHeroCarousel() {
        heroInterval = setInterval(nextHeroSlide, 6000);
    }

    function resetHeroCarousel() {
        clearInterval(heroInterval);
        startHeroCarousel();
    }

    heroIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToHeroSlide(index);
            resetHeroCarousel();
        });
    });

    if (heroSlides.length > 0) {
        startHeroCarousel();
    }

    // ===== DANCE STYLES CAROUSEL =====
    const danceTrack = document.getElementById('danceTrack');
    const dancePrev = document.getElementById('dancePrev');
    const danceNext = document.getElementById('danceNext');
    const danceDots = document.getElementById('danceDots');
    let dancePosition = 0;
    let danceCardsPerView = getDanceCardsPerView();

    function getDanceCardsPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1.5;
        if (width <= 768) return 2.5;
        if (width <= 1024) return 3.5;
        return 4.5;
    }

    function getCardWidth() {
        if (!danceTrack) return 0;
        const card = danceTrack.querySelector('.dance-card');
        if (!card) return 300;
        const style = window.getComputedStyle(danceTrack);
        const gap = parseInt(style.gap) || 24;
        return card.offsetWidth + gap;
    }

    function getMaxDancePosition() {
        const cardWidth = getCardWidth();
        const trackWidth = danceTrack.scrollWidth;
        const viewWidth = danceTrack.parentElement.offsetWidth;
        return Math.max(0, trackWidth - viewWidth + cardWidth * 0.5);
    }

    function updateDanceDots() {
        if (!danceDots) return;
        const maxPos = getMaxDancePosition();
        const cardWidth = getCardWidth();
        const totalDots = Math.ceil(maxPos / cardWidth) + 1;
        const totalCards = danceTrack ? danceTrack.children.length : 0;
        const dotsCount = Math.min(totalDots, totalCards);

        danceDots.innerHTML = '';
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToDancePosition(i * cardWidth));
            danceDots.appendChild(dot);
        }
    }

    function updateDanceActiveDot() {
        if (!danceDots) return;
        const cardWidth = getCardWidth();
        const dots = danceDots.querySelectorAll('.carousel-dot');
        const activeIndex = Math.round(dancePosition / cardWidth);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    }

    function goToDancePosition(pos) {
        const maxPos = getMaxDancePosition();
        dancePosition = Math.max(0, Math.min(pos, maxPos));
        danceTrack.style.transform = `translateX(-${dancePosition}px)`;
        updateDanceActiveDot();
    }

    if (dancePrev && danceNext && danceTrack) {
        dancePrev.addEventListener('click', () => {
            goToDancePosition(dancePosition - getCardWidth());
        });

        danceNext.addEventListener('click', () => {
            goToDancePosition(dancePosition + getCardWidth());
        });

        // Drag functionality
        let isDragging = false;
        let startX, scrollStart;

        danceTrack.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX;
            scrollStart = dancePosition;
            danceTrack.style.cursor = 'grabbing';
            danceTrack.style.transition = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const x = e.pageX;
            const walk = startX - x;
            goToDancePosition(scrollStart + walk);
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                danceTrack.style.cursor = 'grab';
                danceTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });

        updateDanceDots();
    }

    window.addEventListener('resize', () => {
        danceCardsPerView = getDanceCardsPerView();
        if (danceTrack) updateDanceDots();
    });

    // ===== QUOTE SLIDER =====
    const quoteSlides = document.querySelectorAll('.quote-slide');
    const quoteDotsContainer = document.getElementById('quoteDots');
    const quotePrev = document.getElementById('quotePrev');
    const quoteNext = document.getElementById('quoteNext');
    let currentQuote = 0;

    function createQuoteDots() {
        if (!quoteDotsContainer) return;
        quoteDotsContainer.innerHTML = '';
        quoteSlides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('quote-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToQuote(i));
            quoteDotsContainer.appendChild(dot);
        });
    }

    function goToQuote(index) {
        quoteSlides.forEach(slide => slide.classList.remove('active'));
        if (quoteDotsContainer) {
            const dots = quoteDotsContainer.querySelectorAll('.quote-dot');
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        }
        quoteSlides[index].classList.add('active');
        currentQuote = index;
    }

    function nextQuote() {
        const next = (currentQuote + 1) % quoteSlides.length;
        goToQuote(next);
    }

    function prevQuote() {
        const prev = (currentQuote - 1 + quoteSlides.length) % quoteSlides.length;
        goToQuote(prev);
    }

    if (quotePrev) quotePrev.addEventListener('click', prevQuote);
    if (quoteNext) quoteNext.addEventListener('click', nextQuote);

    if (quoteSlides.length > 0) {
        createQuoteDots();
        // Auto-advance quotes
        setInterval(nextQuote, 8000);
    }

    // ===== SERVICES HORIZONTAL SCROLL =====
    const servicesTrack = document.getElementById('servicesTrack');
    const servicesPrev = document.getElementById('servicesPrev');
    const servicesNext = document.getElementById('servicesNext');
    const servicesProgress = document.getElementById('servicesProgress');
    const servicesViewBtn = document.getElementById('servicesViewBtn');
    let servicesGridView = false;

    function updateServicesProgress() {
        if (!servicesTrack || !servicesProgress) return;
        const maxScroll = servicesTrack.scrollWidth - servicesTrack.clientWidth;
        if (maxScroll <= 0) {
            servicesProgress.style.width = '100%';
            return;
        }
        const progress = (servicesTrack.scrollLeft / maxScroll) * 100;
        servicesProgress.style.width = Math.min(100, Math.max(0, progress)) + '%';
    }

    function scrollServices(direction) {
        if (!servicesTrack) return;
        const cardWidth = servicesTrack.querySelector('.service-card')?.offsetWidth || 320;
        const gap = 24;
        servicesTrack.scrollBy({
            left: direction * (cardWidth + gap),
            behavior: 'smooth'
        });
    }

    if (servicesPrev) servicesPrev.addEventListener('click', () => scrollServices(-1));
    if (servicesNext) servicesNext.addEventListener('click', () => scrollServices(1));

    if (servicesTrack) {
        servicesTrack.addEventListener('wheel', (e) => {
            const maxScroll = servicesTrack.scrollWidth - servicesTrack.clientWidth;
            if (maxScroll <= 0) return;

            const scrollingDown = e.deltaY > 0;
            const nearStart = servicesTrack.scrollLeft <= 5;
            const nearEnd = servicesTrack.scrollLeft >= maxScroll - 5;

            if (scrollingDown && nearEnd) return;
            if (!scrollingDown && nearStart) return;

            e.preventDefault();
            servicesTrack.scrollLeft += e.deltaY * 1.2;
            updateServicesProgress();
        }, { passive: false });

        servicesTrack.addEventListener('scroll', updateServicesProgress);
        setTimeout(updateServicesProgress, 100);
    }

    if (servicesViewBtn) {
        servicesViewBtn.addEventListener('click', () => {
            servicesGridView = !servicesGridView;
            const cards = document.querySelectorAll('.service-card');
            if (servicesGridView) {
                cards.forEach(card => {
                    card.style.flex = '0 0 calc(50% - 0.75rem)';
                    card.style.minWidth = '300px';
                });
                servicesViewBtn.innerHTML = '<i class="fa-solid fa-bars"></i>&nbsp; List View';
            } else {
                cards.forEach(card => {
                    card.style.flex = '';
                    card.style.minWidth = '280px';
                });
                servicesViewBtn.innerHTML = '<i class="fa-solid fa-grip"></i>&nbsp; Grid View';
            }
        });
    }

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    function handleReveal() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const triggerPoint = windowHeight * 0.85;

            if (rect.top < triggerPoint) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleReveal);
    window.addEventListener('resize', handleReveal);
    // Initial check
    setTimeout(handleReveal, 100);

    // ===== SMOOTH ANCHOR SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== DANCE CARD HOVER TILT EFFECT =====
    if (window.innerWidth > 768) {
        document.querySelectorAll('.dance-card, .event-card, .service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s ease';
                setTimeout(() => {
                    card.style.transition = '';
                }, 500);
            });
        });
    }

    // ===== COUNTER ANIMATION (for stats if added later) =====
    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                el.textContent = Math.floor(target);
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(start);
            }
        }, 16);
    }

    // ===== MAGNETIC BUTTONS (optional polish) =====
    if (window.innerWidth > 768) {
        document.querySelectorAll('.about-btn, .hero-cta, .footer-btn, .nav-login').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
                btn.style.transition = 'transform 0.4s ease';
                setTimeout(() => { btn.style.transition = ''; }, 400);
            });
        });
    }

    console.log('%c💃 Rumpuree Dance Studio %cEnhanced Version',
        'font-size: 1.5rem; font-weight: bold; color: #ff6b35;',
        'font-size: 0.9rem; color: #aaa;');
    console.log('%cModern CSS • Cool Effects • Smooth Animations',
        'font-size: 0.8rem; color: #6c5ce7;');

})();
