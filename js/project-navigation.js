// Rend les cartes de projets accessibles depuis la grille et la page d'accueil.
const navigableProjectCards = document.querySelectorAll(
  ".project-card[data-project-id], .featured-card[data-project-id]",
);

const scrollIndicator = document.querySelector(".scroll-indicator");
const featuredProjects = document.querySelector("#featured-projects");

scrollIndicator?.addEventListener("click", (event) => {
  event.preventDefault();
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

  featuredProjects?.scrollIntoView({ behavior, block: "start" });
});

document.querySelector(".scroll-arrow")?.addEventListener("click", (event) => {
  event.stopPropagation();
  featuredProjects?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
});

navigableProjectCards.forEach((card) => {
  // Conserve le comportement de lien si une carte est cliquée directement.
  card.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) {
      return;
    }

    const projectId = card.dataset.projectId;
    window.location.href = `page_de_projets.html?project=${projectId}`;
  });

  if (card.tagName !== "A") {
    // Ajoute une navigation clavier aux cartes qui ne sont pas déjà des liens.
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", (event) => {
      // Entrée et espace déclenchent la même navigation qu'un clic.
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.location.href = `page_de_projets.html?project=${card.dataset.projectId}`;
      }
    });
  }
});

// Anime la pile uniquement lorsque les flèches mobile/tablette sont utilisées.
document.querySelectorAll(".featured-grid").forEach((grid) => {
  const cards = [...grid.querySelectorAll(".featured-card")];
  let currentIndex = 0;

  if (!cards.length) {
    return;
  }

  const updateCarousel = (nextIndex, direction) => {
    grid.dataset.direction = direction;

    cards.forEach((card, index) => {
      card.classList.remove("is-active", "is-stack-one", "is-stack-two");

      if (index === nextIndex) {
        card.classList.add("is-active");
      } else if (index === (nextIndex + 1) % cards.length) {
        card.classList.add("is-stack-one");
      } else if (index === (nextIndex + 2) % cards.length) {
        card.classList.add("is-stack-two");
      }
    });

    currentIndex = nextIndex;
  };

  // La première carte est active au chargement du carousel.
  updateCarousel(0, "next");

  grid
    .closest(".featured-grid-container")
    .querySelectorAll(".carousel-btn")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const isPrevious = button.classList.contains("carousel-prev");
        const direction = isPrevious ? "previous" : "next";
        const offset = isPrevious ? -1 : 1;
        const nextIndex = (currentIndex + offset + cards.length) % cards.length;

        updateCarousel(nextIndex, direction);
      });
    });
});

// Force ou rétablit le rendu produit par le hover desktop sur mobile.
document.querySelectorAll(".carousel-effects-toggle").forEach((button) => {
  const container = button.closest(".featured-grid-container");
  const label = button.querySelector(".carousel-effects-toggle-label");

  button.addEventListener("click", () => {
    const effectsForced = container.classList.toggle("is-effects-forced");

    button.setAttribute("aria-pressed", String(effectsForced));
    button.setAttribute(
      "aria-label",
      effectsForced
        ? "Désactiver le texte et le blur"
        : "Activer le texte et le blur",
    );

    if (label) {
      label.textContent = effectsForced
        ? "Désactiver texte + blur"
        : "Activer texte + blur";
    }
  });
});
