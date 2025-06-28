

const carousel = document.querySelector('.skills-carousel');
const carousel = document.querySelector('.skills-carousel');
const content = document.getElementById('skills-content');

// Duplica os itens para scroll infinito suave
content.innerHTML += content.innerHTML;

let scrollStep = 1;
let delay = 10;

function autoScroll() {
  if (carousel.scrollLeft >= content.scrollWidth / 2) {
    carousel.scrollLeft = 0;
  } else {
    carousel.scrollLeft += scrollStep;
  }
}

let scrollInterval = setInterval(autoScroll, delay);

// Pausar no hover (opcional)
carousel.addEventListener('mouseenter', () => clearInterval(scrollInterval));
carousel.addEventListener('mouseleave', () => {
  scrollInterval = setInterval(autoScroll, delay);
});






   // Mobile menu toggle
    document.getElementById('mobile-menu-button').addEventListener('click', function () {
        const menu = document.getElementById('mobile-menu');
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Fecha o menu mobile
                document.getElementById('mobile-menu').style.display = 'none';

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');

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

    // Form submission
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve.`);

        this.reset();
    });