// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const percent = docHeight ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = percent + '%';
});

// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.innerHTML = document.body.classList.contains('dark') ? '<i class="fa fa-sun"></i>' : '<i class="fa fa-moon"></i>';
});

// Animated Counters
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText.replace(/,/g, '');
      const increment = Math.ceil(target / 100);
      if (current < target) {
        counter.innerText = (current + increment).toLocaleString();
        setTimeout(update, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    update();
  });
}
let countersAnimated = false;
window.addEventListener('scroll', () => {
  if (!countersAnimated) {
    const stats = document.getElementById('stats');
    if (stats && stats.getBoundingClientRect().top < window.innerHeight - 100) {
      animateCounters();
      countersAnimated = true;
    }
  }
});

// Gallery Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
function openLightbox(img, caption) {
  lightboxImg.src = img;
  lightboxCaption.textContent = caption;
  lightbox.style.display = 'flex';
  setTimeout(() => lightbox.focus(), 10);
}
function closeLightbox() {
  lightbox.style.display = 'none';
  lightboxImg.src = '';
}
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => openLightbox(item.dataset.img, item.dataset.caption));
  item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(item.dataset.img, item.dataset.caption); });
});
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (lightbox.style.display === 'flex' && (e.key === 'Escape' || e.key === ' ')) closeLightbox(); });

// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial-card');
const grid = document.querySelector('.testimonials-grid');
let currentColumn = 0;
const testimonialsPerPage = 9;
const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

function showTestimonialPage(pageIdx) {
  testimonials.forEach((card, i) => {
    const page = Math.floor(i / testimonialsPerPage);
    card.style.display = (page === pageIdx) ? 'block' : 'none';
  });
}
showTestimonialPage(currentColumn);
document.querySelector('.carousel-btn.next').addEventListener('click', () => {
  currentColumn = (currentColumn + 1) % totalPages;
  showTestimonialPage(currentColumn);
});
document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
  currentColumn = (currentColumn - 1 + totalPages) % totalPages;
  showTestimonialPage(currentColumn);
});
setInterval(() => {
  currentColumn = (currentColumn + 1) % totalPages;
  showTestimonialPage(currentColumn);
}, 6000);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('open');
  });
  question.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') item.classList.toggle('open'); });
});

// Contact Form Feedback
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.style.display = 'none';
    contactSuccess.style.display = 'block';
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = 'flex';
      contactSuccess.style.display = 'none';
    }, 4000);
  });
}

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Section Animation on Scroll
function revealOnScroll() {
  document.querySelectorAll('section, .team-member, .feature-card, .step, .stat-card, .gallery-item, .testimonial-card').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  // Trigger counters on page load if stats is visible
  const stats = document.getElementById('stats');
  if (stats && stats.getBoundingClientRect().top < window.innerHeight - 100) {
    animateCounters();
    countersAnimated = true;
  }
}); 