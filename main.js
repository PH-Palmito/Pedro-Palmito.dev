const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const backToTopButton = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");
const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");

    mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
    mobileMenuButton.innerHTML = isOpen
      ? '<i class="fas fa-xmark"></i>'
      : '<i class="fas fa-bars"></i>';
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const targetElement = targetId ? document.querySelector(targetId) : null;

    if (!targetElement) {
      return;
    }

    event.preventDefault();

    if (mobileMenu) {
      mobileMenu.classList.remove("open");
    }

    if (mobileMenuButton) {
      mobileMenuButton.setAttribute("aria-expanded", "false");
      mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    }

    window.scrollTo({
      top: targetElement.offsetTop - 76,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
});

if (backToTopButton) {
  window.addEventListener(
    "scroll",
    () => {
      backToTopButton.classList.toggle("visible", window.scrollY > 320);
    },
    { passive: true }
  );

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add("visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(".btn-submit");
    const name = document.getElementById("name")?.value || "Obrigado";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando';
    }

    if (formFeedback) {
      formFeedback.textContent = "Enviando mensagem...";
      formFeedback.classList.remove("error");
    }

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro no envio");
      }

      contactForm.reset();

      if (formFeedback) {
        formFeedback.textContent = `Mensagem enviada com sucesso. Obrigado, ${name}!`;
      }
    } catch (error) {
      if (formFeedback) {
        formFeedback.textContent = "Nao foi possivel enviar agora. Tente novamente ou fale comigo por email.";
        formFeedback.classList.add("error");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensagem';
      }
    }
  });
}
