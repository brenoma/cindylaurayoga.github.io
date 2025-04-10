const menuToggle = document.querySelector('.menu-toggle');
const navItems = document.querySelector('.nav-items');
const navLinks = document.querySelectorAll('.nav-items a');

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(targetPosition-80, 1000); // tempo em ms (1000 = 1s)
      }
    });
  });

  function smoothScrollTo(to, duration = 800) {
    const start = window.scrollY;
    const distance = to - start;
    const startTime = performance.now();

    function scroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutQuad(progress);
      window.scrollTo(0, start + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(scroll);
  }
});

// Preloader – fora do DOMContentLoaded
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 600);
});

menuToggle.addEventListener('click', () => {
  navItems.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navItems.classList.remove('open');
  });
});