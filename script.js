document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particle.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: window.innerWidth < 768 ? 40 : 80, 
                    density: { enable: true, value_area: 800 } 
                },
                color: { value: "#6c63ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: window.innerWidth < 768 ? 2 : 3, random: true },
                line_linked: { 
                    enable: true, 
                    distance: window.innerWidth < 768 ? 100 : 150, 
                    color: "#6c63ff", 
                    opacity: 0.4, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: window.innerWidth < 768 ? 1 : 2, 
                    direction: "none", 
                    random: true, 
                    straight: false, 
                    out_mode: "out" 
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: window.innerWidth > 768, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Initialize Typewriter Effect
    if (document.getElementById('typewriter')) {
        const typed = new Typed('#typewriter', {
            strings: ["Emmanuel Christopher M. Pagulayan", "Embedded Systems Developer", "Automation Engineer", "Tech Enthusiast"],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }

    // Initialize ScrollReveal with mobile-friendly settings
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: window.innerWidth < 768 ? '30px' : '60px',
        duration: window.innerWidth < 768 ? 800 : 1000,
        delay: 200,
        reset: false,
        mobile: true
    });

    sr.reveal('.hero-text, .hero-image', { delay: 300, origin: 'left', interval: 200 });
    sr.reveal('.section-title', { delay: 200, origin: 'top' });
    sr.reveal('.about-image, .about-text', { delay: 300, interval: 200 });
    sr.reveal('.skill-item, .tool-item', { delay: 200, interval: 100 });
    sr.reveal('.project-item', { delay: 200, interval: 200 });
    sr.reveal('.contact-info, .contact-form', { delay: 300, interval: 200 });

    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu when clicking on nav items
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Sticky Header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        header.classList.toggle('scrolled', scrollTop > 0);
        
        // Hide/show header on mobile when scrolling
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Projects Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hide');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        if (item.classList.contains('hide')) {
                            item.style.display = 'none';
                        }
                    }, 500);
                }
            });
        });
    });
    
    // Animate Elements on Scroll with Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.progress');
                    if (progressBar) {
                        progressBar.style.animation = 'progressAnimation 2s ease-in-out forwards';
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.skill-item, .project-item, .tool-item, .contact-item');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Set Current Year in Footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Enhanced Form Submission with proper email handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const formData = new FormData(this);
            
            // Get form values
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Create mailto link with proper formatting
            const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0ASubject: ${subject}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            const mailtoLink = `mailto:emmanuelchristophermpagulayan@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
            
            // Simulate form processing
            setTimeout(() => {
                // Open email client
                window.location.href = mailtoLink;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
                    submitBtn.disabled = false;
                    contactForm.reset();
                    
                    showFormMessage('Thank you! Your email client should open with the message ready to send.', 'success');
                }, 1500);
            }, 2000);
        });
    }
    
    // Form message display function
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-${type}`;
        messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        
        contactForm.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                setTimeout(() => messageDiv.remove(), 500);
            }, 4000);
        }, 10);
    }

    // 3D Card Tilt Effect with mobile optimization
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        // Only enable tilt effect on desktop
        if (window.innerWidth > 768) {
            profileCard.addEventListener('mousemove', (e) => {
                const rect = profileCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
            });

            profileCard.addEventListener('mouseenter', () => {
                profileCard.style.transition = 'none';
            });

            profileCard.addEventListener('mouseleave', () => {
                profileCard.style.transition = 'all 0.5s ease';
                profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        } else {
            // Mobile touch interaction
            profileCard.addEventListener('touchstart', () => {
                profileCard.classList.add('mobile-flip');
                setTimeout(() => {
                    profileCard.classList.remove('mobile-flip');
                }, 3000);
            });
        }
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Handle window resize for particle.js
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.pJSDom && window.pJSDom[0]) {
                window.pJSDom[0].pJS.fn.canvasSize();
                window.pJSDom[0].pJS.fn.canvasPaint();
                window.pJSDom[0].pJS.fn.particlesCreate();
                window.pJSDom[0].pJS.fn.particlesDraw();
            }
        }, 250);
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    function updateOnScroll() {
        // Add any scroll-based animations here
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Preload critical images
    const criticalImages = [
        'images/profile.jpg',
        'images/about-me.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Handle touch events for better mobile experience
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could trigger scroll to next section
                console.log('Swipe up detected');
            } else {
                // Swipe down - could trigger scroll to previous section
                console.log('Swipe down detected');
            }
        }
    }

    // Add focus management for accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('.nav-links');

    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        document.addEventListener('keydown', function(e) {
            const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

            if (!isTabPressed) return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });
    }

    // Initialize focus trap when mobile menu is open
    if (burger) {
        burger.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                trapFocus(navLinks);
            }
        });
    }
});