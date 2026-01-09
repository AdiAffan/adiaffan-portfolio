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
  const logoImg = document.getElementById('logo-img');
  
  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      if (themeIcon) {
        themeIcon.style.transform = 'rotate(360deg)';
        themeIcon.textContent = '🌞';
      }
      if (logoImg) {
        logoImg.src = '/img/light-logo.png';
      }
      // Update cursor to light-grey for light theme
      updateCursorColor('light');
    } else {
      root.removeAttribute('data-theme');
      if (themeIcon) {
        themeIcon.style.transform = 'rotate(0deg)';
        themeIcon.textContent = '🌙';
      }
      if (logoImg) {
        logoImg.src = '/img/dark-logo.png';
      }
      // Update cursor to off-white for dark theme
      updateCursorColor('dark');
    }
  }

  // Function to update cursor color dynamically
  function updateCursorColor(mode) {
    // mode: 'light' or 'dark' (also backward-compatible accepts '#...' values)
    const ring = document.querySelector('.custom-cursor-ring');
    const dot = document.querySelector('.custom-cursor-dot');
    // Define desired colors
    const LIGHT_RING = '#616263ff'; // light grey for light theme
    const DARK_RING = '#d6e4eaff'; // off-white for dark theme

    let ringColor = null;
    if (mode === 'light') ringColor = LIGHT_RING;
    else if (mode === 'dark') ringColor = DARK_RING;
    else ringColor = mode; // allow passing explicit color strings

    if (!ring || !dot) {
      createCursorRing();
    }
    const r = document.querySelector('.custom-cursor-ring');
    const d = document.querySelector('.custom-cursor-dot');
    if (r) r.style.borderColor = ringColor;
    if (d) d.style.backgroundColor = ringColor;
  }

  // Create the small filled dot that follows the cursor
  function createCursorRing() {
    // Backwards-compatible name kept for other parts of the script
    if (document.querySelector('.custom-cursor-dot')) return document.querySelector('.custom-cursor-dot');
    // Create ring (outline) and dot (filled) elements
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';

    // Initial center position but hidden until first mousemove
    Object.assign(ring.style, { left: '50%', top: '50%', opacity: '0' });
    Object.assign(dot.style, { left: '50%', top: '50%', opacity: '0' });

    document.body.appendChild(ring);
    document.body.appendChild(dot);

    // Variables for smooth follow (outer ring will ease towards target)
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    const ease = 0.17; // smaller = slower follow

    // Reveal on first movement
    let firstMove = true;
    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Dot snaps directly to pointer
      dot.style.left = targetX + 'px';
      dot.style.top = targetY + 'px';

      if (firstMove) {
        ring.style.opacity = '1';
        dot.style.opacity = '1';
        firstMove = false;
      }
    }, { passive: true });

    // Animation loop to lerp the ring towards the target (follows the dot)
    function animateRing() {
      ringX += (targetX - ringX) * ease;
      ringY += (targetY - ringY) * ease;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    requestAnimationFrame(animateRing);

    return dot;
  }

  

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
    syncCursorToTheme();
  } else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
    syncCursorToTheme();
  }

  // Ensure the kursor element matches current theme when it appears.
  // If the cursor already exists, apply immediately; otherwise observe DOM additions.
  function syncCursorToTheme() {
    const applyNow = () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      const mode = isLight ? 'light' : 'dark';

      // Ensure our custom cursor exists
      if (!document.querySelector('.custom-cursor-dot')) createCursorRing();

      updateCursorColor(mode);

      return !!document.querySelector('.custom-cursor-ring') && !!document.querySelector('.custom-cursor-dot');
    };

    if (applyNow()) return;

    const observer = new MutationObserver((records, obs) => {
      if (applyNow()) obs.disconnect();
    });
    observer.observe(document.documentElement || document.body, { childList: true, subtree: true });
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
    // Ensure our custom cursor exists and matches the current theme immediately
    try { createCursorRing(); } catch (e) { /* ignore if DOM not ready */ }
    try { syncCursorToTheme(); } catch (e) { /* ignore */ }
    try { initCursorHover(); } catch (e) { /* ignore */ }
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

document.dispatchEvent(new Event('themechange'));

