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
