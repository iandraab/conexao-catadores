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
    const siblings = [...el.parentElement.children].filter((c) =>
      c.classList.contains("reveal"),
    );
    const index = siblings.indexOf(el);
    el.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 0.08}s`);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  revealEls.forEach((el) => io.observe(el));

  /* ---------- 2. Navbar: fundo ao rolar ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () =>
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
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

  /* ---------- 3.1. Navbar: link ativo / seção atual ---------- */
  const navLinks = document.querySelectorAll(".nav__menu a");
  const sections = [...navLinks]
    .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
    .filter(Boolean);

  const setActiveLink = (sectionId) => {
    navLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${sectionId}`,
      );
    });
  };

  const updateActiveLink = () => {
    const position = window.scrollY + 80;
    let currentSection = sections[0]?.id;

    sections.forEach((section) => {
      if (section.offsetTop <= position) {
        currentSection = section.id;
      }
    });

    if (currentSection) {
      setActiveLink(currentSection);
    }
  };

  const onScrollActive = () => {
    window.requestAnimationFrame(updateActiveLink);
  };

  window.addEventListener("scroll", onScrollActive, { passive: true });
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.slice(1);
    if (hash) setActiveLink(hash);
  });
  updateActiveLink();

  /* ---------- 4. Cartões de perfil (Histórias) → modal ---------- */
  const modal = document.getElementById("storyModal");
  if (modal) {
    const modalImg = document.getElementById("storyModalImg");
    const modalName = document.getElementById("storyModalName");
    const modalText = document.getElementById("storyModalText");

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
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
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });

    modal.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open"))
        closeModal();
    });
  }

  /* ---------- 5. FAQ (Entenda Mais) — abrir/fechar animado ---------- */
  const faqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll(".faq__item").forEach((item) => {
    const summary = item.querySelector("summary");
    const content = item.querySelector(".faq__content");
    if (!summary || !content) return;

    summary.addEventListener("click", (e) => {
      // respeita "reduzir movimento": deixa o toggle nativo (instantâneo)
      if (faqReduce.matches) return;
      e.preventDefault();
      if (item.dataset.animating === "1") return;
      item.dataset.animating = "1";

      const closing = item.open;
      const finish = () => {
        // ao fechar, o CSS .faq__item:not([open]) mantém colapsado;
        // ao abrir, a altura volta para auto
        if (closing) item.open = false;
        content.style.height = "";
        content.style.opacity = "";
        item.dataset.animating = "";
      };
      let done = false;
      const onEnd = (ev) => {
        if (done || (ev && ev.propertyName !== "height")) return;
        done = true;
        content.removeEventListener("transitionend", onEnd);
        finish();
      };

      if (closing) {
        content.style.height = content.scrollHeight + "px";
        content.style.opacity = "1";
        void content.offsetHeight; // força reflow p/ registrar o estado inicial
        content.style.height = "0px";
        content.style.opacity = "0";
      } else {
        item.open = true;
        const target = content.scrollHeight;
        content.style.height = "0px";
        content.style.opacity = "0";
        void content.offsetHeight; // força reflow p/ registrar o estado inicial
        content.style.height = target + "px";
        content.style.opacity = "1";
      }
      content.addEventListener("transitionend", onEnd);
      setTimeout(onEnd, 450); // fallback caso o transitionend não dispare
    });
  });
});
