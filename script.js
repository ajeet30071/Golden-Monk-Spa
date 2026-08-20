/* ==========================================================================
   Golden Monk Spa - Interactive Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('.site-header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial run in case page is loaded scrolled

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            // Animate toggle bars
            const spans = menuToggle.querySelectorAll('span');
            if (mainNav.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside or on links
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('open')) {
                menuToggle.click();
            }
        });

        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('open')) {
                    menuToggle.click();
                }
            });
        });
    }

    // 3. Tab System (Home Page Services)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-target');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active to clicked button and target content
                btn.classList.add('active');
                const targetContent = document.getElementById(target);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // 4. Testimonials Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0 && dots.length > 0) {
        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        };

        const nextSlide = () => {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        };

        const startSlideShow = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetSlideShow = () => {
            clearInterval(slideInterval);
            startSlideShow();
        };

        // Dots click handling
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showSlide(idx);
                resetSlideShow();
            });
        });

        // Initialize slideshow
        showSlide(0);
        startSlideShow();
    }

    // 5. Booking Form Submission (Redirects to WhatsApp)
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather inputs
            const nameInput = bookingForm.querySelector('[name="name"]');
            const phoneInput = bookingForm.querySelector('[name="phone"]');
            const emailInput = bookingForm.querySelector('[name="email"]');
            const serviceSelect = bookingForm.querySelector('[name="service"]');
            const timeSelect = bookingForm.querySelector('[name="time"]');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const service = serviceSelect ? serviceSelect.value : '';
            const timeSlot = timeSelect ? timeSelect.value : '';

            // Simple check
            if (!name || !phone || !service) {
                alert('Please fill out Name, Phone, and Select a Service to request an appointment.');
                return;
            }

            // Target Phone Number is 9137883988 (+91 for India prefix)
            const targetPhone = '919137883988';
            
            // Format WhatsApp Message
            const message = `Hello Golden Monk Spa, I'd like to book an appointment:\n\n` +
                            `• *Name:* ${name}\n` +
                            `• *Phone:* ${phone}\n` +
                            `• *Email:* ${email || 'N/A'}\n` +
                            `• *Service Requested:* ${service}\n` +
                            `• *Time Slot:* ${timeSlot}\n\n` +
                            `Please confirm availability. Thank you!`;
            
            // Encode URI
            const encodedText = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;
            
            // Open in new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    // 6. Contact Form Submission (Simple Alert response)
    const contactForm = document.querySelector('.contact-form-element');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for contacting Golden Monk Spa! We will get back to you shortly.');
            contactForm.reset();
        });
    }
});
