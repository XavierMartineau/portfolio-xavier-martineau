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
    const container = button.closest(".carousel-container");
    const grid = container.querySelector(".featured-grid");
    const cards = [...grid.querySelectorAll(".featured-card")];

    if (!cards.length) {
      return;
    }

    const activeIndex = cards.findIndex((card) =>
      card.classList.contains("is-active"),
    );
    const currentIndex = activeIndex === -1 ? 0 : activeIndex;
    const direction = button.classList.contains("carousel-prev") ? -1 : 1;
    const nextIndex = (currentIndex + direction + cards.length) % cards.length;

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
  });
});

document.querySelectorAll(".featured-grid").forEach((grid) => {
  const firstCard = grid.querySelector(".featured-card");

  if (firstCard) {
    firstCard.classList.add("is-active");
  }
});
