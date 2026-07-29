/* ============================================================
   Museum Dharma Bhakti Kostrad — Landing Page
   File    : js/script.js
   Fitur   : Mobile Menu, Sticky Navbar, Smooth Scroll,
             FAQ Accordion, Form Validation, Scroll Animation,
             Counter Animation
   ============================================================ */

// ---------------------------------------------------------
// 1. MOBILE MENU TOGGLE
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Tutup menu saat link diklik
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Tutup menu saat klik di luar
    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ---------------------------------------------------------
// 2. STICKY NAVBAR
// ---------------------------------------------------------
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// ---------------------------------------------------------
// 3. SMOOTH SCROLLING
// ---------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ---------------------------------------------------------
// 4. FAQ ACCORDION
// ---------------------------------------------------------
document.querySelectorAll('.faq-question').forEach(function (question) {
    question.addEventListener('click', function () {
        const parent = this.closest('.faq-item');
        const isActive = parent.classList.contains('active');

        // Tutup semua FAQ lainnya
        document.querySelectorAll('.faq-item').forEach(function (item) {
            item.classList.remove('active');
        });

        // Buka yang diklik (toggle)
        if (!isActive) {
            parent.classList.add('active');
        }
    });
});

// ---------------------------------------------------------
// 5. FORM VALIDATION
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    // Sembunyikan pesan error saat mulai mengetik
    nameInput.addEventListener('input', function () {
        this.classList.remove('error');
        nameError.classList.remove('visible');
        formSuccess.classList.remove('visible');
    });

    emailInput.addEventListener('input', function () {
        this.classList.remove('error');
        emailError.classList.remove('visible');
        formSuccess.classList.remove('visible');
    });

    messageInput.addEventListener('input', function () {
        this.classList.remove('error');
        messageError.classList.remove('visible');
        formSuccess.classList.remove('visible');
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        // Validasi Nama
        const nameValue = nameInput.value.trim();
        if (nameValue.length < 3) {
            nameInput.classList.add('error');
            nameError.classList.add('visible');
            isValid = false;
        } else {
            nameInput.classList.remove('error');
            nameError.classList.remove('visible');
        }

        // Validasi Email
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            emailInput.classList.add('error');
            emailError.classList.add('visible');
            isValid = false;
        } else {
            emailInput.classList.remove('error');
            emailError.classList.remove('visible');
        }

        // Validasi Pesan
        const messageValue = messageInput.value.trim();
        if (messageValue === '') {
            messageInput.classList.add('error');
            messageError.classList.add('visible');
            isValid = false;
        } else {
            messageInput.classList.remove('error');
            messageError.classList.remove('visible');
        }

        // Jika valid, tampilkan sukses
        if (isValid) {
            formSuccess.classList.add('visible');
            form.reset();

            // Sembunyikan setelah 5 detik
            setTimeout(function () {
                formSuccess.classList.remove('visible');
            }, 5000);
        }
    });
});

// ---------------------------------------------------------
// 6. SCROLL ANIMATION (Intersection Observer)
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // jika ingin sekali saja
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function (el) {
        observer.observe(el);
    });
});

// ---------------------------------------------------------
// 7. BONUS: COUNTER ANIMATION
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                animateCounter(el, target);
                counterObserver.unobserve(el); // hanya sekali
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
        counterObserver.observe(el);
    });

    function animateCounter(element, target) {
        let current = 0;
        const increment = Math.ceil(target / 60);
        const duration = 2000;
        const stepTime = Math.floor(duration / (target / increment));

        const timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current;
        }, stepTime);
    }
});
