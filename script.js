document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    const hamburgerIcon = document.querySelector('.hamburger i');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        });
    });

    // 2. Sticky Navbar and Active Link Highlighting on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky nav shadow
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add offset to trigger active state nicely
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 3. Intersection Observer for Fade-in Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating to let the element stay visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 4. Form Submission Handler (Prevent default & show loading state for demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Show loading state
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin ml-2"></i>';
            btn.disabled = true;
            
            // Simulate network request
            setTimeout(() => {
                // Show success state
                btn.innerHTML = 'Message Sent! <i class="fas fa-check ml-2"></i>';
                btn.classList.replace('btn-primary', 'btn-secondary');
                contactForm.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-secondary', 'btn-primary');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
