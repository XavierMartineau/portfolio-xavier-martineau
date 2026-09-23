const categoryButtons = document.querySelectorAll(".project-category-btn");
const projectCards = document.querySelectorAll(".project-card");

// Révèle chaque carte uniquement lorsqu'elle entre dans la fenêtre.
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
if (effectsToggle) {
  const projectsPage = document.querySelector(".projects-page");
  const label = effectsToggle.querySelector(".projects-effects-toggle-label");

  effectsToggle.addEventListener("click", () => {
    const effectsForced = projectsPage.classList.toggle("is-effects-forced");

    effectsToggle.setAttribute("aria-pressed", String(effectsForced));
    effectsToggle.setAttribute(
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
}

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
