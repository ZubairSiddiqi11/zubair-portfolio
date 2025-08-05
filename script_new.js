// ===== MODERN PORTFOLIO JAVASCRIPT =====
// Global Variables
let mouseX = 0, mouseY = 0;
let isDesktop = window.innerWidth > 768;

// ===== LOADING SCREEN =====
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                initializeApp();
            }, 500);
        } else {
            initializeApp();
        }
    }, 1500);
});

// ===== INITIALIZE APPLICATION =====
function initializeApp() {
    // Initialize all components
    initThemeToggle();
    initNavigation();
    initCustomCursor();
    initTypewriter();
    initScrollAnimations();
    initScrollToTop();
    initSmoothScrolling();
    
    console.log('Modern portfolio initialized successfully!');
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.classList.toggle('dark', savedTheme === 'dark');
    } else {
        // Default to dark theme
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    
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
        
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileMenu.style.transform = 'translateY(0)';
                mobileMenu.style.opacity = '1';
                
                // Animate hamburger to X
                const lines = mobileMenuBtn.querySelectorAll('span');
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                mobileMenu.style.transform = 'translateY(-100%)';
                mobileMenu.style.opacity = '0';
                
                // Animate X back to hamburger
                const lines = mobileMenuBtn.querySelectorAll('span');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.style.transform = 'translateY(-100%)';
                mobileMenu.style.opacity = '0';
                
                const lines = mobileMenuBtn.querySelectorAll('span');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            });
        });
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

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    if (!isDesktop) return;
    
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');
    
    if (!cursor || !cursorRing) return;
    
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;
    
    // Show cursors
    cursor.style.opacity = '1';
    cursorRing.style.opacity = '1';

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursor.style.left = cursorX - 12 + 'px';
        cursor.style.top = cursorY - 12 + 'px';
    });

    // Smooth ring following
    function updateCursorRing() {
        ringX += (cursorX - ringX) * 0.1;
        ringY += (cursorY - ringY) * 0.1;
        
        cursorRing.style.left = ringX - 24 + 'px';
        cursorRing.style.top = ringY - 24 + 'px';
        
        requestAnimationFrame(updateCursorRing);
    }
    updateCursorRing();

    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorRing.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorRing.style.transform = 'scale(1)';
        });
    });
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
    
    // Reinitialize cursor for desktop
    if (isDesktop) {
        initCustomCursor();
    }
}, 250));
