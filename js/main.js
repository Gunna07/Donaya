/* ==========================================================================
   CROWN & CONTOUR ESCAPES - LUXURY JAVASCRIPT
   Interactive Experiences, Sliders, Filters, and Booking Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Navigation on Scroll ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- 2. Mobile Drawer Navigation ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const drawerClose = document.querySelector('.drawer-close');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.add('open');
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerBackdrop) {
      mobileDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  // --- 3. Destinations Carousel Navigation ---
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (carouselTrack && prevBtn && nextBtn) {
    const scrollStep = () => {
      const card = carouselTrack.querySelector('.destination-card');
      return card ? card.offsetWidth + 24 : 340;
    };

    nextBtn.addEventListener('click', () => {
      carouselTrack.scrollBy({ left: scrollStep(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      carouselTrack.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
    });
  }

  // --- 4. Interactive Travel Vibe & Estimator Widget ---
  const vibeOptions = document.querySelectorAll('[data-vibe]');
  const resultTitle = document.getElementById('estimateResultTitle');
  const resultDesc = document.getElementById('estimateResultDesc');
  const resultCuratedFor = document.getElementById('estimateCuratedFor');
  const resultEstimateBtn = document.getElementById('estimateBookBtn');

  const vibeData = {
    'girls-trip': {
      title: "The Ultimate 'Soft Life' Girls Getaway",
      desc: "Private 5-star villa with private infinity pool, catamaran yacht day with champagne, VIP airport transfers, and reserved cabana dining.",
      tag: "Ideal for 4-10 Queens • Turks & Caicos or Cabo"
    },
    'baecation': {
      title: "Romantic Overwater Sanctuary",
      desc: "Private overwater bungalow, candlelit sunset beach dinner, side-by-side couple spa treatments, and seamless VIP flight upgrades.",
      tag: "For 2 Royals • Bora Bora, St. Lucia, or Maldives"
    },
    'birthday': {
      title: "Crown Jubilee Birthday Celebration",
      desc: "VIP nightlife reservations with custom champagne sparkler service, yacht day, professional photoshoot, and luxury penthouse stay.",
      tag: "Bespoke Milestone Event • Miami, Dubai, or Vegas"
    },
    'concert': {
      title: "All-Inclusive VIP Concert & Event Tour",
      desc: "Front-row or suite tickets (Chris Brown, Usher & world tours), luxury hotel accommodations, private ground transportation, and after-party access.",
      tag: "Star Power Experience • Global Arenas"
    },
    'solo-wellness': {
      title: "Crowned Self-Care & Luxury Escape",
      desc: "Tranquil oceanview sanctuary, personalized wellness concierge, daily private yoga & meditation, and stress-free curated relaxation.",
      tag: "Solo Queen Sanctuary • Bali, Costa Rica, or Santorini"
    }
  };

  if (vibeOptions.length > 0 && resultTitle) {
    vibeOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        vibeOptions.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const vibe = btn.getAttribute('data-vibe');
        const data = vibeData[vibe];
        if (data) {
          resultTitle.textContent = data.title;
          resultDesc.textContent = data.desc;
          if (resultCuratedFor) resultCuratedFor.textContent = data.tag;
          if (resultEstimateBtn) {
            resultEstimateBtn.href = `contact.html?vibe=${encodeURIComponent(vibe)}`;
          }
        }
      });
    });
  }

  // --- 5. Testimonial Carousel ---
  const testimonialCards = document.querySelectorAll('.testimonial-slide');
  const dotBtns = document.querySelectorAll('.dot-btn');
  let currentTestimonial = 0;
  let testimonialInterval = null;

  function showTestimonial(index) {
    if (testimonialCards.length === 0) return;
    testimonialCards.forEach((slide, i) => {
      slide.style.display = (i === index) ? 'block' : 'none';
    });
    dotBtns.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
  }

  if (testimonialCards.length > 0) {
    showTestimonial(0);

    dotBtns.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
        restartTestimonialTimer();
      });
    });

    function nextTestimonial() {
      let nextIndex = (currentTestimonial + 1) % testimonialCards.length;
      showTestimonial(nextIndex);
    }

    function startTestimonialTimer() {
      testimonialInterval = setInterval(nextTestimonial, 6000);
    }

    function restartTestimonialTimer() {
      clearInterval(testimonialInterval);
      startTestimonialTimer();
    }

    startTestimonialTimer();

    const testimonialContainer = document.querySelector('.testimonials-carousel');
    if (testimonialContainer) {
      testimonialContainer.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
      testimonialContainer.addEventListener('mouseleave', startTestimonialTimer);
    }
  }

  // --- 6. Services Filter Tabs (services.html) ---
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card-item');

  if (filterBtns.length > 0 && serviceCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat.includes(category)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.5s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 7. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // --- 8. Interactive Booking & Inquiry Form Submission ---
  const bookingForm = document.getElementById('travelBookingForm');
  const confirmationModal = document.getElementById('confirmationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = document.getElementById('clientName')?.value || 'Valued Queen';
      const tripType = document.getElementById('tripType')?.value || 'Curated Escape';

      // Update modal text
      const modalGuestName = document.getElementById('modalGuestName');
      const modalTripType = document.getElementById('modalTripType');
      if (modalGuestName) modalGuestName.textContent = name;
      if (modalTripType) modalTripType.textContent = tripType;

      // Show confirmation modal
      if (confirmationModal) {
        confirmationModal.classList.add('active');
      }

      bookingForm.reset();
    });
  }

  if (closeModalBtn && confirmationModal) {
    closeModalBtn.addEventListener('click', () => {
      confirmationModal.classList.remove('active');
    });
  }

  if (confirmationModal) {
    confirmationModal.addEventListener('click', (e) => {
      if (e.target === confirmationModal) {
        confirmationModal.classList.remove('active');
      }
    });
  }

  // --- 9. Pre-fill vibe from URL query param if present ---
  const urlParams = new URLSearchParams(window.location.search);
  const requestedVibe = urlParams.get('vibe');
  const tripTypeSelect = document.getElementById('tripType');
  if (requestedVibe && tripTypeSelect) {
    const map = {
      'girls-trip': 'Girls Trip',
      'baecation': 'Baecation',
      'birthday': 'Birthday Getaway',
      'concert': 'Concert & Event Package',
      'solo-wellness': 'Solo Luxury Escape'
    };
    if (map[requestedVibe]) {
      tripTypeSelect.value = map[requestedVibe];
    }
  }

  // --- 10. FAQ Search & Category Filter (faq.html) ---
  const faqSearchInput = document.getElementById('faqSearchInput');
  const faqCatBtns = document.querySelectorAll('.faq-cat-btn');
  const allFaqItems = document.querySelectorAll('.faq-item');
  const faqBlocks = document.querySelectorAll('.faq-category-block');
  const noFaqResults = document.getElementById('noFaqResults');

  function filterFAQs() {
    const query = faqSearchInput ? faqSearchInput.value.toLowerCase().trim() : '';
    const activeCatBtn = document.querySelector('.faq-cat-btn.active');
    const selectedCat = activeCatBtn ? activeCatBtn.getAttribute('data-cat') : 'all';

    let totalVisible = 0;

    faqBlocks.forEach(block => {
      const blockCat = block.getAttribute('data-block-cat');
      const itemsInBlock = block.querySelectorAll('.faq-item');
      let visibleInBlock = 0;

      itemsInBlock.forEach(item => {
        const text = item.textContent.toLowerCase();
        const matchesQuery = !query || text.includes(query);
        const matchesCat = (selectedCat === 'all' || blockCat === selectedCat);

        if (matchesQuery && matchesCat) {
          item.style.display = 'block';
          visibleInBlock++;
          totalVisible++;
          // Auto-expand question if searching specific term
          if (query.length > 2) {
            item.classList.add('active');
          }
        } else {
          item.style.display = 'none';
        }
      });

      // Show/hide category heading block based on whether any items match
      if (visibleInBlock > 0) {
        block.style.display = 'block';
      } else {
        block.style.display = 'none';
      }
    });

    if (noFaqResults) {
      noFaqResults.style.display = (totalVisible === 0) ? 'block' : 'none';
    }
  }

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', filterFAQs);
  }

  if (faqCatBtns.length > 0) {
    faqCatBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        faqCatBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterFAQs();
      });
    });
  }

});
