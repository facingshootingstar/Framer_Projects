/* ============================================
   QueryPilot — Interactive Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- 1. Scroll Reveal ----
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });
    revealElements.forEach(el => revealObserver.observe(el));

    // ---- 2. Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ---- 3. Mobile Nav Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        // Close mobile nav when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ---- 4. FAQ Accordion ----
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            // Open clicked (if it wasn't already open)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ---- 5. Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- 6. Typing Animation for Demo ----
    const typingElement = document.getElementById('typingDemo');
    if (typingElement) {
        const originalText = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.borderRight = '2px solid var(--cyan)';

        let charIndex = 0;
        const startTyping = () => {
            if (charIndex < originalText.length) {
                typingElement.textContent += originalText[charIndex];
                charIndex++;
                setTimeout(startTyping, 40 + Math.random() * 30);
            } else {
                // Blinking cursor effect
                let blinks = 0;
                const blinkInterval = setInterval(() => {
                    typingElement.style.borderRight = blinks % 2 === 0 
                        ? '2px solid transparent' 
                        : '2px solid var(--cyan)';
                    blinks++;
                    if (blinks > 6) {
                        typingElement.style.borderRight = 'none';
                        clearInterval(blinkInterval);
                    }
                }, 500);
            }
        };

        // Start typing when hero is visible
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(startTyping, 800);
                heroObserver.disconnect();
            }
        }, { threshold: 0.3 });
        heroObserver.observe(typingElement.closest('.hero-demo'));
    }

    // ---- 7. Bar Chart Animation on Scroll ----
    const chartBars = document.querySelectorAll('.bar');
    if (chartBars.length > 0) {
        // Reset bars initially
        chartBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
            bar.style.opacity = '0';
        });

        const chartObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                chartBars.forEach(bar => {
                    bar.style.animationPlayState = 'running';
                });
                chartObserver.disconnect();
            }
        }, { threshold: 0.5 });

        const chartContainer = document.querySelector('.demo-chart');
        if (chartContainer) {
            chartObserver.observe(chartContainer);
        }
    }

    // ---- 8. Parallax on Hero Glows ----
    const glows = document.querySelectorAll('.hero-glow');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        glows.forEach((glow, i) => {
            const factor = (i + 1) * 15;
            glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    }, { passive: true });

    // ---- 9. Counter Animation for Stats ----
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const numMatch = text.match(/(\d+)/);
                if (numMatch) {
                    const target = parseInt(numMatch[1]);
                    const suffix = text.replace(numMatch[1], '');
                    let current = 0;
                    const step = Math.max(1, Math.floor(target / 40));
                    const duration = 1000;
                    const interval = duration / (target / step);

                    const counter = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(counter);
                        }
                        el.textContent = current + suffix;
                    }, interval);
                }
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => counterObserver.observe(el));

    // ---- 10. Active Nav Link Highlight ----
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(section => sectionObserver.observe(section));

});
