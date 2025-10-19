document.addEventListener('DOMContentLoaded', function () {

    /* =====================================
       1. Scroll Reveal Animations
       ===================================== */
    const revealElements = document.querySelectorAll('.reveal-on-load, .reveal-left, .reveal-right, .reveal-bottom');

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.classList.add('visible');
    }


    /* =====================================
       2. Typing Effect for Hero Section
       ===================================== */
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const roles = ["Full-Stack Developer", "Front-End Enthusiast", "Back-End Architect", "Problem Solver"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeEffect() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typedTextElement.textContent = currentRole.substring(0, charIndex--);
            } else {
                typedTextElement.textContent = currentRole.substring(0, charIndex++);
            }

            if (!isDeleting && charIndex === currentRole.length + 1) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex < 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500;
            } else {
                typingSpeed = isDeleting ? 50 : 100;
            }
            setTimeout(typeEffect, typingSpeed);
        }
        setTimeout(typeEffect, 1500);
    }


    /* =====================================
       3. Active Navigation Link on Scroll
       ===================================== */
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');

    function highlightNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 90) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();


    /* =====================================
       4. Skill Bar Animation
       ===================================== */
    const skillLevels = document.querySelectorAll('.skill-level');

    const skillObserverOptions = {
        root: null,
        threshold: 0.7,
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = level;
                observer.unobserve(entry.target);
            }
        });
    }, skillObserverOptions);

    skillLevels.forEach(skill => {
        skillObserver.observe(skill);
    });


    /* =====================================
       5. Project Carousel
       ===================================== */
    const carousel = document.querySelector('.project-carousel');
    if (carousel) {
        const projectCards = document.querySelectorAll('.project-card');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const carouselDotsContainer = document.querySelector('.carousel-dots');

        let currentIndex = 0;
        const cardWidth = projectCards[0].offsetWidth + 30;

        projectCards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            carouselDotsContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll('.carousel-dots .dot');

        function updateCarousel() {
            carousel.scrollLeft = currentIndex * cardWidth;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : projectCards.length - 1;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < projectCards.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });


        updateCarousel();
    }

    /* =====================================
       6. Theme Toggle (Light/Dark Mode)
       ===================================== */
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.add(savedTheme);
            darkModeToggle.checked = (savedTheme === 'dark-mode');
        } else {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }

        darkModeToggle.addEventListener('change', function () {
            if (this.checked) {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }


    /* =====================================
       7. Mobile Nav Menu (Burger Menu)
       ===================================== */
    const menuIcon = document.getElementById('menuIcon');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    if (menuIcon && mobileNavOverlay) {
        menuIcon.addEventListener('click', () => {
            mobileNavOverlay.classList.toggle('open');
            menuIcon.querySelector('i').classList.toggle('fa-bars');
            menuIcon.querySelector('i').classList.toggle('fa-times');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('open');
                menuIcon.querySelector('i').classList.add('fa-bars');
                menuIcon.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    /* =====================================
       8. Parallax Effect (for sections with .parallax class)
       ===================================== */
    const parallaxSections = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', function () {
        parallaxSections.forEach(section => {
            const distance = window.scrollY - section.offsetTop;
            const parallaxAmount = distance * 0.3;
            section.style.setProperty('--bg-offset', `${parallaxAmount}px`);
        });
    });

});