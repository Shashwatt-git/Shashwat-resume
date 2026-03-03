const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const initPointerSpotlight = () => {
  const spotlight = document.querySelector('.spotlight');
  if (!spotlight || prefersReducedMotion) return;

  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    spotlight.style.setProperty('--x', `${x}%`);
    spotlight.style.setProperty('--y', `${y}%`);
  });
};

const initRevealAnimations = () => {
  const revealNodes = document.querySelectorAll('.glass-card, .hero-content, .avatar-container, .project-showcase-card, .metric-card');
  if (!revealNodes.length || prefersReducedMotion) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealNodes.forEach((node, index) => {
    node.style.setProperty('--delay', `${Math.min(index * 65, 420)}ms`);
    observer.observe(node);
  });
};

const initMagneticCards = () => {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.project-card-wrapper, .metric-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const rotateY = ((offsetX / rect.width) - 0.5) * 10;
      const rotateX = (0.5 - (offsetY / rect.height)) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
};

const initContactFormFeedback = () => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = 'Message queued ✓';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      form.reset();
    }, 1500);
  });
};

initPointerSpotlight();
initRevealAnimations();
initMagneticCards();
initContactFormFeedback();
