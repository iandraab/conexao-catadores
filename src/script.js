// ═══════════════════════════════════════════════════════════
// ACCS Catadores - JavaScript Modular
// ═══════════════════════════════════════════════════════════

(function () {
  "use strict";

  // ═══════════════════════════════════════════════════════════
  // 1. BARRA DE PROGRESSO
  // ═══════════════════════════════════════════════════════════
  function initProgressBar() {
    window.addEventListener("scroll", () => {
      const pct =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      const progressBar = document.getElementById("prog");
      if (progressBar) {
        progressBar.style.width = pct + "%";
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 2. SCROLL REVEAL
  // ═══════════════════════════════════════════════════════════
  function initScrollReveal() {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ok");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));
  }

  // ═══════════════════════════════════════════════════════════
  // 3. ACCORDION - apenas um aberto por vez
  // ═══════════════════════════════════════════════════════════
  function initAccordion() {
    const accordionItems = document.querySelectorAll("[data-accordion]");

    function closeAllAccordions() {
      accordionItems.forEach((item) => {
        item.classList.remove("open");
      });
    }

    function toggleAccordion(item) {
      const isOpen = item.classList.contains("open");
      closeAllAccordions();
      if (!isOpen) {
        item.classList.add("open");
      }
    }

    accordionItems.forEach((item) => {
      const button = item.querySelector(".acc-btn");
      if (button) {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          toggleAccordion(item);
        });
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 4. TABS COMPARATIVO
  // ═══════════════════════════════════════════════════════════
  function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");

    function animateBars(painelId) {
      setTimeout(() => {
        const painel = document.getElementById(painelId);
        if (painel) {
          painel.querySelectorAll(".barra").forEach((bar) => {
            const width = bar.style.width;
            bar.style.width = "0%";
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                bar.style.width = width;
              });
            });
          });
        }
      }, 50);
    }

    function switchTab(btn, tabId) {
      const tabsComp = btn.closest(".tabs-comp");
      if (!tabsComp) return;

      // Remove active de todos os botões e painéis
      tabsComp
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("ativo"));
      tabsComp
        .querySelectorAll(".tab-painel")
        .forEach((p) => p.classList.remove("ativo"));

      // Ativa o botão clicado
      btn.classList.add("ativo");

      // Ativa o painel correspondente
      const targetPanel = document.getElementById(tabId);
      if (targetPanel) {
        targetPanel.classList.add("ativo");
        animateBars(tabId);
      }
    }

    tabButtons.forEach((btn) => {
      const tabId = btn.getAttribute("data-tab");
      if (tabId) {
        btn.addEventListener("click", () => switchTab(btn, tabId));
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 5. PERFIS - apenas um aberto por vez
  // ═══════════════════════════════════════════════════════════
  function initPerfis() {
    const perfis = document.querySelectorAll(".perfil");

    function closeAllPerfis() {
      perfis.forEach((perfil) => {
        perfil.classList.remove("ativo");
      });
    }

    function togglePerfil(perfil) {
      const isActive = perfil.classList.contains("ativo");
      closeAllPerfis();
      if (!isActive) {
        perfil.classList.add("ativo");
      }
    }

    perfis.forEach((perfil) => {
      perfil.addEventListener("click", () => togglePerfil(perfil));
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 6. SMOOTH SCROLL PARA LINKS INTERNOS (opcional)
  // ═══════════════════════════════════════════════════════════
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#") return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 7. INICIALIZAÇÃO
  // ═══════════════════════════════════════════════════════════
  function init() {
    initProgressBar();
    initScrollReveal();
    initAccordion();
    initTabs();
    initPerfis();
    initSmoothScroll();

    console.log("ACCS Catadores — Inicializado com sucesso!");
  }

  // Aguarda o DOM estar completamente carregado
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
