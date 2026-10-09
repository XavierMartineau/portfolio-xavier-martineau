// Role : gere les filtres et les effets des cartes du catalogue de projets.
// Parcours : attend leur rendu, revele les cartes visibles, puis synchronise filtres et commandes tactiles.
import { projectsReady } from "./projects-data.js";

await projectsReady;

// SECTION 1 : references aux boutons de filtre et cartes rendues dans le catalogue.
const categoryButtons = document.querySelectorAll(".project-category-btn");
const projectCards = document.querySelectorAll(".project-card");

// Anime l'apparition des cartes quand elles deviennent visibles dans la fenetre.
// Révèle chaque carte uniquement lorsqu'elle entre dans la fenêtre.
// SECTION 2 : revele les cartes a l'ecran et les affiche toutes si l'observateur manque.
if ("IntersectionObserver" in window) {
  const projectRevealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  projectCards.forEach((card) => projectRevealObserver.observe(card));
} else {
  projectCards.forEach((card) => card.classList.add("is-visible"));
}

// Force ou rétablit le rendu hover des cartes sur mobile et tablette.
const effectsToggle = document.querySelector(".projects-effects-toggle");
// SECTION 3 : rend les effets de survol accessibles sur les appareils tactiles.
if (effectsToggle) {
  const projectsPage = document.querySelector(".projects-page");
  const label = effectsToggle.querySelector(".projects-effects-toggle-label");

  effectsToggle.addEventListener("click", () => {
    const effectsForced = projectsPage.classList.toggle("is-effects-forced");
    const modeLabel = effectsForced ? "Image seule" : "Texte + flou";

    effectsToggle.setAttribute("aria-pressed", String(effectsForced));
    effectsToggle.dataset.i18nLabel = modeLabel;
    effectsToggle.setAttribute("aria-label", modeLabel);

    if (label) {
      label.dataset.i18n = modeLabel;
      label.textContent = modeLabel;
    }

    window.translatePortfolio?.();
  });
}

// Maintient les filtres synchronises et masque les cartes hors categories selectionnees.
// SECTION 4 : autorise plusieurs categories actives et masque les cartes sans correspondance.
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.category === "all") {
      categoryButtons.forEach((categoryButton) => {
        categoryButton.classList.toggle(
          "active",
          categoryButton.dataset.category === "all",
        );
      });
    } else {
      const allButton = document.querySelector(
        '.project-category-btn[data-category="all"]',
      );

      button.classList.toggle("active");
      allButton.classList.remove("active");

      const selectedButtons = document.querySelectorAll(
        '.project-category-btn.active:not([data-category="all"])',
      );

      if (selectedButtons.length === 0) {
        allButton.classList.add("active");
      }
    }

    // Un filtre de categorie peut etre combine avec les autres; « Tous » les desactive.
    const selectedCategories = Array.from(
      document.querySelectorAll(
        '.project-category-btn.active:not([data-category="all"])',
      ),
    ).map((activeButton) => activeButton.dataset.category);

    const showAll = document
      .querySelector('.project-category-btn[data-category="all"]')
      .classList.contains("active");

    projectCards.forEach((card) => {
      const shouldHide =
        !showAll && !selectedCategories.includes(card.dataset.category);

      card.classList.toggle("is-hidden", shouldHide);
    });
  });
});
