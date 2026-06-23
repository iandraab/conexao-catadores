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

  /* ---------- 4. Cartões de perfil (Histórias) ---------- */
  document.querySelectorAll(".profile").forEach((card) => {
    const toggleCard = () => {
      const open = card.classList.toggle("is-open");
      card.setAttribute("aria-expanded", String(open));
    };
    card.addEventListener("click", toggleCard);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCard(); }
    });
  });

});
