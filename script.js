// ===== MODERN PORTFOLIO JAVASCRIPT =====
// Global Variables
let mouseX = 0, mouseY = 0;
let isDesktop = window.innerWidth > 768;

// ===== INITIALIZE APPLICATION =====
window.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initializing...');
    initializeApp();
});

function initializeApp() {
    try {
        // Initialize all components
        initRandomTheme();
        initNavigation();
        initIDCard();
        initTypewriter();
        initScrollAnimations();
        initScrollToTop();
        initSmoothScrolling();
        initInteractiveSkills();
        initProjectCards();
        initParticleEffects();
        initContactForm();
        initProgressBars();
        initLazyLoading();
        initTouchOptimizations();
        
        console.log('Professional portfolio initialized successfully!');
        
        // Check if mobile
        if (window.innerWidth <= 768) {
            console.log('Mobile view detected:', window.innerWidth);
        } else {
            console.log('Desktop view detected:', window.innerWidth);
        }
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// ===== RANDOM THEME ON LOAD =====
function initRandomTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Random theme on page load
    const randomTheme = Math.random() > 0.5 ? 'dark' : 'light';
    html.classList.toggle('dark', randomTheme === 'dark');
    localStorage.setItem('theme', randomTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 100) {
                navbar.classList.add('backdrop-blur-lg', 'bg-white/90', 'dark:bg-gray-900/90', 'shadow-lg');
            } else {
                navbar.classList.remove('backdrop-blur-lg', 'bg-white/90', 'dark:bg-gray-900/90', 'shadow-lg');
            }
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        let isMenuOpen = false;
        
        console.log('Mobile menu elements found, setting up...');
        
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isMenuOpen = !isMenuOpen;
            
            console.log('Mobile menu toggled:', isMenuOpen);
            
            if (isMenuOpen) {
                mobileMenu.style.transform = 'translateY(0)';
                mobileMenu.style.opacity = '1';
                mobileMenu.style.visibility = 'visible';
                
                // Animate hamburger to X
                const lines = mobileMenuBtn.querySelectorAll('span');
                if (lines.length >= 3) {
                    lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    lines[1].style.opacity = '0';
                    lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
            } else {
                mobileMenu.style.transform = 'translateY(-100%)';
                mobileMenu.style.opacity = '0';
                setTimeout(() => {
                    if (!isMenuOpen) mobileMenu.style.visibility = 'hidden';
                }, 300);
                
                // Animate X back to hamburger
                const lines = mobileMenuBtn.querySelectorAll('span');
                if (lines.length >= 3) {
                    lines[0].style.transform = 'none';
                    lines[1].style.opacity = '1';
                    lines[2].style.transform = 'none';
                }
            }
        });
        
        // Close mobile menu when clicking nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Mobile nav link clicked, closing menu');
                isMenuOpen = false;
                mobileMenu.style.transform = 'translateY(-100%)';
                mobileMenu.style.opacity = '0';
                setTimeout(() => {
                    mobileMenu.style.visibility = 'hidden';
                }, 300);
                
                const lines = mobileMenuBtn.querySelectorAll('span');
                if (lines.length >= 3) {
                    lines[0].style.transform = 'none';
                    lines[1].style.opacity = '1';
                    lines[2].style.transform = 'none';
                }
            });
        });
    } else {
        console.log('Mobile menu elements not found:', { mobileMenuBtn, mobileMenu });
    }
    
    // Active section highlighting
    const sections = document.querySelectorAll('section');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-custom-cyan');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('text-custom-cyan');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
}

// ===== INTERACTIVE ID CARD =====
function initIDCard() {
    const idCard = document.getElementById('id-card');
    if (!idCard) return;
    
    // Make it draggable with improved physics
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        
        if (e.target === idCard || idCard.contains(e.target)) {
            isDragging = true;
            idCard.style.cursor = 'grabbing';
            idCard.style.transition = 'none';
            idCard.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(-5deg) scale(1.1)`;
            idCard.style.zIndex = '50';
        }
    }
    
    function dragEnd() {
        if (isDragging) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            idCard.style.cursor = 'grab';
            idCard.style.transition = 'transform 0.3s ease-out';
            idCard.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(-5deg) scale(1)`;
            idCard.style.zIndex = '20';
        }
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }
            
            xOffset = currentX;
            yOffset = currentY;
            
            // Constrain to viewport with padding
            const rect = idCard.getBoundingClientRect();
            const padding = 20;
            const maxX = window.innerWidth - rect.width - padding;
            const maxY = window.innerHeight - rect.height - padding;
            
            xOffset = Math.max(-rect.left + padding, Math.min(xOffset, maxX - rect.left));
            yOffset = Math.max(-rect.top + padding, Math.min(yOffset, maxY - rect.top));
            
            idCard.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(-5deg) scale(1.1)`;
        }
    }
    
    // Add event listeners
    document.addEventListener("touchstart", dragStart, false);
    document.addEventListener("touchend", dragEnd, false);
    document.addEventListener("touchmove", drag, false);
    document.addEventListener("mousedown", dragStart, false);
    document.addEventListener("mouseup", dragEnd, false);
    document.addEventListener("mousemove", drag, false);
    
    // Add click effect for interaction feedback
    idCard.addEventListener('click', (e) => {
        if (!isDragging) {
            idCard.style.transition = 'transform 0.3s ease-out';
            idCard.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(-5deg) scale(1.2)`;
            setTimeout(() => {
                idCard.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(-5deg) scale(1)`;
            }, 200);
        }
    });
    
    // Auto-hide on mobile for better UX
    function handleResize() {
        if (window.innerWidth < 768) {
            idCard.style.display = 'none';
        } else {
            idCard.style.display = 'block';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size
    
    // Add subtle floating animation when not being dragged
    let floatDirection = 1;
    setInterval(() => {
        if (!isDragging) {
            const currentTransform = idCard.style.transform;
            if (currentTransform.includes('translate3d')) {
                // Keep existing position but add subtle floating
                idCard.style.transform = currentTransform.replace(/scale\([^)]*\)/, `scale(${1 + floatDirection * 0.02})`);
                floatDirection *= -1;
            }
        }
    }, 2000);
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const roles = [
        'Chief Technology Officer',
        'Network Infrastructure Expert',
        'System Security Specialist',
        'Technology Leader',
        'IT Professional'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeWriter() {
        const currentRole = roles[currentRoleIndex];
        
        if (!isDeleting && !isPaused) {
            // Typing
            typewriterElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentRole.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                }, 2000); // Pause at end
            }
        } else if (isDeleting && !isPaused) {
            // Deleting
            typewriterElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            }
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, speed);
    }
    
    typeWriter();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all animate-on-scroll elements
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-custom-cyan text-white rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300 z-50 hover:bg-custom-blue transform hover:scale-110';
    scrollToTopBtn.id = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for mouse events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== UTILITIES =====
// Add intersection observer for performance
const createObserver = (callback, options = {}) => {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// ===== RESPONSIVE HANDLING =====
window.addEventListener('resize', debounce(() => {
    isDesktop = window.innerWidth > 768;
}, 250));

// ===== INTERACTIVE ELEMENTS =====

// Enhanced Interactive Skills - Mobile Optimized
function initInteractiveSkills() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const skillItems = skillsSection.querySelectorAll('.skill-item');
    
    // Reduce animations on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    const animationDelay = isMobile ? 100 : 200;
    
    const observer = createObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target.querySelector('.bg-gradient-to-r');
                
                if (skillBar) {
                    const targetWidth = skillBar.style.width;
                    skillBar.style.width = '0%';
                    skillBar.style.transition = `width ${isMobile ? '1s' : '2s'} ease-out`;
                    
                    setTimeout(() => {
                        skillBar.style.width = targetWidth;
                    }, animationDelay);
                }
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: isMobile ? 0.1 : 0.3 });

    skillItems.forEach(item => observer.observe(item));
}

// Interactive Project Cards - Mobile Optimized
function initProjectCards() {
    const projectCards = document.querySelectorAll('#projects .animate-on-scroll');
    const isMobile = window.innerWidth <= 768;
    
    projectCards.forEach(card => {
        // Reduce hover effects on mobile
        if (!isMobile) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) translateY(-10px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 245, 255, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
                this.style.boxShadow = '';
            });
        }

        // Add click ripple effect with performance optimization
        card.addEventListener('click', function(e) {
            // Skip ripple effect on mobile for better performance
            if (isMobile) return;
            
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Particle Effects - Optimized for Performance
function initParticleEffects() {
    const canvas = document.getElementById('3d-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 15 : 50;
    
    // Disable particles on very low-end devices
    const isLowEnd = isMobile && navigator.hardwareConcurrency <= 2;
    if (isLowEnd) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * (isMobile ? 2 : 3) + 1;
            this.speedX = (Math.random() * 2 - 1) * (isMobile ? 0.5 : 1);
            this.speedY = (Math.random() * 2 - 1) * (isMobile ? 0.5 : 1);
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections only on desktop for performance
        if (!isMobile) {
            particles.forEach((particle, index) => {
                for (let j = index + 1; j < particles.length; j++) {
                    const dx = particles[j].x - particle.x;
                    const dy = particles[j].y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
        }

        animationId = requestAnimationFrame(animate);
    }

    // Start animation
    if (!isLowEnd) {
        animate();
    }

    // Resize handler with debouncing
    const resizeHandler = debounce(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, 250);

    window.addEventListener('resize', resizeHandler);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        window.removeEventListener('resize', resizeHandler);
    });
}

// Enhanced Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Floating labels effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Character counter for textarea
        if (input.tagName === 'TEXTAREA') {
            const counter = document.createElement('div');
            counter.className = 'text-xs text-gray-500 mt-1 text-right';
            counter.textContent = '0 / 500';
            input.parentElement.appendChild(counter);

            input.addEventListener('input', function() {
                const length = this.value.length;
                counter.textContent = `${length} / 500`;
                counter.style.color = length > 450 ? '#ef4444' : '#6b7280';
            });
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
            submitBtn.classList.add('bg-green-500');
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('bg-green-500');
            }, 2000);
        }, 1500);
    });
}

// Animated Progress Bars - Mobile Optimized
function initProgressBars() {
    const progressBars = document.querySelectorAll('.skill-item .bg-gradient-to-r');
    const isMobile = window.innerWidth <= 768;
    
    const observer = createObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                
                bar.style.width = '0%';
                bar.style.transition = `width ${isMobile ? '1s' : '2s'} cubic-bezier(0.4, 0, 0.2, 1)`;
                
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, isMobile ? 50 : 100);
                
                // Unobserve after animation for performance
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: isMobile ? 0.1 : 0.3 });

    progressBars.forEach(bar => observer.observe(bar));
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Mobile Touch Optimizations
function initTouchOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Add touch-friendly interactions
        const buttons = document.querySelectorAll('button, a');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Optimize scroll performance on mobile
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = window.requestAnimationFrame(() => {
                // Handle scroll optimizations
            });
        });
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .focused label {
        color: #00f5ff;
        transform: translateY(-25px) scale(0.85);
    }
    
    .skill-item .bg-gradient-to-r {
        transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);
