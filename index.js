// ===== TYPING EFFECT =====
const titleText = "Não criamos arte. \nCriamos posicionamento.";
const subtitleText = "Estratégia, design e execução para negócios que querem crescer.";
const speed = 70;

let i = 0;
let j = 0;

function typeTitle() {
  const el = document.getElementById("typing-text");
  if (!el) return;

  if (i < titleText.length) {
    el.innerHTML += titleText.charAt(i);
    i++;
    setTimeout(typeTitle, speed);
  } else {
    typeSubtitle();
  }
}
function typeSubtitle() {
  const el = document.getElementById("typing-subtitle");
  if (!el) return;

  if (j < subtitleText.length) {
    el.innerHTML += subtitleText.charAt(j);
    j++;
    setTimeout(typeSubtitle, speed);
  }
}
typeTitle();

// ===== MENU LATERAL =====
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

let menuOpen = false;

menuBtn?.addEventListener("click", () => {
  menuOpen = !menuOpen;

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");

  menuBtn.textContent = menuOpen ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(menuOpen));
});

overlay?.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  menuBtn.textContent = "☰";
  menuBtn.setAttribute("aria-expanded", "false");
  menuOpen = false;
});

// ===== MODAL (EXPANSÃO) =====
const modal = document.getElementById("project-modal");
const modalImg = document.getElementById("project-image");
const modalClose = document.getElementById("project-close");

function openProject(src) {
  if (!modal || !modalImg) return;

  modalImg.src = src;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");

  const content = modal.querySelector(".project-modal__content");
  if (content) content.scrollTop = 0;

  setTimeout(() => modalClose?.focus(), 0);
}

function closeProject() {
  if (!modal || !modalImg) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  modalImg.src = "";
}

modalClose?.addEventListener("click", closeProject);

modal?.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.matches("[data-close='true']")) closeProject();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("active")) closeProject();
});

// clique nos cards abre modal
function bindCards(scope = document) {
  scope.querySelectorAll(".portfolio-card--click").forEach((card) => {
    card.addEventListener("click", () => {
      const src = card.getAttribute("data-expand");
      if (!src) return;
      openProject(src);
    });
  });
}
bindCards(document);

// ===== PAGINAÇÃO: 2 CARDS POR VEZ (page 0, page 1, ...) =====
// Agora os botões podem existir no topo e/ou nas laterais.
// Como existem 2 pares de botões no mesmo grupo (top + side), a gente liga todos.
document.querySelectorAll(".portfolio-group[data-pager='2']").forEach((group) => {
  const pages = Array.from(group.querySelectorAll(".page"));

  const prevBtns = Array.from(group.querySelectorAll(".pager-prev"));
  const nextBtns = Array.from(group.querySelectorAll(".pager-next"));

  let index = 0;

  function render() {
    pages.forEach((p, i) => p.classList.toggle("active", i === index));

    const isFirst = index === 0;
    const isLast = index === pages.length - 1;

    prevBtns.forEach((btn) => btn.classList.toggle("is-hidden", isFirst));
    nextBtns.forEach((btn) => btn.classList.toggle("is-hidden", isLast));
  }

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (index > 0) index--;
      render();
    });
  });

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (index < pages.length - 1) index++;
      render();
    });
  });

  render();
});