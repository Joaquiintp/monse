/* ── Fade-in on scroll ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

/* ── Mobile menu ── */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

/* ── Navbar dropdown "más" ── */
function toggleMore(e) {
  e.stopPropagation();
  const btn = e.currentTarget;
  const dropdown = document.getElementById('navDropdown');
  const isOpen = dropdown.classList.contains('open');
  dropdown.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
}
document.addEventListener('click', () => {
  const dropdown = document.getElementById('navDropdown');
  const btn = document.querySelector('.navbar__more-btn');
  if (dropdown) dropdown.classList.remove('open');
  if (btn) btn.classList.remove('open');
});

/* ── Navbar scroll opacity ── */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(255, 255, 255, 1)';
    navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,.08)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.97)';
    navbar.style.boxShadow = 'none';
  }
});

/* ── Contact form ── */
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');
  const error = document.getElementById('formError');
  success.classList.remove('show');
  error.classList.remove('show');
  const originalText = btn.textContent;
  btn.textContent = 'Enviando…';
  btn.disabled = true;

  fetch('https://formspree.io/f/mnpqopky', {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
    .then((response) => {
      if (response.ok) {
        form.reset();
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 5000);
      } else {
        error.classList.add('show');
      }
    })
    .catch(() => {
      error.classList.add('show');
    })
    .finally(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    });
}
