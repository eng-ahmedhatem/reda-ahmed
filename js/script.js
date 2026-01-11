        // Loading Screen
        window.addEventListener('load', function() {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading');
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
            
            // Initialize animations
            initAnimations();
            
            // Initialize particles
            createParticles();
        });

        // Mobile Menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-label', 
                navLinks.classList.contains('active') ? 'إغلاق القائمة' : 'فتح القائمة'
            );
            
            // Add animation to menu items
            if (navLinks.classList.contains('active')) {
                const menuItems = document.querySelectorAll('.nav-link');
                menuItems.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.1}s`;
                    item.style.animation = 'slideInRight 0.5s ease forwards';
                });
            }
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-label', 'فتح القائمة');
            });
        });

        // Header scroll effect
        let lastScroll = 0;
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const backToTop = document.getElementById('backToTop');
            
            // Header show/hide on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
            } else {
                header.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
            
            // Show/hide back to top button
            if (currentScroll > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            
            // Update active nav link
            updateActiveNav();
            
            // Trigger animations on scroll
            triggerAnimations();
        });

        // Active navigation
        function updateActiveNav() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Back to top button
        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // WhatsApp integration
        function openWhatsApp(packageName, price) {
            let message;
            if (packageName === 'استفسار عام') {
                message = `أهلاً يا رضا! 🎉\n\nعايز أستفسر عن خدمات تصوير الأفراح.\n\nأرجو التواصل للتفاصيل!`;
            } else {
                message = `أهلاً يا رضا! 🎉\n\nأنا عايز أحجز باقة ${packageName} اللي سعرها ${price} جنيه.\n\nعايز أستفسر عن التفاصيل وأحجز معاك!`;
            }
            window.open(`https://wa.me/201007524259?text=${encodeURIComponent(message)}`, '_blank');
        }

        // Animation on scroll
        function initAnimations() {
            const animatedElements = document.querySelectorAll('.section-title, .package-card, .extra-card, .contact-card, .terms-box');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Trigger animations on scroll
        function triggerAnimations() {
            const elements = document.querySelectorAll('.section-title');
            
            elements.forEach(element => {
                const position = element.getBoundingClientRect();
                if (position.top < window.innerHeight - 100) {
                    element.classList.add('animated');
                }
            });
        }

        // Create particle background
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 25;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties
                const size = Math.random() * 8 + 3;
                const posX = Math.random() * 100;
                const duration = Math.random() * 15 + 20;
                const delay = Math.random() * 5;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${delay}s`;
                particle.style.opacity = Math.random() * 0.3 + 0.1;
                
                particlesContainer.appendChild(particle);
            }
        }

        // Add hover effect to buttons and cards
        document.querySelectorAll('.package-card, .extra-card, .contact-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
            });
        });

        // Add ripple effect to buttons
        document.querySelectorAll('.btn, .package-btn, .contact-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            updateActiveNav();
            triggerAnimations();
            
            // Add typing effect to hero title
            const heroTitle = document.querySelector('.hero-title .highlight');
            if (heroTitle) {
                const text = heroTitle.textContent;
                heroTitle.textContent = '';
                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        heroTitle.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    }
                };
                setTimeout(typeWriter, 1000);
            }
        });

        // Performance optimization
        window.addEventListener('scroll', () => {
            // Throttle scroll events for performance
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => {
                // Your scroll logic here
            }, 100);
        });

        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        