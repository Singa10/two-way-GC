// Two Way — shared site behavior. No 3D/WebGL: plain nav, scroll reveal, form.

// ---------- Nav toggle (mobile) ----------
const toggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');

function setMenu(open) {
if (!toggle || !navList) return;
  navList.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

if (toggle && navList) {
  toggle.addEventListener('click', () => {
setMenu(!navList.classList.contains('open'));
  });
  navList.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => setMenu(false))
  );
  document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') setMenu(false);
  });
  document.addEventListener('click', (e) => {
if (
      navList.classList.contains('open') &&
!navList.contains(e.target) &&
!toggle.contains(e.target)
    ) {
setMenu(false);
    }
  });
// Closing the menu via resize back to desktop avoids it getting stuck open
  window.addEventListener('resize', () => {
if (window.innerWidth > 900) setMenu(false);
  });
}

// ---------- Reveal-on-scroll ----------
const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length) {
const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((el) => io.observe(el));
}

// ---------- Contact form (client-side demo submit) ----------
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
const note = document.querySelector('.form-note');
if (note) {
      note.textContent = "Thanks — your message has been sent. We'll be in touch shortly.";
      note.classList.add('success');
    }
    contactForm.reset();
  });
}

// ---------- Projects filter (Projects page only) ----------
const filterBar = document.querySelector('.filter-bar');
const projectCards = document.querySelectorAll('.project-card');
if (filterBar && projectCards.length) {
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.dataset.filter;
    projectCards.forEach((card) => {
      const match = category === 'all' || card.dataset.category === category;
      card.classList.toggle('is-hidden', !match);
    });
  });
}