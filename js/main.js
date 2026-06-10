/* ============================================
   FORESHADOW — VMPF-Style Interactions & Animations
   ============================================ */

const init = () => {

  const apiBase = window.location.protocol === 'file:' || window.location.port !== '3000'
    ? 'http://localhost:3000'
    : '';

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
    } else {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();

      if (enterBtn) {
        enterBtn.addEventListener('click', function () {
          // Prevent double-clicks
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
          // PHASE 2 (T+600ms) — Logo flies to navbar position
          // ═══════════════════════════════════════════════

          setTimeout(function () {
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
          }, 600);

          // ═══════════════════════════════════════════════
          // PHASE 3 (T+1400ms) — Logo fades at destination
          // ═══════════════════════════════════════════════

          setTimeout(function () {
            var logo = document.querySelector('.preloader-logo');
            if (logo) {
              logo.style.transition = 'opacity 0.3s ease';
              logo.style.opacity = '0';
            }
          }, 1400);

          // ═══════════════════════════════════════════════
          // PHASE 4 (T+1800ms) — Preloader hidden, site revealed
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
            }, 1500);
          }, 1800);

        });
      }
    }
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

    const hoverTargets = document.querySelectorAll('a, button, .portfolio-item, .film-card, .blog-card, .service-card, .masonry-item, .iconic-cell, .creations-gallery-item, .nav-hamburger, .btn-vmpf, .carousel-slide');
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
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
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
          const imageUrls = imagesStr.split(',');
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

    filmCards.forEach(card => {
      card.addEventListener('click', () => {
        const videoUrl = card.getAttribute('data-video-url');
        if (videoUrl) openVideo(videoUrl);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeVideo);

    videoLightbox.addEventListener('click', (e) => {
      if (e.target === videoLightbox || e.target.classList.contains('lightbox-content-container')) {
        closeVideo();
      }
    });
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

  // ─────────────── Creations Gallery Lightbox ───────────────
  const creationItems = document.querySelectorAll('.creations-gallery-item');
  if (creationItems.length > 0) {
    creationItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        const allUrls = [];
        creationItems.forEach(ii => {
          const img = ii.querySelector('img');
          if (img) allUrls.push(img.src);
        });
        openLightbox(idx, allUrls);
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

  // ─────────────── Split Services Menu Hover logic ───────────────
  const splitServicesSection = document.getElementById('split-services-section');
  if (splitServicesSection) {
    const menuItems = splitServicesSection.querySelectorAll('.split-menu-item');
    const bgImages = splitServicesSection.querySelectorAll('.split-bg-image');

    const setActiveBg = (serviceName) => {
      bgImages.forEach(img => {
        if (img.getAttribute('data-bg') === serviceName) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
    };

    menuItems.forEach(item => {
      const service = item.getAttribute('data-service');

      item.addEventListener('mouseenter', () => {
        setActiveBg(service);
      });

      item.addEventListener('mouseleave', () => {
        setActiveBg('default');
      });

      // Support for custom cursor if available
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        item.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
      }
    });
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

  // Explore Gallery buttons on the portfolio slider - Open in a new tab/page
  const portfolioTriggerBtns = document.querySelectorAll('.portfolio-trigger-btn');
  portfolioTriggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const slide = btn.closest('.story-slide');
      const slideIndex = slide ? slide.getAttribute('data-slide-index') : '0';
      const title = slide ? slide.querySelector('.story-title-middle').textContent : 'Featured Gallery';

      const folderMap = {
        '0': 'folder_1',
        '1': 'folder_2',
        '2': 'folder_3',
        '3': 'folder_4',
        '4': 'folder_1', // Rushi & Suprima (new index)
        '5': 'folder_2', // Aishwarya & Sankhar (new index)
        '6': 'folder_3'  // Krishna & Shweta (new index)
      };
      const folder = folderMap[slideIndex] || 'folder_1';

      // Save images list in sessionStorage as a local fallback
      const imagesStr = btn.getAttribute('data-gallery-images') || '';
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

    // Support for custom cursor if available
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      btn.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      btn.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    }
  });

  // ─────────────── Dedicated Gallery Page Dynamic Loading ───────────────
  const galleryPageGrid = document.getElementById('gallery-page-grid');
  if (galleryPageGrid) {
    const urlParams = new URLSearchParams(window.location.search);
    const folder = urlParams.get('folder') || 'folder_1';
    const rawTitle = urlParams.get('title') || 'Featured Gallery';

    // Update document title
    document.title = `${rawTitle} — ForeShadow`;

    const titleEl = document.getElementById('gallery-page-title');
    if (titleEl) titleEl.textContent = rawTitle;

    const countEl = document.getElementById('gallery-page-count');
    const loadingEl = document.getElementById('gallery-page-loading');

    // Retrieve fallback images from sessionStorage
    const localImagesStr = sessionStorage.getItem('current_gallery_images');
    const localImages = localImagesStr ? localImagesStr.split(',').map(s => s.trim()).filter(s => s.length > 0) : [];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderGallery = (images) => {
      if (loadingEl) loadingEl.style.display = 'none';
      if (countEl) countEl.textContent = `${images.length} Photos`;

      const heroImg = document.getElementById('gallery-hero-img');
      if (heroImg && images.length > 0) {
        heroImg.src = images[0];
      }

      galleryPageGrid.innerHTML = '';

      images.forEach((imgUrl, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-page-item';
        item.setAttribute('data-index', index);
        // Z-index stacking: later items get higher z-index to appear in front
        item.style.zIndex = index + 1;
        // Stagger delay for animation
        item.style.animationDelay = `${index * 0.06}s`;

        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = `${rawTitle} - Photo ${index + 1}`;
        img.loading = 'lazy';
        // Reserve aspect-ratio on images to avoid layout shift
        img.style.aspectRatio = '3 / 4';

        item.appendChild(img);
        galleryPageGrid.appendChild(item);

        // Open full-screen lightbox slideshow when clicked
        item.addEventListener('click', () => {
          openLightbox(index, images);
        });

        // Support for custom cursor if available
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
          item.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
          item.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        }
      });

      // IntersectionObserver for staggered depth reveal
      if (!prefersReducedMotion) {
        const galleryItems = galleryPageGrid.querySelectorAll('.gallery-page-item');

        const galleryObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              // Set will-change for animation performance
              el.style.willChange = 'transform, opacity';
              el.classList.add('gallery-item-revealed');
              galleryObserver.unobserve(el);

              // Remove will-change after animation completes for performance
              el.addEventListener('animationend', () => {
                el.style.willChange = 'auto';
              }, { once: true });
            }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        galleryItems.forEach(item => galleryObserver.observe(item));
      } else {
        // Reduced motion: show all items immediately
        const galleryItems = galleryPageGrid.querySelectorAll('.gallery-page-item');
        galleryItems.forEach(item => {
          item.style.opacity = '1';
          item.style.transform = 'none';
        });
      }
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

  // ─────────────── Scroll Expansion Video Background ───────────────
  const expandWrapper = document.getElementById('scroll-expand-section');
  const expandSticky = document.querySelector('.scroll-expand-sticky');
  const mediaBox = document.querySelector('.scroll-expand-media-box');
  const bgImg = document.querySelector('.scroll-expand-bg-img');
  const titleLeft = document.querySelector('.scroll-expand-title-left');
  const titleRight = document.querySelector('.scroll-expand-title-right');
  const hintText = document.querySelector('.scroll-expand-hint-text');
  const revealContent = document.querySelector('.scroll-expand-reveal-content');

  if (expandWrapper && expandSticky && mediaBox) {
    const handleScrollExpansion = () => {
      const rect = expandWrapper.getBoundingClientRect();
      const scrollHeight = expandWrapper.offsetHeight - window.innerHeight;

      // Progress from 0 to 1
      let progress = -rect.top / scrollHeight;
      progress = Math.max(0, Math.min(1, progress));

      const isMobile = window.innerWidth < 768;

      // 1. Calculate media box dimensions based on progress
      const baseW = 300;
      const baseH = 400;
      const targetW = window.innerWidth;
      const targetH = window.innerHeight;

      const currentW = baseW + (targetW - baseW) * progress;
      const currentH = baseH + (targetH - baseH) * progress;
      const currentRadius = 16 * (1 - progress);

      mediaBox.style.width = `${currentW}px`;
      mediaBox.style.height = `${currentH}px`;
      mediaBox.style.borderRadius = `${currentRadius}px`;

      // Remove shadow at 100% expansion
      if (progress >= 0.99) {
        mediaBox.style.boxShadow = 'none';
      } else {
        mediaBox.style.boxShadow = '0px 15px 50px rgba(0, 0, 0, 0.4)';
      }

      // 2. Translate text laterally
      const maxTranslate = isMobile ? 180 : 150;
      const currentTranslate = progress * maxTranslate;

      if (titleLeft) titleLeft.style.transform = `translateX(-${currentTranslate}vw)`;
      if (titleRight) titleRight.style.transform = `translateX(${currentTranslate}vw)`;

      // 3. Fade out background image and hint text
      if (bgImg) bgImg.style.opacity = 1 - progress;
      if (hintText) hintText.style.opacity = 1 - progress * 1.5;

      // 4. Reveal content below when progress is high (>= 0.85)
      if (progress >= 0.85) {
        revealContent.classList.add('active');
      } else {
        revealContent.classList.remove('active');
      }
    };

    window.addEventListener('scroll', handleScrollExpansion, { passive: true });
    window.addEventListener('resize', handleScrollExpansion, { passive: true });
    handleScrollExpansion();
  }

};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
