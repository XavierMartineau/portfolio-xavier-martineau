const navigableProjectCards = document.querySelectorAll(
  ".project-card[data-project-id], .featured-card[data-project-id]",
);

navigableProjectCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) {
      return;
    }

    const projectId = card.dataset.projectId;
    window.location.href = `page_de_projets.html?project=${projectId}`;
  });

  if (card.tagName !== "A") {
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.location.href = `page_de_projets.html?project=${card.dataset.projectId}`;
      }
    });
  }
});

document.querySelectorAll(".carousel-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Récupère le conteneur principal du carrousel et la grille de cartes associée
    const container = button.closest(".carousel-container");
    const grid = container.querySelector(".featured-grid");

    // Définit la distance de défilement (85% de la largeur visible du carrousel)
    const scrollAmount = grid.clientWidth * 0.85;

    // Effectue un défilement horizontal fluide vers la gauche ou la droite
    grid.scrollBy({
      left: button.classList.contains("carousel-prev")
        ? -scrollAmount
        : scrollAmount,
      behavior: "smooth",
    });
  });
});
