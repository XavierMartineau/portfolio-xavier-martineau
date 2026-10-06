// Role : rendu commun des cartes a partir des projets charges depuis le JSON.
import { projectsReady } from "./projects-data.js";

// SECTION 1 : conversion des categories en classes CSS et libelles reutilisables.
const categoryToSlug = (category) =>
  category === "Site web" ? "site-web" : category.toLowerCase();

const categoryToColor = (projectId) =>
  ({ 1: "indigo", 2: "rose", 3: "cyan", 4: "rose", 5: "indigo", 6: "indigo" })[
    projectId
  ] || "indigo";

const categoryToBadgeClass = (category) =>
  category === "3D" ? "3d" : category === "Site web" ? "site" : "2d";

const technologiesMarkup = (project, className) =>
  project.technologies
    .map((technology) => `<span class="${className}">${technology}</span>`)
    .join("");

// SECTION 2 : fabrique les deux variantes de carte utilisees dans le portfolio.
const createFeaturedCard = (projectId, project) => {
  const card = document.createElement("a");
  const color = categoryToColor(projectId);
  const extraClass = projectId === 3 ? " project-stitch" : "";

  card.href = `page_de_projets.html?project=${projectId}`;
  card.className = `featured-card ${color} has-featured-image${extraClass}`;
  card.dataset.projectId = projectId;
  card.innerHTML = `
    <div class="featured-top"></div>
    <img class="featured-background" src="../assets/images/${project.image}" alt="Aperçu du projet ${project.name}" aria-hidden="true" />
    <div class="featured-meta">
      <span class="featured-category">${project.category}</span>
      <span class="featured-year">${project.year}</span>
    </div>
    <h3 class="featured-title">${project.name}</h3>
    <p class="featured-desc">${project.description}</p>
    <div class="featured-technologies" aria-label="Technologies utilisées">
      ${project.technologies.map((technology) => `<span>${technology}</span>`).join("")}
    </div>`;

  return card;
};

const createProjectCard = (projectId, project) => {
  const card = document.createElement("article");
  const badgeClass = categoryToBadgeClass(project.category);

  card.className = `gc gc-${categoryToColor(projectId)} project-card`;
  card.dataset.projectId = projectId;
  card.dataset.category = categoryToSlug(project.category);
  card.innerHTML = `
    <div class="gc-top"></div>
    <img class="project-background" loading="lazy" src="../assets/images/${project.image}" alt="Aperçu du projet ${project.name}" aria-hidden="true" />
    ${project.secondaryImage ? `<img class="project-background project-background-secondary" loading="lazy" src="../assets/images/${project.secondaryImage}" alt="Vue secondaire du projet ${project.name}" aria-hidden="true" />` : ""}
    <div class="gc-meta">
      <span class="gc-project-category">${project.category}</span>
      <span class="gc-year">${project.year}</span>
    </div>
    <h3 class="gc-title">${project.name}</h3>
    <div class="gc-technologies" aria-label="Technologies utilisées">
      ${technologiesMarkup(project, `couleur-categorie couleur-categorie--${badgeClass}`)}
    </div>
    <p class="gc-desc">${project.description}</p>
    <div class="gc-footer"><span class="gc-btn">Voir le projet →</span></div>`;

  return card;
};

const renderProjectCards = (projects) => {
  // Remplace le contenu de secours uniquement dans les grilles presentes sur la page.
  const featuredGrid = document.querySelector(".featured-grid");
  const projectsGrid = document.querySelector("#projects-container");
  const entries = Object.entries(projects);

  featuredGrid?.replaceChildren(
    ...entries
      .filter(([projectId]) => ["1", "2", "3"].includes(projectId))
      .map(([projectId, project]) => createFeaturedCard(projectId, project)),
  );
  projectsGrid?.replaceChildren(
    ...entries.map(([projectId, project]) =>
      createProjectCard(projectId, project),
    ),
  );
};

const projects = await projectsReady;
renderProjectCards(projects);

// Met a jour les cartes nouvellement injectees si la page est deja en anglais.
window.translatePortfolio?.();
