// Role : navigation entre projets, defilement et carousel de la page d'accueil.
// Rend les cartes de projets accessibles depuis la grille et la page d'accueil.
// Parcours : attend les donnees, relie le scroll et les cartes, puis configure carousel et effets tactiles.
import { projectsReady } from "./projects-data.js";

await projectsReady;

// SECTION 1 : reperes DOM necessaires au defilement et a la navigation des cartes.
const navigableProjectCards = document.querySelectorAll(
  ".project-card[data-project-id], .featured-card[data-project-id]",
);

const scrollIndicator = document.querySelector(".scroll-indicator");
const scrollArrow = document.querySelector(".scroll-arrow");
const scrollLine = document.querySelector(".scroll-line");
const scrollDot = document.querySelector(".scroll-dot");

if (scrollIndicator) {
  scrollIndicator.style.pointerEvents = "auto";
  scrollIndicator.setAttribute("aria-hidden", "false");
}

if (scrollArrow) {
  scrollArrow.style.pointerEvents = "none";
}

const featuredProjects = document.querySelector("#featured-projects");

// SECTION 2 : acces clavier/clic aux projets vedettes et mise a jour du scroll.
const scrollToFeaturedProjects = () => {
  featuredProjects?.scrollIntoView({ behavior: "smooth", block: "start" });
};

if (scrollIndicator) {
  scrollIndicator.addEventListener("click", scrollToFeaturedProjects);
  scrollIndicator.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scrollToFeaturedProjects();
    }
  });
}

const updateScrollIndicator = () => {
  // Calcule la progression globale et synchronise la ligne, le point et la fleche.
  if (!scrollIndicator || !scrollArrow || !scrollLine || !scrollDot) {
    return;
  }

  const maxScroll = Math.max(window.innerHeight * 0.9, 1);
  const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
  const startThreshold = progress < 0.04;
  const arrowTravel = Math.max(
    scrollLine.clientHeight - scrollArrow.offsetHeight,
    0,
  );
  const travel = startThreshold ? 0 : progress * arrowTravel;
  const dotPosition = startThreshold
    ? "0%"
    : `${Math.min(progress * 100, 100)}%`;
  const cyanStrength = 60 + progress * 35;

  scrollLine.style.background = `linear-gradient(to bottom, rgba(125, 249, 255, 0.85) 0%, rgba(125, 249, 255, 0.85) ${dotPosition}, rgba(99, 102, 241, 0.04) ${dotPosition}, rgba(99, 102, 241, 0.04) 100%)`;
  scrollDot.style.top = dotPosition;
  scrollDot.style.background = `hsl(188 100% ${cyanStrength}%)`;
  scrollDot.style.boxShadow = `0 0 10px hsl(188 100% ${cyanStrength - 5}%), 0 0 24px rgba(0, 243, 255, 0.95)`;
  scrollArrow.style.transform = `translateY(${travel}px)`;
};

window.addEventListener("scroll", updateScrollIndicator, { passive: true });
window.addEventListener("resize", updateScrollIndicator);
updateScrollIndicator();

// SECTION 3 : rend chaque carte navigable a la souris et au clavier.
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

// SECTION 4 : carousel mobile/tablette, avec un index independant par grille.
// Anime la pile uniquement lorsque les flèches mobile/tablette sont utilisées.
document.querySelectorAll(".featured-grid").forEach((grid) => {
  // Chaque grille possede son propre index pour fonctionner sans etat global partage.
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

// SECTION 5 : interrupteur d'effets visuels pour les appareils tactiles.
// Force ou rétablit le rendu produit par le hover desktop sur mobile.
document.querySelectorAll(".carousel-effects-toggle").forEach((button) => {
  const container = button.closest(".featured-grid-container");
  const label = button.querySelector(".carousel-effects-toggle-label");

  button.addEventListener("click", () => {
    const effectsForced = container.classList.toggle("is-effects-forced");
    const modeLabel = effectsForced ? "Image seule" : "Texte + flou";

    button.setAttribute("aria-pressed", String(effectsForced));
    button.dataset.i18nLabel = modeLabel;
    button.setAttribute("aria-label", modeLabel);

    if (label) {
      label.dataset.i18n = modeLabel;
      label.textContent = modeLabel;
    }

    window.translatePortfolio?.();
  });
});
