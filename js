
/* ============================================================
   LUCE DI STRADA — main.js
============================================================ */

/* ---- Year in footer ---- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---- Smooth scroll helper ---- */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ---- Smooth scroll for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ---- Mobile hamburger ---- */
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

function closeMenu() {
  mainNav.classList.remove('open');
}

/* ---- Scroll reveal (generic) ---- */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ---- Menu items staggered reveal ---- */
const menuItems = document.querySelectorAll('.menu-item');
const menuObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (i % 10) * 60);
      menuObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

menuItems.forEach(el => menuObserver.observe(el));

/* ---- Reservation form validation & toast ---- */
const form  = document.getElementById('reservation-form');
const toast = document.getElementById('toast');

function showError(id) {
  document.getElementById(id).classList.add('show');
}
function hideError(id) {
  document.getElementById(id).classList.remove('show');
}
function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const name  = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const date  = document.getElementById('f-date').value;
  const time  = document.getElementById('f-time').value;

  if (name.length < 2)                              { showError('err-name');  valid = false; } else hideError('err-name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))   { showError('err-email'); valid = false; } else hideError('err-email');
  if (phone.length < 5)                             { showError('err-phone'); valid = false; } else hideError('err-phone');
  if (!date)                                        { showError('err-date');  valid = false; } else hideError('err-date');
  if (!time)                                        { showError('err-time');  valid = false; } else hideError('err-time');

  if (!valid) return;

  showToast();
  form.reset();
});
