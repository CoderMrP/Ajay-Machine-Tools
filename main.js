document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // Navbar Scroll Effect & Active Link Highlighting
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Navbar styling
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Scroll Reveal Animation
        revealElements();
    });

    // Scroll Reveal Animation Function
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
        
        // Staggered reveals for cards
        const staggeredReveals = document.querySelectorAll('.feature-card, .product-card');
        staggeredReveals.forEach((el, index) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                // Add staggered delay inline if no class exists (fallback)
                if(!el.classList.contains('reveal-delay-1') && !el.classList.contains('reveal-delay-2') && !el.classList.contains('reveal-delay-3') && !el.classList.contains('reveal-delay-4')) {
                    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
                }
                el.classList.add('active');
            }
        });
    }
    
    // Trigger outline reveal on load
    revealElements();

    // Product Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Enquiry Modal Logic
    const openEnquiryBtn = document.getElementById('openEnquiryBtn');
    const closeEnquiryBtn = document.getElementById('closeEnquiryBtn');
    const enquiryModal = document.getElementById('enquiryModal');

    openEnquiryBtn.addEventListener('click', () => {
        enquiryModal.classList.add('active');
    });

    closeEnquiryBtn.addEventListener('click', () => {
        enquiryModal.classList.remove('active');
    });

    // Close modal on outside click
    enquiryModal.addEventListener('click', (e) => {
        if (e.target === enquiryModal) {
            enquiryModal.classList.remove('active');
        }
    });
});
