
const carousel = document.getElementById('skills-carousel');
const track = document.getElementById('skills-track');

// Estilo necessário para scroll horizontal
track.style.display = 'inline-flex';

// Espaço entre cópias para suavizar transição
const items = track.querySelectorAll('.skill-card');
if (items.length > 0) {
  items[items.length - 1].style.marginRight = '1.5rem';
}

// Duplica os cards
const originalContent = track.innerHTML;
track.innerHTML += originalContent;

// Scroll automático infinito
let scrollStep = 1;
let delay = 10;

function autoScroll() {
  carousel.scrollLeft += scrollStep;

  if (carousel.scrollLeft >= track.scrollWidth / 2) {
    carousel.scrollLeft = 0;
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


  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (e) {
    // Aguarda um tempinho para o Formspree redirecionar o POST
    setTimeout(() => {
      alert("Mensagem enviada com sucesso!");
      form.reset(); // limpa os campos
    }, 500);
  });

