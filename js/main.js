// Two Way — shared site behavior. No 3D/WebGL: plain nav, scroll reveal, form.

// ---------- Nav toggle (mobile) ----------
const toggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');
if (toggle && navList) {
  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  navList.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => navList.classList.remove('open'))
  );
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
