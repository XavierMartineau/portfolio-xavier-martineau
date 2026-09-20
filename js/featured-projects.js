const projectCards = document.querySelectorAll("[data-project]");

async function loadFeaturedProjects() {
  const response = await fetch("../data/projects.json");

  if (!response.ok) {
    throw new Error(`Impossible de charger les projets (${response.status})`);
  }

  const projectData = await response.json();

  projectCards.forEach((card) => {
    const project = projectData.featured[card.dataset.project];

    if (!project) {
      return;
    }

    const category = card.querySelector("[data-project-category]");
    const title = card.querySelector("[data-project-title]");
    const technologies = card.querySelector("[data-project-technologies]");

    title.textContent = project.name;
    category.textContent = project.category;
    category.setAttribute("aria-label", `Catégorie : ${project.category}`);

    technologies.replaceChildren(
      ...project.technologies.map((technology) => {
        const tag = document.createElement("span");
        tag.textContent = technology;
        return tag;
      }),
    );
  });
}

loadFeaturedProjects().catch((error) => {
  console.error(error);
});
