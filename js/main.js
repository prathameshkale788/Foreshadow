/* ============================================
   FORESHADOW — VMPF-Style Interactions & Animations
   ============================================ */

console.log("main.js: Top-level code executed");

// Detect mobile devices and add class to html element
if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  document.documentElement.classList.add('is-mobile');
}

const init = () => {
  console.log("main.js: init() started");

  // One-time localStorage reset for v3 fresh start (clean comments and likes)
  try {
    if (localStorage.getItem('foreshadow_v3_reset') !== 'true') {
      localStorage.removeItem('comments_folder_1');
      localStorage.removeItem('comments_folder_2');
      localStorage.removeItem('comments_folder_3');
      localStorage.removeItem('comments_folder_4');
      localStorage.removeItem('like_folder_1');
      localStorage.removeItem('like_folder_2');
      localStorage.removeItem('like_folder_3');
      localStorage.removeItem('like_folder_4');
      localStorage.setItem('foreshadow_v3_reset', 'true');
    }
  } catch (err) {
    console.warn('Could not reset localStorage:', err);
  }

  const apiBase = window.location.port === '3000' ? 'http://localhost:3000' : '';

  // ─────────────── Lenis Smooth Scroll ───────────────
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  } catch (e) { console.warn('Lenis not loaded'); }

  // ─────────────── Preloader / Cosmos 3D Loading Gate ───────────────
  const preloader = document.getElementById('preloader');
  const enterBtn = document.getElementById('enter-btn');
  const heroVideo = document.querySelector('.hero-video-bg video');

  if (heroVideo) {
    // Ensure video properties for strict browser autoplay policies
    heroVideo.muted = true;

    // Attempt to play immediately
    heroVideo.play().catch(err => console.warn('Autoplay initially prevented:', err));
  }

  // ─────────────── YouTube Autoplay for Cinematic Storytelling / Backgrounds ───────────────
  // Automatically append autoplay and mute parameters to YouTube iframes on page load
  const ytIframes = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"]');
  ytIframes.forEach(iframe => {
    let src = iframe.getAttribute('src');
    if (src && !src.includes('autoplay=1')) {
      // Modern browsers require video to be muted to autoplay
      src += (src.includes('?') ? '&' : '?') + 'autoplay=1&mute=1&playsinline=1';
      // YouTube requires the playlist parameter to loop an embedded video
      if (src.includes('embed/') && !src.includes('playlist=')) {
        const videoId = src.split('embed/')[1].split(/[?&]/)[0];
        src += '&loop=1&playlist=' + videoId;
      }
      iframe.setAttribute('src', src);
    }
  });

  const playHeroVideo = () => {
    const heroIframe = document.querySelector('.hero-video-bg iframe[data-src]');
    if (heroIframe) {
      const dataSrc = heroIframe.getAttribute('data-src');
      if (dataSrc) {
        heroIframe.setAttribute('src', dataSrc);
        heroIframe.removeAttribute('data-src');
      }
    }
  };

  const startHeroAnimations = () => {
    const hero = document.getElementById('hometop');
    if (hero) {
      hero.classList.add('start-anim');
    }
  };

  if (preloader) {
    let hasEntered = false;
    try {
      hasEntered = sessionStorage.getItem('fosh_entered') === 'true';
    } catch (e) {
      console.warn('sessionStorage is not accessible:', e);
    }

    if (hasEntered) {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
      // Cleanup WebGL if it was initialized
      if (typeof window._destroyPreloaderWave === 'function') {
        window._destroyPreloaderWave();
      }
      playHeroVideo();
      startHeroAnimations();
    } else {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();

      if (enterBtn) {
        var autoEnterTimeout;

        var triggerExit = function () {
          if (autoEnterTimeout) {
            clearTimeout(autoEnterTimeout);
            autoEnterTimeout = null;
          }
          // Prevent double-clicks / repeat triggers
          enterBtn.style.pointerEvents = 'none';

          try {
            sessionStorage.setItem('fosh_entered', 'true');
          } catch (e) {
            console.warn('sessionStorage is not accessible:', e);
          }

          // ═══════════════════════════════════════════════
          // PHASE 1 (T+0ms) — Trigger 3D whirlwind + UI dissolve
          // ═══════════════════════════════════════════════

          // Trigger accelerating rotation + particle scatter in Three.js
          if (typeof window._triggerPreloaderExit === 'function') {
            window._triggerPreloaderExit();
          }

          // Add 'exiting' class — CSS handles button/text/canvas dissolve
          preloader.classList.add('exiting');

          // Create radial white flash burst
          var flash = document.createElement('div');
          flash.className = 'preloader-flash';
          preloader.appendChild(flash);
          setTimeout(function () { flash.remove(); }, 800);

          // ═══════════════════════════════════════════════
          // PHASE 1 (T+0ms) — Logo flies to navbar position immediately
          // ═══════════════════════════════════════════════

          var logo = document.querySelector('.preloader-logo');
          var navLogo = document.querySelector('.nav-logo-img');

          if (logo && navLogo) {
            // Get current and target positions
            var logoRect = logo.getBoundingClientRect();
            var navRect = navLogo.getBoundingClientRect();

            // Calculate translation delta (center → center)
            var dx = (navRect.left + navRect.width / 2) - (logoRect.left + logoRect.width / 2);
            var dy = (navRect.top + navRect.height / 2) - (logoRect.top + logoRect.height / 2);
            var scaleRatio = navRect.height / logoRect.height;

            // Freeze the entrance animation and lock current visual state
            logo.style.animation = 'none';
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0) scale(1)';

            // Double-rAF to ensure browser registers the base state before transitioning
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                logo.style.transition = 'transform 1s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease 0.8s';
                logo.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(' + scaleRatio + ')';
              });
            });
          }

          // Start video and text animations as the loading page exits
          playHeroVideo();
          startHeroAnimations();

          // ═══════════════════════════════════════════════
          // PHASE 2 (T+1000ms) — Logo fades at destination
          // ═══════════════════════════════════════════════

          setTimeout(function () {
            var logo = document.querySelector('.preloader-logo');
            if (logo) {
              logo.style.transition = 'opacity 0.3s ease';
              logo.style.opacity = '0';
            }
          }, 1000);

          // ═══════════════════════════════════════════════
          // PHASE 3 (T+1200ms) — Preloader hidden, site revealed
          // ═══════════════════════════════════════════════

          setTimeout(function () {
            preloader.classList.add('loaded');
            document.body.style.overflow = '';
            if (lenis) lenis.start();

            setTimeout(function () {
              preloader.style.display = 'none';
              // Cleanup WebGL resources to free GPU memory
              if (typeof window._destroyPreloaderWave === 'function') {
                window._destroyPreloaderWave();
              }
            }, 500);
          }, 1200);
        };

        enterBtn.addEventListener('click', triggerExit);

        // Automatically trigger the transition after 6.5s (allowing entrance animations to finish and instructions to be read)
        autoEnterTimeout = setTimeout(triggerExit, 6500);
      }
    }
  } else {
    // If no preloader on this page, play video and animations immediately
    playHeroVideo();
    startHeroAnimations();
  }

  // ─────────────── Custom Cursor ───────────────
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');

  if (cursor && cursorDot && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, .portfolio-item, .portfolio-card, .story-entry, .portfolio-filter-btn, .film-card, .blog-card, .service-card, .masonry-item, .iconic-cell, .creations-gallery-item, .nav-hamburger, .btn-vmpf, .carousel-slide');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
  }

  // ─────────────── Navigation (VMPF Style) ───────────────
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const overlay = document.querySelector('.nav-overlay');
  const overlayLinks = document.querySelectorAll('.nav-overlay-link');

  if (nav) {
    // On desktop, transition from transparent to solid on scroll
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > scrollThreshold) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });

    // On mobile (<=1024px), nav is always fixed/solid via CSS, skip scroll logic for dark class
  }

  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
    });

    const observer = new MutationObserver(() => {
      overlayLinks.forEach((link, i) => {
        link.style.transitionDelay = overlay.classList.contains('open') ? `${0.1 + i * 0.08}s` : '0s';
      });
    });
    observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });

    overlayLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.id === 'mobile-more-toggle') {
          e.preventDefault();
          return;
        }
        hamburger.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Mobile submenu toggle handler
    const mobileMoreToggle = document.getElementById('mobile-more-toggle');
    const mobileSubmenu = document.getElementById('mobile-submenu');
    if (mobileMoreToggle && mobileSubmenu) {
      mobileMoreToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileSubmenu.classList.toggle('open');
        mobileMoreToggle.classList.toggle('active');
      });
    }
  }

  // ─────────────── Page Transition Links ───────────────
  const pageTransition = document.querySelector('.page-transition');
  if (pageTransition) {
    setTimeout(() => {
      pageTransition.classList.add('loaded');
    }, 100);
  }

  // Force page transition slide-out on pageshow (handles bfcache/back navigation)
  window.addEventListener('pageshow', () => {
    if (pageTransition) {
      pageTransition.classList.add('loaded');
    }
  });

  document.querySelectorAll('a[data-page]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (pageTransition) {
        pageTransition.classList.remove('loaded');
        setTimeout(() => { window.location.href = href; }, 750);
      } else {
        window.location.href = href;
      }
    });
  });

  // ─────────────── Hero Text Split Animation ───────────────
  const heroTitle = document.querySelector('.home-hero-title');
  if (heroTitle) {
    const html = heroTitle.innerHTML;
    // Split by <br> tags to preserve line breaks
    const lines = html.split(/<br\s*\/?>/i);
    heroTitle.innerHTML = '';

    lines.forEach((line, li) => {
      const lineText = line.trim();
      const words = lineText.split(' ');

      words.forEach((word, wi) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';

        word.split('').forEach((char, ci) => {
          const charSpan = document.createElement('span');
          charSpan.className = 'char';
          charSpan.textContent = char;
          charSpan.style.animationDelay = `${0.3 + (li * 0.4) + (wi * 0.12) + (ci * 0.04)}s`;
          wordSpan.appendChild(charSpan);
        });

        heroTitle.appendChild(wordSpan);

        if (wi < words.length - 1) {
          const space = document.createElement('span');
          space.innerHTML = '&nbsp;';
          space.className = 'char';
          space.style.animationDelay = `${0.3 + (li * 0.4) + (wi * 0.12) + (word.length * 0.04)}s`;
          heroTitle.appendChild(space);
        }
      });

      if (li < lines.length - 1) {
        heroTitle.appendChild(document.createElement('br'));
      }
    });
  }



  // ─────────────── Hero Background Slideshow ───────────────
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-slide-dot');
  let currentHeroSlide = 0;
  let heroSlideInterval;

  function showHeroSlide(index) {
    heroSlides.forEach(s => s.classList.remove('active'));
    heroDots.forEach(d => d.classList.remove('active'));
    if (heroSlides[index]) heroSlides[index].classList.add('active');
    if (heroDots[index]) heroDots[index].classList.add('active');
    currentHeroSlide = index;
  }

  if (heroSlides.length > 1) {
    heroSlideInterval = setInterval(() => {
      showHeroSlide((currentHeroSlide + 1) % heroSlides.length);
    }, 5000);

    heroDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(heroSlideInterval);
        showHeroSlide(i);
        heroSlideInterval = setInterval(() => {
          showHeroSlide((currentHeroSlide + 1) % heroSlides.length);
        }, 5000);
      });
    });
  }

  // ─────────────── Full-Width Image Carousel (VMPF Swiper-Style) ───────────────
  const carouselTrack = document.getElementById('carousel-track');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  let currentCarousel = 0;
  let carouselInterval;

  function goToCarouselSlide(index) {
    if (carouselSlides.length === 0) return;
    if (index < 0) index = carouselSlides.length - 1;
    if (index >= carouselSlides.length) index = 0;
    currentCarousel = index;

    if (carouselTrack) {
      carouselTrack.style.transform = `translateX(-${currentCarousel * 100}%)`;
    }

    carouselSlides.forEach(s => s.classList.remove('active'));
    if (carouselSlides[currentCarousel]) carouselSlides[currentCarousel].classList.add('active');
  }

  if (carouselSlides.length > 1) {
    goToCarouselSlide(0);
    carouselInterval = setInterval(() => {
      goToCarouselSlide(currentCarousel + 1);
    }, 5000);

    // Touch swipe for carousel
    const carouselEl = document.getElementById('image-carousel');
    if (carouselEl) {
      let touchStartX = 0, touchEndX = 0;
      carouselEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      carouselEl.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          clearInterval(carouselInterval);
          if (diff > 0) goToCarouselSlide(currentCarousel + 1);
          else goToCarouselSlide(currentCarousel - 1);
          carouselInterval = setInterval(() => goToCarouselSlide(currentCarousel + 1), 5000);
        }
      }, { passive: true });
    }
  }

  // ─────────────── TWF-Style Image Slider (Legacy, for subpages) ───────────────
  const sliderTrack = document.querySelector('.twf-slider-track');
  const slides = document.querySelectorAll('.twf-slide');
  const sliderDots = document.querySelectorAll('.twf-slider-dot');
  const prevBtn = document.querySelector('.twf-slider-prev');
  const nextBtn = document.querySelector('.twf-slider-next');
  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;

    if (sliderTrack) {
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    slides.forEach(s => s.classList.remove('active'));
    sliderDots.forEach(d => d.classList.remove('active'));
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (sliderDots[currentSlide]) sliderDots[currentSlide].classList.add('active');
  }

  function startSliderAuto() {
    sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  function resetSliderAuto() {
    clearInterval(sliderInterval);
    startSliderAuto();
  }

  if (slides.length > 0) {
    goToSlide(0);
    startSliderAuto();

    if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetSliderAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetSliderAuto(); });

    sliderDots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); resetSliderAuto(); });
    });

    // Touch/swipe
    let touchStartX = 0, touchEndX = 0;
    const slider = document.querySelector('.twf-slider');
    if (slider) {
      slider.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
      slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) goToSlide(currentSlide + 1);
          else goToSlide(currentSlide - 1);
          resetSliderAuto();
        }
      }, { passive: true });
    }
  }

  // ─────────────── Scroll Reveal ───────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));


  // ─────────────── Counter Animation ───────────────
  const counters = document.querySelectorAll('.about-stat-number');
  let counterAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterAnimated) {
        counterAnimated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-count'));
          const suffix = counter.getAttribute('data-suffix') || '';
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) { current = target; clearInterval(timer); }
            counter.textContent = Math.floor(current) + suffix;
          }, 25);
        });
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ─────────────── Contact Form ───────────────
  const showFormNotification = (message, type = 'info') => {
    let container = document.getElementById('form-notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'form-notification-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `form-toast form-toast--${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 50);

    // Animate out
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 4500);
  };

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.fs-form-submit');
      const originalText = submitBtn.textContent;

      // Extract form values
      const firstNameVal = document.getElementById('first-name')?.value.trim() || '';
      const lastNameVal = document.getElementById('last-name')?.value.trim() || '';
      const fullName = `${firstNameVal} ${lastNameVal}`.trim();

      const emailVal = document.getElementById('email')?.value.trim() || '';
      const phoneVal = document.getElementById('phone')?.value.trim() || '';
      const subjectVal = document.getElementById('subject')?.value.trim() || '';
      const sourceVal = document.getElementById('source')?.value || '';
      const weddingDatesVal = document.getElementById('wedding-dates')?.value.trim() || '';
      const weddingLocationVal = document.getElementById('wedding-location')?.value.trim() || '';
      const eventsDetailsVal = document.getElementById('events-details')?.value.trim() || '';

      // Client-side validations
      if (!firstNameVal || !lastNameVal) {
        showFormNotification('Please enter your first name and last name.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        showFormNotification('Please enter a valid email address.', 'error');
        return;
      }

      const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
      if (!phoneRegex.test(phoneVal)) {
        showFormNotification('Please enter a valid phone number (at least 7 digits).', 'error');
        return;
      }

      if (!subjectVal) {
        showFormNotification('Please enter a subject.', 'error');
        return;
      }

      if (!weddingDatesVal || !weddingLocationVal || !eventsDetailsVal) {
        showFormNotification('Please fill out all required fields.', 'error');
        return;
      }

      // Honeypot check for spam prevention
      const honeypotVal = document.getElementById('website')?.value;
      if (honeypotVal) {
        console.warn('Spam detected via honeypot');
        showFormNotification('Enquiry submitted successfully.', 'success');
        contactForm.reset();
        return;
      }

      // Update button state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Construct payload for the backend API (using expected snake_case keys)
      const payload = {
        access_key: '869cbdae-ec04-4b53-8594-0b07b34f29d3',
        name: fullName,
        email: emailVal,
        phone: phoneVal,
        subject: subjectVal,
        source: sourceVal,
        wedding_dates: weddingDatesVal,
        wedding_location: weddingLocationVal,
        events_details: eventsDetailsVal,
        from_name: 'ForeShadow Website Enquiry'
      };

      // Correct recipient address
      const recipient = 'ForeShadow <hello@foreshadow.in>';
      const emailSubject = `Wedding Enquiry — ${fullName} | ${subjectVal}`;

      const emailBody = [
        `Name: ${fullName}`,
        `Email: ${emailVal}`,
        `Phone: ${phoneVal}`,
        `Subject: ${subjectVal}`,
        `How did you hear about us: ${sourceVal || 'N/A'}`,
        ``,
        `Wedding Dates: ${weddingDatesVal}`,
        `Wedding Location: ${weddingLocationVal}`,
        ``,
        `Event & Guest Details:`,
        eventsDetailsVal,
        ``,
        `---`,
        `Sent via ForeShadow Contact Form`
      ].join('\n');

      // Construct mailto link
      const mailtoLink = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Post to Web3Forms API
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Server returned error response');
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            console.log('Enquiry submitted to Web3Forms:', data);

            // Show success feedback
            submitBtn.textContent = 'Enquiry Sent ✓';
            submitBtn.style.background = '#4a7c59';
            submitBtn.style.color = '#ffffff';
            submitBtn.style.borderColor = '#4a7c59';
            submitBtn.style.opacity = '1';

            showFormNotification('Enquiry submitted successfully!', 'success');
          } else {
            throw new Error(data.message || 'Submission failed');
          }

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
            contactForm.reset();
          }, 4000);
        })
        .catch(error => {
          console.error('Error submitting enquiry to server:', error);

          // Fallback: Still open mail client even if the server is down
          window.location.href = mailtoLink;

          // Show warning/semi-success feedback
          submitBtn.textContent = 'Mail App Opened ✓';
          submitBtn.style.background = '#c9a054';
          submitBtn.style.color = '#ffffff';
          submitBtn.style.borderColor = '#c9a054';
          submitBtn.style.opacity = '1';

          showFormNotification('Mail app opened. (Server backup failed to save, but mail will send)', 'warning');

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
            contactForm.reset();
          }, 4000);
        });
    });
  }

  // ─────────────── Fullscreen Image Lightbox ───────────────
  const imageLightbox = document.getElementById('lightbox-modal');
  const lightboxTrack = document.getElementById('lightbox-track');
  let lightboxSlides = [];
  let currentLightboxSlideIndex = 0;

  function showSlide(index) {
    lightboxSlides.forEach((slide, i) => {
      if (i === index) slide.classList.add('active');
      else slide.classList.remove('active');
    });
  }

  function nextSlide() {
    if (lightboxSlides.length <= 1) return;
    currentLightboxSlideIndex = (currentLightboxSlideIndex + 1) % lightboxSlides.length;
    showSlide(currentLightboxSlideIndex);
  }

  function prevSlide() {
    if (lightboxSlides.length <= 1) return;
    currentLightboxSlideIndex = (currentLightboxSlideIndex - 1 + lightboxSlides.length) % lightboxSlides.length;
    showSlide(currentLightboxSlideIndex);
  }

  function openLightbox(index, imageUrls) {
    if (!lightboxTrack || !imageLightbox) return;
    lightboxTrack.innerHTML = '';
    lightboxSlides = [];

    imageUrls.forEach((url, i) => {
      const slide = document.createElement('div');
      slide.className = 'lightbox-slide';
      const img = document.createElement('img');
      img.src = url.trim();
      img.alt = `Gallery Image ${i + 1}`;
      slide.appendChild(img);
      lightboxTrack.appendChild(slide);
      lightboxSlides.push(slide);
    });

    currentLightboxSlideIndex = index;
    showSlide(currentLightboxSlideIndex);

    imageLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
    document.addEventListener('keydown', handleKeyDown);
  }

  function closeLightbox() {
    if (!imageLightbox) return;
    imageLightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
    document.removeEventListener('keydown', handleKeyDown);
    setTimeout(() => {
      if (lightboxTrack) lightboxTrack.innerHTML = '';
      lightboxSlides = [];
    }, 500);
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'Escape') closeLightbox();
  }

  if (imageLightbox && lightboxTrack) {
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const imagesStr = item.getAttribute('data-gallery-images');
        if (imagesStr) {
          const imageUrls = imagesStr.split(',').map(s => s.trim()).reverse();
          openLightbox(0, imageUrls);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    imageLightbox.addEventListener('click', (e) => {
      if (e.target === imageLightbox || e.target.classList.contains('lightbox-content-container') || e.target === lightboxTrack) {
        closeLightbox();
      }
    });

    let touchStartX = 0;
    let touchEndX = 0;
    imageLightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    imageLightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });
  }

  // ─────────────── Video Lightbox ───────────────
  const filmCards = document.querySelectorAll('.film-card');
  const videoLightbox = document.getElementById('lightbox-modal');
  const videoWrapper = document.getElementById('lightbox-video-wrapper');

  if (videoLightbox && videoWrapper && !lightboxTrack) {
    const closeBtn = document.getElementById('lightbox-close');

    function openVideo(url) {
      let finalUrl = '';
      if (url.includes('vimeo.com')) {
        // Extract ID and use player.vimeo.com for reliable embedding
        const vimeoId = url.split('/').pop().split('?')[0];
        finalUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1&app_id=122963`;
      } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
        // Automatically extract the YouTube ID and convert it to a playable embed URL
        let videoId = '';
        if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('watch?v=')) {
          videoId = url.split('watch?v=')[1].split('&')[0];
        } else if (url.includes('/embed/')) {
          videoId = url.split('/embed/')[1].split('?')[0];
        }

        if (videoId) {
          finalUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        } else {
          finalUrl = url + (url.includes('?') ? '&' : '?') + 'autoplay=1';
        }
      }

      videoWrapper.innerHTML = `
        <iframe src="${finalUrl}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="width:100%;height:100%;"></iframe>
      `;

      videoLightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
      document.addEventListener('keydown', handleKeyDown);
    }

    function closeVideo() {
      videoLightbox.classList.remove('active');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
      document.removeEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        videoWrapper.innerHTML = '';
      }, 500);
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') closeVideo();
    }

    // ─────────────── Film Detail View & Suggestions ───────────────
    const detailSection = document.getElementById('film-detail-section');
    const pageHero = document.querySelector('.page-hero');
    const mainFilmsSection = document.querySelector('.films-section');
    const backBtn = document.getElementById('back-to-grid');

    function showFilmDetail(card) {
      if (!detailSection) return;

      const url = card.getAttribute('data-video-url');
      const playerWrapper = document.getElementById('detail-video-wrapper');
      const detailMeta = document.getElementById('detail-meta');
      const detailTitle = document.getElementById('detail-title');
      const detailExcerpt = document.getElementById('detail-excerpt');
      const suggestionsGrid = document.getElementById('suggestions-grid');

      // 1. Hide main views and show detail view
      if (pageHero) pageHero.style.display = 'none';
      if (mainFilmsSection) mainFilmsSection.style.display = 'none';
      detailSection.style.display = 'block';

      // 2. Set up player iframe
      let finalUrl = '';
      if (url.includes('vimeo.com')) {
        const vimeoId = url.split('/').pop().split('?')[0];
        finalUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1&app_id=122963`;
      } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('watch?v=')) {
          videoId = url.split('watch?v=')[1].split('&')[0];
        } else if (url.includes('/embed/')) {
          videoId = url.split('/embed/')[1].split('?')[0];
        }
        finalUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
      }

      if (playerWrapper) {
        playerWrapper.innerHTML = `
          <iframe src="${finalUrl}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="width:100%;height:100%;"></iframe>
        `;
      }

      // 3. Set metadata
      if (detailMeta) detailMeta.innerHTML = card.querySelector('.film-card-meta').innerHTML;
      if (detailTitle) detailTitle.textContent = card.querySelector('.film-card-title').textContent;
      if (detailExcerpt) detailExcerpt.textContent = card.querySelector('.film-card-excerpt').textContent;

      // 4. Generate suggestions (other 4 films)
      if (suggestionsGrid) {
        suggestionsGrid.innerHTML = '';
        const allFilms = Array.from(document.querySelectorAll('.films-section .film-card'));
        const suggestions = allFilms.filter(item => item.getAttribute('data-video-url') !== url);

        suggestions.forEach((suggFilm, index) => {
          const suggUrl = suggFilm.getAttribute('data-video-url');
          const suggCategory = suggFilm.querySelector('.film-category').textContent;
          const suggCategorySlug = suggFilm.getAttribute('data-category');
          const suggDate = suggFilm.querySelector('.film-date').textContent;
          const suggTitle = suggFilm.querySelector('.film-card-title').textContent;
          const suggExcerpt = suggFilm.querySelector('.film-card-excerpt').textContent;
          const suggImgSrc = suggFilm.querySelector('img').src;

          const col = document.createElement('div');
          col.className = 'film-card reveal-scale revealed stagger-' + (index + 1);
          col.setAttribute('data-video-url', suggUrl);
          col.setAttribute('data-category', suggCategorySlug);
          col.setAttribute('tabindex', '0');
          col.setAttribute('role', 'button');
          col.setAttribute('aria-label', `Play ${suggTitle} Wedding Film`);

          col.innerHTML = `
            <div class="film-card-image">
              <img src="${suggImgSrc}" alt="${suggTitle} Wedding Film">
              <div class="film-play-btn">
                <svg viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21"></polygon>
                </svg>
              </div>
            </div>
            <div class="film-card-info">
              <div class="film-card-meta">
                <span class="film-category">${suggCategory}</span>
                <span class="meta-dot">&bull;</span>
                <span class="film-date">${suggDate}</span>
              </div>
              <h3 class="film-card-title">${suggTitle}</h3>
              <p class="film-card-excerpt">${suggExcerpt}</p>
            </div>
          `;

          col.addEventListener('click', () => {
            showFilmDetail(suggFilm);
          });

          suggestionsGrid.appendChild(col);
        });
      }

      // 5. Scroll to top
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0 });
      }
    }

    function closeFilmDetail() {
      if (!detailSection) return;
      const playerWrapper = document.getElementById('detail-video-wrapper');
      if (playerWrapper) playerWrapper.innerHTML = '';
      detailSection.style.display = 'none';
      if (pageHero) pageHero.style.display = 'block';
      if (mainFilmsSection) mainFilmsSection.style.display = 'block';

      if (typeof lenis !== 'undefined' && lenis) {
        lenis.scrollTo(mainFilmsSection, { offset: -100, immediate: true });
      } else {
        mainFilmsSection.scrollIntoView({ behavior: 'auto' });
      }
    }

    if (backBtn) {
      backBtn.addEventListener('click', closeFilmDetail);
    }

    filmCards.forEach(card => {
      card.addEventListener('click', () => {
        const videoUrl = card.getAttribute('data-video-url');
        if (detailSection) {
          showFilmDetail(card);
        } else {
          if (videoUrl) openVideo(videoUrl);
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeVideo);

    videoLightbox.addEventListener('click', (e) => {
      if (e.target === videoLightbox || e.target.classList.contains('lightbox-content-container')) {
        closeVideo();
      }
    });

    // Deep link directly to a specific film if passed via query parameter (e.g. films.html?film=0)
    const urlParams = new URLSearchParams(window.location.search);
    const filmIndex = urlParams.get('film');
    if (filmIndex !== null && filmCards[filmIndex]) {
      setTimeout(() => {
        showFilmDetail(filmCards[filmIndex]);
      }, 300);
    }
  }

  // ─────────────── Masonry Grid Lightbox ───────────────
  const masonryItems = document.querySelectorAll('.masonry-item');
  if (masonryItems.length > 0) {
    masonryItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        // Collect all masonry image URLs
        const allUrls = [];
        masonryItems.forEach(mi => {
          const img = mi.querySelector('img');
          if (img) allUrls.push(img.src);
        });
        openLightbox(idx, allUrls);
      });
    });
  }

  // ─────────────── Iconic Grid Lightbox ───────────────
  const iconicItems = document.querySelectorAll('.iconic-cell:not(.iconic-text-tile)');
  if (iconicItems.length > 0) {
    iconicItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        // Collect all iconic grid image URLs
        const allUrls = [];
        iconicItems.forEach(ii => {
          const img = ii.querySelector('img');
          if (img) allUrls.push(img.src);
        });
        openLightbox(idx, allUrls);
      });
    });
  }

  // ─────────────── Creations Gallery Navigation to Stories Page ───────────────
  const creationItems = document.querySelectorAll('.creations-gallery-item');
  if (creationItems.length > 0) {
    creationItems.forEach((item) => {
      item.addEventListener('click', () => {
        const targetUrl = 'portfolio.html';
        const pageTransition = document.querySelector('.page-transition');
        if (pageTransition) {
          pageTransition.classList.remove('loaded');
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 750);
        } else {
          window.location.href = targetUrl;
        }
      });
    });
  }

  // ─────────────── Back to Top ───────────────
  const backTop = document.getElementById('back-to-top');
  if (backTop) {
    backTop.addEventListener('click', (e) => {
      e.preventDefault();
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─────────────── Smooth scroll anchors ───────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetVal = window.innerWidth > 1024 ? 0 : -70;
        if (lenis) lenis.scrollTo(target, { offset: offsetVal });
        else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─────────────── Photo Wall Horizontal Scroll ───────────────
  const wallContainer = document.getElementById('photo-wall-container');
  const wallPrev = document.getElementById('wall-prev');
  const wallNext = document.getElementById('wall-next');

  if (wallContainer && wallPrev && wallNext) {
    wallPrev.addEventListener('click', () => {
      const scrollAmount = window.innerWidth * 0.8;
      wallContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    wallNext.addEventListener('click', () => {
      const scrollAmount = window.innerWidth * 0.8;
      wallContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Custom cursor support if available
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      const addHover = () => cursor.classList.add('cursor-hover');
      const removeHover = () => cursor.classList.remove('cursor-hover');

      wallPrev.addEventListener('mouseenter', addHover);
      wallPrev.addEventListener('mouseleave', removeHover);
      wallNext.addEventListener('mouseenter', addHover);
      wallNext.addEventListener('mouseleave', removeHover);
    }
  }

  // ─────────────── Testimonials Marquee & Modal logic ───────────────
  const testimonialData = [
    {
      name: "Arohi & Animesh",
      role: "Wedding Couple",
      content: "Hi Prathamesh,\nFirst of all it was our luck that we found you. From day 1 you put such excellent efforts in the wedding and even planning and coordinating the entries, poses, which we will be cherishing forever.\n\nThank you for all your work, specially your patience & Professionalism during the wedding was top notch. All the Content photos, movies, reels and albums were more than what we expected\n\nThanks for creating life long memories for us.🥂✨",
      avatar: "assets/images/animesh_arohi.png",
      rating: 5,
      bgColor: "#241515" // Deep warm maroon/crimson matching photo
    },
    {
      name: "Harish & Rasika",
      role: "Wedding Couple",
      content: "Hi Prathamesh,\nI was in search of a passionate photographer — someone who would truly understand my expectations, meet them, and bring them to life in an amazing way. I was looking for someone who would not just listen to my requirements but also value them, and even suggest ways to enhance the ideas further.\n\nWhile shooting with you, both of us never felt like we were working with a typical photographer — it felt like we were shooting with a good friend. That comfort and connection helped you understand my vision even more clearly and execute it quickly and beautifully.\n\nAnd finally, now that the photos and videos are ready — they are absolutely awesome, man. Truly Loved it!\n\nHarish & Rasika",
      avatar: "assets/images/harish_rasika.png",
      rating: 5,
      bgColor: "#161b13" // Deep olive/sage green matching photo greenery
    }
  ];

  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialModal = document.getElementById('testimonial-modal');
  const modalAvatar = document.getElementById('testimonial-modal-avatar');
  const modalName = document.getElementById('testimonial-modal-name');
  const modalRole = document.getElementById('testimonial-modal-role');
  const modalRating = document.getElementById('testimonial-modal-rating');
  const modalText = document.getElementById('testimonial-modal-text');
  const modalClose = document.getElementById('testimonial-modal-close');
  const modalOverlay = document.getElementById('testimonial-modal-overlay');

  if (testimonialCards.length > 0 && testimonialModal) {
    const openTestimonial = (index) => {
      const data = testimonialData[index];
      if (!data) return;

      modalAvatar.src = data.avatar;
      modalAvatar.alt = data.name;
      modalName.textContent = data.name;
      modalRole.textContent = data.role;
      modalText.textContent = data.content; // Premium editorial presentation without raw nested quotes

      // Split names for the editorial left/right vertical indicators
      let nameLeft = '';
      let nameRight = '';
      const nameStr = data.name || '';

      if (nameStr.includes('&')) {
        const parts = nameStr.split('&');
        nameLeft = parts[0].trim();
        nameRight = parts[1].trim();
      } else if (nameStr.toLowerCase().includes(' and ')) {
        const parts = nameStr.split(/ and /i);
        nameLeft = parts[0].trim();
        nameRight = parts[1].trim();
      } else {
        const parts = nameStr.split(' ');
        nameLeft = parts[0] || '';
        nameRight = parts.slice(1).join(' ') || 'Review';
      }

      const leftOvalName = document.getElementById('testimonial-oval-name-left');
      const rightOvalName = document.getElementById('testimonial-oval-name-right');
      if (leftOvalName) leftOvalName.textContent = nameLeft;
      if (rightOvalName) rightOvalName.textContent = nameRight;

      // Populate Watermarks dynamically
      const watermarksContainer = document.getElementById('testimonial-modal-watermarks');
      if (watermarksContainer) {
        watermarksContainer.innerHTML = '';

        // Left Watermark (letters of left name repeating)
        const leftCol = document.createElement('div');
        leftCol.className = 'watermark-column watermark-left';
        const leftLetters = nameLeft.toUpperCase().replace(/[^A-Z]/g, '').split('');
        let leftContent = '';
        if (leftLetters.length > 0) {
          for (let i = 0; i < 6; i++) {
            leftContent += `<span>${leftLetters[i % leftLetters.length]}</span>`;
          }
        }
        leftCol.innerHTML = leftContent;

        // Right Watermark (letters of right name repeating)
        const rightCol = document.createElement('div');
        rightCol.className = 'watermark-column watermark-right';
        const rightLetters = nameRight.toUpperCase().replace(/[^A-Z]/g, '').split('');
        let rightContent = '';
        if (rightLetters.length > 0) {
          for (let i = 0; i < 6; i++) {
            rightContent += `<span>${rightLetters[i % rightLetters.length]}</span>`;
          }
        }
        rightCol.innerHTML = rightContent;

        watermarksContainer.appendChild(leftCol);
        watermarksContainer.appendChild(rightCol);
      }

      // Fill stars
      modalRating.innerHTML = '';
      for (let i = 0; i < data.rating; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '★';
        modalRating.appendChild(star);
      }

      testimonialModal.style.backgroundColor = data.bgColor || '#070707';
      testimonialModal.classList.add('active');
      testimonialModal.scrollTop = 0;
      const modalContainer = testimonialModal.querySelector('.testimonial-modal-container');
      if (modalContainer) {
        modalContainer.scrollTop = 0;
      }
      document.body.style.overflow = 'hidden';
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.stop();
      }
    };

    const closeTestimonial = () => {
      testimonialModal.classList.remove('active');
      document.body.style.overflow = '';
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.start();
      }
      // Reset background color after close transition completes
      setTimeout(() => {
        testimonialModal.style.backgroundColor = '';
      }, 600);
    };

    testimonialCards.forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.getAttribute('data-index'));
        openTestimonial(index);
      });

      // Hook up custom cursor hover states
      if (cursor) {
        card.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        card.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
      }
    });

    if (modalClose) modalClose.addEventListener('click', closeTestimonial);
    if (modalOverlay) modalOverlay.addEventListener('click', closeTestimonial);
  }

  // ─────────────── Featured Stories Slider ───────────────
  const storySlides = document.querySelectorAll('.story-slide');
  const storyPrev = document.getElementById('story-prev');
  const storyNext = document.getElementById('story-next');

  if (storySlides.length > 0 && storyPrev && storyNext) {
    let currentSlideIndex = 0;

    const showSlide = (index) => {
      storySlides.forEach((slide, idx) => {
        if (idx === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    };

    storyPrev.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex - 1 + storySlides.length) % storySlides.length;
      showSlide(currentSlideIndex);
    });

    storyNext.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex + 1) % storySlides.length;
      showSlide(currentSlideIndex);
    });

    // Support for custom cursor if available
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      const addHover = () => cursor.classList.add('cursor-hover');
      const removeHover = () => cursor.classList.remove('cursor-hover');

      storyPrev.addEventListener('mouseenter', addHover);
      storyPrev.addEventListener('mouseleave', removeHover);
      storyNext.addEventListener('mouseenter', addHover);
      storyNext.addEventListener('mouseleave', removeHover);

      const slideBtns = document.querySelectorAll('.story-btn');
      slideBtns.forEach(btn => {
        btn.addEventListener('mouseenter', addHover);
        btn.addEventListener('mouseleave', removeHover);
      });
    }
  }

  // ─────────────── Portfolio Page Stories Slider ───────────────
  const portfolioPrev = document.getElementById('portfolio-prev');
  const portfolioNext = document.getElementById('portfolio-next');
  const portfolioSlides = document.querySelectorAll('.portfolio-slider-section .story-slide');

  if (portfolioSlides.length > 0 && portfolioPrev && portfolioNext) {
    let currentPortfolioSlideIndex = 0;

    const showPortfolioSlide = (index) => {
      portfolioSlides.forEach((slide, idx) => {
        if (idx === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    };

    portfolioPrev.addEventListener('click', () => {
      currentPortfolioSlideIndex = (currentPortfolioSlideIndex - 1 + portfolioSlides.length) % portfolioSlides.length;
      showPortfolioSlide(currentPortfolioSlideIndex);
    });

    portfolioNext.addEventListener('click', () => {
      currentPortfolioSlideIndex = (currentPortfolioSlideIndex + 1) % portfolioSlides.length;
      showPortfolioSlide(currentPortfolioSlideIndex);
    });

    // Support for custom cursor if available
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      const addHover = () => cursor.classList.add('cursor-hover');
      const removeHover = () => cursor.classList.remove('cursor-hover');

      portfolioPrev.addEventListener('mouseenter', addHover);
      portfolioPrev.addEventListener('mouseleave', removeHover);
      portfolioNext.addEventListener('mouseenter', addHover);
      portfolioNext.addEventListener('mouseleave', removeHover);
    }
  }

  // Explore Gallery buttons on the new portfolio grid - Open in dynamic gallery page
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  portfolioCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const folder = card.getAttribute('data-folder') || 'folder_1';
      const title = card.getAttribute('data-title') || 'Featured Gallery';
      const imagesStr = card.getAttribute('data-gallery-images') || '';

      // Save images list in sessionStorage as a local fallback
      sessionStorage.setItem('current_gallery_images', imagesStr);

      const targetUrl = `gallery.html?folder=${folder}&title=${encodeURIComponent(title)}`;
      const pageTransition = document.querySelector('.page-transition');
      if (pageTransition) {
        pageTransition.classList.remove('loaded');
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 750);
      } else {
        window.location.href = targetUrl;
      }
    });
  });




  // Story Cards: Staggered scroll-reveal for new stories feed
  const storyCards = document.querySelectorAll('.story-entry');
  if (storyCards.length > 0) {
    const storyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          storyObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    storyCards.forEach(card => storyObserver.observe(card));
  }

  // ─────────────── Dedicated Gallery Page Dynamic Loading ───────────────
  const galleryPageGrid = document.getElementById('gallery-page-grid');
  if (galleryPageGrid) {
    const urlParams = new URLSearchParams(window.location.search);
    const folder = urlParams.get('folder') || 'folder_1';
    const rawTitle = urlParams.get('title') || 'Featured Gallery';

    const galleryMeta = {
      'folder_1': {
        title: 'Rushi and Suprima',
        description: 'Where Himalayan elegance meets Maharashtrian heritage. This wedding felt like a royal fairytale dreamy, graceful, and timeless. The couple carried the aura of celebrities, wrapped in tradition and luxury. A cinematic celebration of love, culture, and unforgettable moments.'
      },
      'folder_2': {
        title: 'Reva & Zach',
        description: 'Let’s call this our “Happy New Year Wedding”. We welcomed 2024 partying with Reva and Zach and we couldn’t have asked for a better beginning for the new year. This was quite an experience for us and the 450 American friends of Reva and Zach who flew all the way to Udaipur for this cross cultural union.'
      },
      'folder_3': {
        title: 'Manisha & Christopher',
        description: 'An evening of love, style and blend of two cultures in the heart of Singapore. The celebration was a beautiful testament to their journey, merging distinct traditions into a seamless and heartfelt union in the stunning city-state.'
      },
      'folder_4': {
        title: 'Alia & Ranbir, Mumbai',
        description: 'Two of the greatest actors of this generation decided to get married in the simplest possible way - in their balcony surrounded by only 30 of their closest friends and family members. We spent three days in their Apartment and witnessed love in its purest form.'
      }
    };

    const meta = galleryMeta[folder] || { title: rawTitle, description: '' };

    // Update document title
    document.title = `${meta.title} — ForeShadow`;

    // Dynamic hero background cover painting matching the folder
    const paintings = {
      'folder_1': 'assets/images/paintings/rushi_suprima_painting.jpg',
      'folder_2': 'assets/images/paintings/udaipur_painting.png',
      'folder_3': 'assets/images/paintings/singapore_painting.png',
      'folder_4': 'assets/images/paintings/mumbai_painting.png'
    };
    const heroImageEl = document.getElementById('gallery-hero-image');
    if (heroImageEl) {
      heroImageEl.src = paintings[folder] || paintings['folder_1'];
      heroImageEl.setAttribute('fetchpriority', 'high'); // Prioritize hero image loading
    }

    const heroTitleEl = document.getElementById('gallery-hero-title');
    if (heroTitleEl) {
      heroTitleEl.textContent = meta.title;
    }

    const descEl = document.getElementById('gallery-page-desc');
    if (descEl) descEl.textContent = meta.description;

    const countEl = document.getElementById('gallery-page-count'); // fallback/hidden element
    const heroCountEl = document.getElementById('gallery-hero-count');
    const loadingEl = document.getElementById('gallery-page-loading');

    // Smooth scroll from hero scroll button to intro section
    const scrollBtn = document.getElementById('gallery-hero-scroll-btn');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const introSection = document.getElementById('gallery-intro-section');
        if (introSection) {
          introSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // ─────────────── Gallery Engagement (Comments & Likes) ───────────────
    const initGalleryEngagement = async (folder) => {
      const commentsCountEl = document.getElementById('gallery-comments-count');
      const likesContainerEl = document.getElementById('gallery-likes-container');
      const likesCountEl = document.getElementById('gallery-likes-count');

      if (!commentsCountEl || !likesContainerEl || !likesCountEl) return;

      // ─────────────── Working Comments Board ───────────────
      const commentsListEl = document.getElementById('comments-list');
      const commentFormEl = document.getElementById('comment-submit-form');
      const commentAuthorName = document.getElementById('comment-author-name');
      const commentText = document.getElementById('comment-text');

      // Load comments from localStorage (starts fresh/empty)
      let comments = [];
      try {
        const stored = localStorage.getItem(`comments_${folder}`);
        if (stored) {
          comments = JSON.parse(stored);
        }
      } catch (err) {
        comments = [];
      }

      const renderComments = () => {
        if (!commentsListEl) return;
        commentsListEl.innerHTML = '';
        comments.forEach((comment) => {
          const item = document.createElement('div');
          item.className = 'comment-item';

          const initial = comment.name ? comment.name.charAt(0) : '?';

          item.innerHTML = `
            <div class="comment-avatar">${initial}</div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-author">${comment.name}</span>
                <span class="comment-date">${comment.date}</span>
              </div>
              <p class="comment-body">${comment.text}</p>
            </div>
          `;
          commentsListEl.appendChild(item);
        });

        // Update count label in meta-row
        if (commentsCountEl) {
          commentsCountEl.textContent = `${comments.length} Comments`;
        }
      };

      renderComments();

      // Submit listener
      if (commentFormEl) {
        commentFormEl.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = commentAuthorName.value.trim();
          const text = commentText.value.trim();
          if (!name || !text) return;

          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = new Date().toLocaleDateString('en-US', options);

          const newComment = {
            name: name,
            date: formattedDate,
            text: text
          };

          comments.push(newComment);

          try {
            localStorage.setItem(`comments_${folder}`, JSON.stringify(comments));
          } catch (err) { console.warn(err); }

          renderComments();

          // Reset form
          commentFormEl.reset();
        });
      }

      // Check if user has liked this story before
      let hasLiked = false;
      try {
        hasLiked = localStorage.getItem(`like_${folder}`) === 'true';
      } catch (e) { console.warn(e); }

      if (hasLiked) {
        likesContainerEl.classList.add('liked');
      }

      const namespace = 'foreshadow-likes-v3';
      const key = `story-${folder}`;

      const updateUI = (count) => {
        likesCountEl.textContent = `${Number(count).toLocaleString()} Likes`;
      };

      // Fetch likes count from API
      try {
        const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}`);
        if (res.ok) {
          const data = await res.json();
          updateUI(data.count);
        } else {
          // Initialize key to 0
          const initRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
          if (initRes.ok) {
            const initData = await initRes.json();
            const downRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/down`);
            if (downRes.ok) {
              const downData = await downRes.json();
              updateUI(downData.count);
            } else {
              updateUI(0);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching gallery likes:', err);
      }

      // Add click listener
      likesContainerEl.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let currentText = likesCountEl.textContent;
        let currentNum = parseInt(currentText) || 0;

        if (hasLiked) {
          // Unlike behavior
          hasLiked = false;
          likesContainerEl.classList.remove('liked');
          try {
            localStorage.setItem(`like_${folder}`, 'false');
          } catch (err) { console.warn(err); }

          updateUI(Math.max(0, currentNum - 1));

          try {
            const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/down`);
            if (res.ok) {
              const data = await res.json();
              updateUI(data.count);
            }
          } catch (err) {
            console.error('Error decrementing gallery likes:', err);
          }
        } else {
          // Like behavior
          hasLiked = true;
          likesContainerEl.classList.add('liked');
          try {
            localStorage.setItem(`like_${folder}`, 'true');
          } catch (err) { console.warn(err); }

          updateUI(currentNum + 1);

          try {
            const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
            if (res.ok) {
              const data = await res.json();
              updateUI(data.count);
            }
          } catch (err) {
            console.error('Error incrementing gallery likes:', err);
          }
        }
      });
    };
    initGalleryEngagement(folder);

    // Static local image fallback list for each folder
    const staticFallbacks = {
      'folder_1': [
        'assets/images/drive_photos/folder_1/PKP_-31.jpg', 'assets/images/drive_photos/folder_1/PKP_-10.jpg',
        'assets/images/drive_photos/folder_1/PKP_-11.jpg', 'assets/images/drive_photos/folder_1/PKP_-12.jpg',
        'assets/images/drive_photos/folder_1/PKP_-13.jpg', 'assets/images/drive_photos/folder_1/PKP_-14.jpg',
        'assets/images/drive_photos/folder_1/PKP_-15.jpg', 'assets/images/drive_photos/folder_1/PKP_-16.jpg',
        'assets/images/drive_photos/folder_1/PKP_-17.jpg', 'assets/images/drive_photos/folder_1/PKP_-18.jpg',
        'assets/images/drive_photos/folder_1/PKP_-19.jpg', 'assets/images/drive_photos/folder_1/PKP_-2.jpg',
        'assets/images/drive_photos/folder_1/PKP_-20.jpg', 'assets/images/drive_photos/folder_1/PKP_-21.jpg',
        'assets/images/drive_photos/folder_1/PKP_-22.jpg', 'assets/images/drive_photos/folder_1/PKP_-23.jpg',
        'assets/images/drive_photos/folder_1/PKP_-24.jpg', 'assets/images/drive_photos/folder_1/PKP_-25.jpg',
        'assets/images/drive_photos/folder_1/PKP_-26.jpg', 'assets/images/drive_photos/folder_1/PKP_-27.jpg',
        'assets/images/drive_photos/folder_1/PKP_-28.jpg', 'assets/images/drive_photos/folder_1/PKP_-29.jpg',
        'assets/images/drive_photos/folder_1/PKP_-3.jpg', 'assets/images/drive_photos/folder_1/PKP_-30.jpg',
        'assets/images/drive_photos/folder_1/PKP_-32.jpg', 'assets/images/drive_photos/folder_1/PKP_-33.jpg',
        'assets/images/drive_photos/folder_1/PKP_-34.jpg', 'assets/images/drive_photos/folder_1/PKP_-35.jpg',
        'assets/images/drive_photos/folder_1/PKP_-36.jpg', 'assets/images/drive_photos/folder_1/PKP_-37.jpg',
        'assets/images/drive_photos/folder_1/PKP_-38.jpg', 'assets/images/drive_photos/folder_1/PKP_-39.jpg',
        'assets/images/drive_photos/folder_1/PKP_-4.jpg', 'assets/images/drive_photos/folder_1/PKP_-40.jpg',
        'assets/images/drive_photos/folder_1/PKP_-41.jpg', 'assets/images/drive_photos/folder_1/PKP_-42.jpg',
        'assets/images/drive_photos/folder_1/PKP_-43.jpg',
        'https://iili.io/CocCVpa.jpg', 'https://iili.io/CocCe4I.jpg', 'https://iili.io/CocCv2t.jpg',
        'https://iili.io/CocC8YX.jpg', 'https://iili.io/CocnF3P.jpg', 'https://iili.io/CocnwAu.jpg',
        'https://iili.io/CocoBlS.jpg', 'https://iili.io/Coco3xf.jpg', 'https://iili.io/Coco1Og.jpg',
        'https://iili.io/CocowgI.jpg', 'https://iili.io/Coco4ql.jpg', 'https://iili.io/Coco612.jpg',
        'https://iili.io/CocoL79.jpg', 'https://iili.io/Cocx271.jpg', 'https://iili.io/CocxBLv.jpg',
        'https://iili.io/Cocx5Is.jpg', 'https://iili.io/CocxApn.jpg', 'https://iili.io/Cocxhhb.jpg',
        'https://iili.io/Cocxe4V.jpg', 'https://iili.io/CocxUyF.jpg', 'https://iili.io/Cocx6ZJ.jpg',
        'https://iili.io/CocxZ3N.jpg', 'https://iili.io/Coczlta.jpg', 'https://iili.io/CoczEMv.jpg',
        'https://iili.io/CoczGPR.jpg', 'https://iili.io/Cocz58P.jpg', 'https://iili.io/CoczvVf.jpg',
        'https://iili.io/CocIag2.jpg', 'https://iili.io/CocIRsf.jpg', 'https://iili.io/CocIoJI.jpg',
        'https://iili.io/CocI1e9.jpg', 'https://iili.io/CocIwgV.jpg', 'https://iili.io/CocTHrl.jpg',
        'https://iili.io/CocTd22.jpg', 'https://iili.io/CocIyBf.jpg', 'https://iili.io/CocT27S.jpg',
        'https://iili.io/CocTnBj.jpg', 'https://iili.io/CocToEx.jpg', 'https://iili.io/CocTxrQ.jpg',
        'https://iili.io/CocTTYB.jpg', 'https://iili.io/CocT6Zu.jpg', 'https://iili.io/CocTXTX.jpg',
        'https://iili.io/CocTZ3Q.jpg', 'https://iili.io/Cocuzns.jpg', 'https://iili.io/Cocuml4.jpg',
        'https://iili.io/CocAzOP.jpg', 'https://iili.io/CocAoJV.jpg', 'https://iili.io/CocAuzF.jpg',
        'https://iili.io/CocAY0v.jpg', 'https://iili.io/CocAVXn.jpg', 'https://iili.io/CocAOdl.jpg',
        'https://iili.io/CocRruI.jpg', 'https://iili.io/CocRinn.jpg', 'https://iili.io/CocR4jt.jpg',
        'https://iili.io/CocRsGs.jpg', 'https://iili.io/Coc5Jne.jpg', 'https://iili.io/Coc5EVn.jpg',
        'https://iili.io/Coc5Wlf.jpg', 'https://iili.io/Coc5VKG.jpg', 'https://iili.io/Coc5XS4.jpg',
        'https://iili.io/Coc5glj.jpg', 'https://iili.io/Coc7ldx.jpg', 'https://iili.io/Coc7agj.jpg',
        'https://iili.io/Coc7Y0b.jpg', 'https://iili.io/Coc705Q.jpg', 'https://iili.io/Coc7hqg.jpg',
        'https://iili.io/Coc7Odv.jpg', 'https://iili.io/Coc7wrJ.jpg', 'https://iili.io/CocYI3J.jpg',
        'https://iili.io/CocY04s.jpg', 'https://iili.io/CocYVyl.jpg', 'https://iili.io/CocYjZ7.jpg',
        'https://iili.io/CocaAKu.jpg', 'https://iili.io/CocaTPe.jpg', 'https://iili.io/CocaRcb.jpg',
        'https://iili.io/Coca5Sj.jpg', 'https://iili.io/Coca8iX.jpg', 'https://iili.io/CoccFWP.jpg',
        'https://iili.io/CoccB0g.jpg', 'https://iili.io/Cocc3zB.jpg', 'https://iili.io/CoccqqF.jpg',
        'https://iili.io/CoccY1n.jpg', 'https://iili.io/CoclXuR.jpg', 'https://iili.io/CoclLP9.jpg',
        'https://iili.io/Coc1db4.jpg', 'https://iili.io/Coc1O2n.jpg', 'https://iili.io/Coc14BS.jpg',
        'https://iili.io/Coc16E7.jpg', 'https://iili.io/CocEcn2.jpg', 'https://iili.io/CocEXuj.jpg',
        'https://iili.io/CocEjZQ.jpg', 'https://iili.io/CocEOMB.jpg', 'https://iili.io/CocGtsV.jpg',
        'https://iili.io/CocGbqB.jpg', 'https://iili.io/CocGsbj.jpg', 'https://iili.io/CocM9dF.jpg',
        'https://iili.io/CocMO21.jpg', 'https://iili.io/CocMDTG.jpg', 'https://iili.io/CocMbjf.jpg',
        'https://iili.io/CocMLYX.jpg', 'https://iili.io/CocV3ve.jpg', 'https://iili.io/CocVI3P.jpg',
        'https://iili.io/CocV7wJ.jpg', 'https://iili.io/CocVcnR.jpg', 'https://iili.io/CocV06N.jpg',
        'https://iili.io/CocVhwG.jpg', 'https://iili.io/CocV8c7.jpg', 'https://iili.io/CocVg9e.jpg'
      ],
      'folder_2': [
        'assets/images/drive_photos/folder_2/FS-10.jpg', 'assets/images/drive_photos/folder_2/FS-100.jpg',
        'assets/images/drive_photos/folder_2/FS-101.jpg', 'assets/images/drive_photos/folder_2/FS-102.jpg',
        'assets/images/drive_photos/folder_2/FS-103.jpg', 'assets/images/drive_photos/folder_2/FS-104.jpg',
        'assets/images/drive_photos/folder_2/FS-105.jpg', 'assets/images/drive_photos/folder_2/FS-106.jpg',
        'assets/images/drive_photos/folder_2/FS-107.jpg', 'assets/images/drive_photos/folder_2/FS-108.jpg',
        'assets/images/drive_photos/folder_2/FS-109.jpg', 'assets/images/drive_photos/folder_2/FS-11.jpg',
        'assets/images/drive_photos/folder_2/FS-110.jpg', 'assets/images/drive_photos/folder_2/FS-111.jpg',
        'assets/images/drive_photos/folder_2/FS-112.jpg'
      ],
      'folder_3': [
        'assets/images/drive_photos/folder_3/PKP-14.jpg', 'assets/images/drive_photos/folder_3/PKP-10.jpg',
        'assets/images/drive_photos/folder_3/PKP-11.jpg', 'assets/images/drive_photos/folder_3/PKP-12.jpg',
        'assets/images/drive_photos/folder_3/PKP-13.jpg', 'assets/images/drive_photos/folder_3/PKP-15.jpg',
        'assets/images/drive_photos/folder_3/PKP-16.jpg', 'assets/images/drive_photos/folder_3/PKP-17.jpg',
        'assets/images/drive_photos/folder_3/PKP-18.jpg', 'assets/images/drive_photos/folder_3/PKP-19.jpg',
        'assets/images/drive_photos/folder_3/PKP-2.jpg', 'assets/images/drive_photos/folder_3/PKP-20.jpg',
        'assets/images/drive_photos/folder_3/PKP-21.jpg', 'assets/images/drive_photos/folder_3/PKP-22.jpg',
        'assets/images/drive_photos/folder_3/PKP-23.jpg'
      ],
      'folder_4': [
        'assets/images/drive_photos/folder_4/FS-100.jpg', 'assets/images/drive_photos/folder_4/FS-10.jpg',
        'assets/images/drive_photos/folder_4/FS-101.jpg', 'assets/images/drive_photos/folder_4/FS-102.jpg',
        'assets/images/drive_photos/folder_4/FS-103.jpg', 'assets/images/drive_photos/folder_4/FS-104.jpg',
        'assets/images/drive_photos/folder_4/FS-105.jpg', 'assets/images/drive_photos/folder_4/FS-106.jpg',
        'assets/images/drive_photos/folder_4/FS-107.jpg', 'assets/images/drive_photos/folder_4/FS-109.jpg',
        'assets/images/drive_photos/folder_4/FS-11.jpg', 'assets/images/drive_photos/folder_4/FS-110.jpg',
        'assets/images/drive_photos/folder_4/FS-111.jpg', 'assets/images/drive_photos/folder_4/FS-112.jpg'
      ]
    };

    // Retrieve fallback images from sessionStorage or default to static fallbacks
    const localImagesStr = sessionStorage.getItem('current_gallery_images');
    const localImages = localImagesStr ? localImagesStr.split(',').map(s => s.trim()).filter(s => s.length > 0) : (staticFallbacks[folder] || []);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Optimized image dimension check with timeout
    const getImageDimensions = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        // Reduced timeout to 1.5s for faster perceived performance
        const timeout = setTimeout(() => {
          img.src = ""; // cancel load
          resolve({ url, isPortrait: false });
        }, 1500);

        img.onload = () => {
          clearTimeout(timeout);
          resolve({ url, isPortrait: img.naturalHeight > img.naturalWidth });
        };
        img.onerror = () => {
          clearTimeout(timeout);
          resolve({ url, isPortrait: false });
        };
        img.src = url;
      });
    };

    const renderGallery = async (images) => {
      const reversedImages = [...images].reverse();
      if (reversedImages.length === 0) {
        if (loadingEl) loadingEl.textContent = 'No photos found in this gallery.';
        return;
      }

      if (countEl) countEl.textContent = `${reversedImages.length} Photos`;
      if (heroCountEl) heroCountEl.textContent = `${reversedImages.length} Photos`;

      galleryPageGrid.innerHTML = '';

      // Use batching to render images as metadata is resolved
      // This makes the page interactive much faster without waiting for all 100+ images
      const batchSize = 10;
      let processedCount = 0;

      const processBatch = async () => {
        const end = Math.min(processedCount + batchSize, reversedImages.length);
        const batch = reversedImages.slice(processedCount, end);

        const imageDetails = await Promise.all(batch.map(url => getImageDimensions(url)));

        if (processedCount === 0 && loadingEl) {
          loadingEl.style.display = 'none';
        }

        let j = 0;
        while (j < imageDetails.length) {
          const current = imageDetails[j];
          const globalIndex = processedCount + j;

          if (current.isPortrait && j + 1 < imageDetails.length && imageDetails[j + 1].isPortrait) {
            const next = imageDetails[j + 1];
            const rowDiv = document.createElement('div');
            rowDiv.className = 'gallery-row-split';
            rowDiv.appendChild(createGalleryItem(current.url, globalIndex, reversedImages, true));
            rowDiv.appendChild(createGalleryItem(next.url, globalIndex + 1, reversedImages, true));
            galleryPageGrid.appendChild(rowDiv);
            j += 2;
          } else {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'gallery-row-full';
            rowDiv.appendChild(createGalleryItem(current.url, globalIndex, reversedImages, false, current.isPortrait));
            galleryPageGrid.appendChild(rowDiv);
            j += 1;
          }
        }

        processedCount = end;
        if (processedCount < reversedImages.length) {
          setTimeout(processBatch, 100); // Small pause to keep UI thread smooth
        }
      };

      const createGalleryItem = (url, index, allImages, isSplit, isPortrait = false) => {
        const item = document.createElement('div');
        item.className = 'gallery-page-item-new';
        if (isSplit) item.classList.add('portrait-item');
        else item.classList.add(isPortrait ? 'portrait-single-item' : 'landscape-item');

        item.setAttribute('data-index', index);
        item.style.zIndex = index + 1;

        const img = document.createElement('img');
        img.src = url;
        img.alt = `${meta.title} - Photo ${index + 1}`;
        img.loading = 'lazy';
        img.decoding = 'async'; // Fast browser-level decoding hint

        item.appendChild(img);
        item.addEventListener('click', () => openLightbox(index, allImages));

        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
          item.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
          item.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        }

        if (!prefersReducedMotion) {
          const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              item.classList.add('gallery-item-revealed');
              observer.unobserve(item);
            }
          }, { threshold: 0.1 });
          observer.observe(item);
        } else {
          item.classList.add('gallery-item-revealed');
        }

        return item;
      };

      processBatch();
    };

    // Fetch with apiBase. Fallback to local images on failure.
    fetch(`${apiBase}/api/gallery/${folder}`)
      .then(res => {
        if (!res.ok) throw new Error('API server returned error');
        return res.json();
      })
      .then(data => {
        if (data.success && data.images && data.images.length > 0) {
          renderGallery(data.images);
        } else {
          if (localImages.length > 0) {
            renderGallery(localImages);
          } else {
            if (loadingEl) loadingEl.textContent = 'No photos found in this gallery.';
          }
        }
      })
      .catch(err => {
        console.warn('Error fetching gallery from server, falling back to local images:', err);
        if (localImages.length > 0) {
          renderGallery(localImages);
        } else {
          if (loadingEl) loadingEl.textContent = 'Failed to load gallery. Please check if the local server is running.';
        }
      });
  }

  // Scroll expansion animation logic removed as requested for static layout

  // ─────────────── Films Category Filter ───────────────
  const filterBtns = document.querySelectorAll('.films-filter-container .filter-btn');
  const items = document.querySelectorAll('.films-section .films-grid .film-card');

  if (filterBtns.length > 0 && items.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        items.forEach(item => {
          const category = item.getAttribute('data-category');

          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'flex';
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
                item.style.pointerEvents = 'auto';
              });
            });
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.pointerEvents = 'none';
            setTimeout(() => {
              if (item.style.opacity === '0') {
                item.style.display = 'none';
              }
            }, 400); // matches transition time
          }
        });
      });
    });
  }

  // ─────────────── Total Website Views Counter ───────────────
  const updateWebsiteViews = async () => {
    try {
      const response = await fetch('https://api.counterapi.dev/v1/foreshadow-in/views/up');
      if (response.ok) {
        const data = await response.json();
        const viewsElement = document.getElementById('website-views-count');
        if (viewsElement) {
          viewsElement.textContent = Number(data.count).toLocaleString();
        }
      }
    } catch (error) {
      console.error('Error fetching website views:', error);
    }
  };
  updateWebsiteViews();

  // ─────────────── Stories Genuine Liking System ───────────────
  const initStoriesLikes = () => {
    const likeContainers = document.querySelectorAll('.story-entry-likes');
    if (likeContainers.length === 0) return;

    likeContainers.forEach(async (container) => {
      const article = container.closest('.story-entry');
      if (!article) return;
      const folder = article.getAttribute('data-folder');
      if (!folder) return;

      const likesCountSpan = container.querySelector('.likes-count');

      // Dynamic comments count on story feed card
      const commentsSpan = article.querySelector('.story-entry-comments');
      if (commentsSpan) {
        let commentsCount = 0;
        try {
          const stored = localStorage.getItem(`comments_${folder}`);
          if (stored) {
            commentsCount = JSON.parse(stored).length;
          }
        } catch (err) { console.warn(err); }

        commentsSpan.textContent = `${commentsCount} Comments`;
      }

      let hasLiked = false;
      try {
        hasLiked = localStorage.getItem(`like_${folder}`) === 'true';
      } catch (e) { console.warn(e); }

      if (hasLiked) {
        container.classList.add('liked');
      }

      const namespace = 'foreshadow-likes-v3';
      const key = `story-${folder}`;

      const updateUI = (count) => {
        if (likesCountSpan) {
          likesCountSpan.textContent = `${Number(count).toLocaleString()} Likes`;
        }
      };

      // Fetch current count from API
      try {
        const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}`);
        if (res.ok) {
          const data = await res.json();
          updateUI(data.count);
        } else {
          // Initialize key to 0
          const initRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
          if (initRes.ok) {
            const initData = await initRes.json();
            // Down to compensate initial increase, leaving it at 0 initially if first time
            const downRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/down`);
            if (downRes.ok) {
              const downData = await downRes.json();
              updateUI(downData.count);
            } else {
              updateUI(0);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching likes:', err);
      }

      // Click listener
      container.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent redirecting to the gallery detail page

        let currentText = likesCountSpan ? likesCountSpan.textContent : "0";
        let currentNum = parseInt(currentText) || 0;

        if (hasLiked) {
          // Unlike behavior
          hasLiked = false;
          container.classList.remove('liked');
          try {
            localStorage.setItem(`like_${folder}`, 'false');
          } catch (err) { console.warn(err); }

          updateUI(Math.max(0, currentNum - 1));

          try {
            const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/down`);
            if (res.ok) {
              const data = await res.json();
              updateUI(data.count);
            }
          } catch (err) {
            console.error('Error decrementing likes:', err);
          }
        } else {
          // Like behavior
          hasLiked = true;
          container.classList.add('liked');
          try {
            localStorage.setItem(`like_${folder}`, 'true');
          } catch (err) { console.warn(err); }

          updateUI(currentNum + 1);

          try {
            const res = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
            if (res.ok) {
              const data = await res.json();
              updateUI(data.count);
            }
          } catch (err) {
            console.error('Error incrementing likes:', err);
          }
        }
      });
    });
  };
  initStoriesLikes();

};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
