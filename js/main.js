/* =========================================================
   CONEXÃO CATADORES — JS base (leve)
   - Animações de entrada ao rolar (IntersectionObserver)
   - Menu mobile
   - Estado da navbar ao rolar
   - Cartões de perfil expansíveis
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  // Aplica um pequeno atraso em cascata entre itens irmãos
  revealEls.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    const index = siblings.indexOf(el);
    el.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 0.08}s`);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target); // anima só uma vez
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  revealEls.forEach((el) => io.observe(el));

  /* ---------- 2. Navbar: fundo ao rolar ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 3. Menu mobile ---------- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Fecha o menu ao clicar num link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 4. Cartões de perfil (Histórias) → modal ---------- */
  const modal = document.getElementById("storyModal");
  if (modal) {
    const modalImg = document.getElementById("storyModalImg");
    const modalName = document.getElementById("storyModalName");
    const modalText = document.getElementById("storyModalText");

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const openModal = (card) => {
      const img = card.querySelector(".profile__img");
      const name = card.querySelector(".profile__name");
      const body = card.querySelector(".profile__body");
      modalImg.src = img ? img.getAttribute("src") : "";
      modalName.textContent = name ? name.textContent : "";
      modalText.innerHTML = body ? body.innerHTML : "";
      modal.classList.remove("is-closing");
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      // trava o scroll compensando a largura da barra (evita o "pulo" da página)
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      if (sbw > 0) document.body.style.paddingRight = sbw + "px";
      document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
      if (!modal.classList.contains("is-open")) return;
      const finish = () => {
        modal.classList.remove("is-open", "is-closing");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
      if (prefersReduced.matches) {
        finish();
        return;
      }
      modal.classList.remove("is-open");
      modal.classList.add("is-closing");
      const box = modal.querySelector(".story-modal__box");
      let done = false;
      const end = () => {
        if (done) return;
        done = true;
        box.removeEventListener("animationend", end);
        finish();
      };
      box.addEventListener("animationend", end);
      setTimeout(end, 300); // fallback caso o animationend não dispare
    };

    document.querySelectorAll(".profile").forEach((card) => {
      const open = () => openModal(card);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });

    modal.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

});
