const carousel = document.getElementById('skills-carousel');
const track = document.getElementById('skills-track');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const backToTopButton = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

if (carousel && track) {
  track.style.display = 'inline-flex';

  const items = track.querySelectorAll('.skill-card');
  if (items.length > 0) {
    items[items.length - 1].style.marginRight = '1.5rem';
  }

  const originalContent = track.innerHTML;
  track.innerHTML += originalContent;

  const scrollStep = 1;
  const delay = 10;

  const autoScroll = () => {
    carousel.scrollLeft += scrollStep;

    if (carousel.scrollLeft >= track.scrollWidth / 2) {
      carousel.scrollLeft = 0;
    }
  };

  let scrollInterval = setInterval(autoScroll, delay);

  carousel.addEventListener('mouseenter', () => clearInterval(scrollInterval));
  carousel.addEventListener('mouseleave', () => {
    scrollInterval = setInterval(autoScroll, delay);
  });
}

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', function () {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      if (mobileMenu) {
        mobileMenu.style.display = 'none';
      }

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

if (backToTopButton) {
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const submitButton = contactForm.querySelector('.btn-submit');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
    }

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erro no envio');
      }

      alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.`);
      contactForm.reset();
    } catch (error) {
      alert('Não foi possível enviar sua mensagem agora. Tente novamente em instantes.');
    } finally {
      if (submitButton) {
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
        submitButton.disabled = false;
      }
    }
  });
}
