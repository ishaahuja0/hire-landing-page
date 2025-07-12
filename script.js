// === Responsive Navbar Toggle ===
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('nav-menu_visible');
    navToggle.classList.toggle('open');
  });
}

// === Smooth Scroll for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // Optional: close nav on mobile after click
        if (navMenu && navMenu.classList.contains('nav-menu_visible')) {
          navMenu.classList.remove('nav-menu_visible');
          navToggle.classList.remove('open');
        }
      }
    }
  });
});

// === Testimonial Carousel ===
const testimonials = [
  {
    text: "This platform made hiring so much easier!",
    author: "— Jane D., HR Manager"
  },
  {
    text: "I landed my dream job in just two weeks.",
    author: "— Mark T., Candidate"
  },
  {
    text: "The interface is so simple, our team was onboarded in minutes.",
    author: "— Priya S., Recruiter"
  },
  {
    text: "Excellent support and powerful features!",
    author: "— Alex R., Talent Lead"
  }
];

let testimonialIndex = 0;
const card = document.getElementById('testimonial-card');
const nav = document.getElementById('testimonial-nav');

function renderTestimonial(idx) {
  if (!card || !nav) return;
  card.innerHTML = `
    <div class="testimonial-text">${testimonials[idx].text}</div>
    <div class="testimonial-author">${testimonials[idx].author}</div>
  `;
  renderDots(idx);
}

function renderDots(activeIdx) {
  nav.innerHTML = '';
  testimonials.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (i === activeIdx ? ' active' : '');
    dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
    dot.onclick = () => {
      testimonialIndex = i;
      renderTestimonial(testimonialIndex);
    };
    nav.appendChild(dot);
  });
}

// Auto-advance every 6 seconds
let testimonialTimer = setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial(testimonialIndex);
}, 6000);

// Pause on hover
if (card) {
  card.addEventListener('mouseenter', () => clearInterval(testimonialTimer));
  card.addEventListener('mouseleave', () => {
    testimonialTimer = setInterval(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      renderTestimonial(testimonialIndex);
    }, 6000);
  });
}

// Initial render
if (card && nav) renderTestimonial(testimonialIndex);

// === Optional: Animate Elements on Scroll (Intersection Observer) ===
const animatedEls = document.querySelectorAll('.animate-on-scroll');
const observer = new window.IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  { threshold: 0.15 }
);

animatedEls.forEach(el => observer.observe(el));
