(function () {
  const root = document.documentElement;
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('[data-theme-icon]');
  const contactForm = document.getElementById('contact-form');
  const yearEl = document.getElementById('year');
  const skills = document.querySelectorAll('.skill[data-level]');
  const projectCards = document.querySelectorAll('.project');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const loadingScreen = document.getElementById('loading-screen');
  const scrollTopBtn = document.getElementById('scroll-top');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const header = document.querySelector('.portfolio-header');

  // Year in footer
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Loading screen
  function hideLoadingScreen() {
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 1500);
    }
  }

  // Animated counters for hero stats
  function animateHeroCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 50;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  }

  // Typing effect for hero title
  function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-copy h1 .accent');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--accent)';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          heroTitle.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
  }

  // Animated counters for skills
  function animateCounters() {
    const counters = document.querySelectorAll('.skill-level');
    counters.forEach(counter => {
      const target = parseInt(counter.textContent);
      const increment = target / 50;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current) + '%';
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '%';
        }
      };
      
      updateCounter();
    });
  }

  // Enhanced skill bar animations with hover effects
  function initSkillBars() {
    if (skills.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skill = entry.target;
            const level = Number(skill.getAttribute('data-level')) || 0;
            const fill = skill.querySelector('.skill-bar-fill');
            if (fill) {
              // Animate the fill bar
              fill.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
              requestAnimationFrame(() => {
                fill.style.width = level + '%';
              });
              
              // Add hover effect
              skill.addEventListener('mouseenter', () => {
                fill.style.transform = 'scaleY(1.2)';
                fill.style.transition = 'transform 0.3s ease';
              });
              
              skill.addEventListener('mouseleave', () => {
                fill.style.transform = 'scaleY(1)';
              });
            }
            observer.unobserve(skill);
          }
        });
      }, { threshold: 0.4 });

      skills.forEach((el) => observer.observe(el));
    }
  }

  // Interactive project cards
  function initProjectCards() {
    projectCards.forEach(card => {
      const media = card.querySelector('.card-media');
      const actions = card.querySelector('.card-actions');
      
      if (media && actions) {
        // Hover effects
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-8px)';
          card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
          media.style.transform = 'scale(1.05)';
          actions.style.opacity = '1';
          actions.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
          card.style.boxShadow = '';
          media.style.transform = 'scale(1)';
          actions.style.opacity = '0.8';
          actions.style.transform = 'translateY(10px)';
        });
        
        // Click effect
        card.addEventListener('click', (e) => {
          if (!e.target.closest('a')) {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
              card.style.transform = '';
            }, 150);
          }
        });
      }
    });
  }

  // Project filtering
  function initProjectFiltering() {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Scroll to top functionality
  function initScrollToTop() {
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth scroll with enhanced behavior
  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target instanceof HTMLElement && target.closest('a[href^="#"]')) {
        const anchor = target.closest('a[href^="#"]');
        if (!anchor) return;
        const id = anchor.getAttribute('href');
        if (!id || id === '#') return;
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          
          // Add active state to navigation
          navLinks.forEach(link => link.classList.remove('active'));
          anchor.classList.add('active');
          
          // Close mobile menu if open
          if (mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            if (mobileMenuBtn) {
              mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
          }
          
          // Smooth scroll with offset for header
          const headerHeight = header ? header.offsetHeight : 72;
          const targetPosition = el.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  }

  // Active navigation highlighting
  function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' });
    
    sections.forEach(section => observer.observe(section));
  }

  // Enhanced form interactions
  function initEnhancedForm() {
    if (contactForm) {
      const statusEl = contactForm.querySelector('.form-status');
      const fields = Array.from(contactForm.querySelectorAll('input[required], textarea[required]'));
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      function setError(field, message) {
        const container = field.closest('.form-field');
        const errorEl = container ? container.querySelector('.error') : null;
        if (errorEl) {
          errorEl.textContent = message || '';
          errorEl.style.opacity = message ? '1' : '0';
        }
        field.setAttribute('aria-invalid', message ? 'true' : 'false');
        
        // Add visual feedback
        if (message) {
          field.style.borderColor = 'var(--err)';
          field.style.boxShadow = '0 0 0 3px rgba(255, 90, 95, 0.1)';
        } else {
          field.style.borderColor = '';
          field.style.boxShadow = '';
        }
      }

      function validateField(field) {
        const value = String(field.value || '').trim();
        let message = '';
        if (!value) message = 'This field is required.';
        if (!message && field.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) message = 'Please enter a valid email.';
        }
        setError(field, message);
        return !message;
      }

      // Real-time validation with debouncing
      let validationTimeout;
      fields.forEach((field) => {
        field.addEventListener('input', () => {
          clearTimeout(validationTimeout);
          validationTimeout = setTimeout(() => validateField(field), 300);
        });
        
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('focus', () => {
          field.style.borderColor = 'var(--accent)';
          field.style.boxShadow = '0 0 0 3px rgba(124, 92, 255, 0.1)';
        });
      });

      // Enhanced submit handling
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const allValid = fields.every(validateField);
        
        if (!allValid) {
          if (statusEl) {
            statusEl.textContent = 'Please fix the errors above.';
            statusEl.style.color = 'var(--err)';
          }
          return;
        }
        
        // Simulate form submission
        if (submitBtn) {
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
        }
        
        setTimeout(() => {
          if (statusEl) {
            statusEl.textContent = 'Message sent successfully! 🎉';
            statusEl.style.color = 'var(--ok)';
          }
          if (submitBtn) {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
          }
          contactForm.reset();
          fields.forEach((f) => setError(f, ''));
        }, 1500);
      });
    }
  }

  // Parallax effect for hero section
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', String(!expanded));
      mobileMenu.classList.toggle('open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('open') && 
          !mobileMenu.contains(e.target) && 
          !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Header scroll effect
  function initHeaderScroll() {
    if (!header) return;
    
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  // Theme toggle with enhanced animations
  const THEME_KEY = 'portfolio-theme';
  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      if (themeIcon) {
        themeIcon.style.transform = 'rotate(360deg)';
        themeIcon.textContent = '🌞';
      }
    } else {
      root.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.style.transform = 'rotate(0deg)';
        themeIcon.textContent = '🌙';
      }
    }
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
      
      // Add click effect
      themeToggle.style.transform = 'scale(0.95)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 150);
    });
  }

  // Initialize all interactive features
  function init() {
    hideLoadingScreen();
    initHeaderScroll();
    initTypingEffect();
    initSkillBars();
    initProjectCards();
    initProjectFiltering();
    initSmoothScroll();
    initActiveNavigation();
    initEnhancedForm();
    initParallax();
    initScrollToTop();
    
    // Animate counters after skills are visible
    setTimeout(animateCounters, 2000);
    
    // Animate hero counters after typing effect
    setTimeout(animateHeroCounters, 2500);
  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


