// Role : construit les cartes du catalogue et des projets en vedette depuis les donnees JSON.
// Parcours : normalise les categories, fabrique chaque variante de carte, puis met a jour les grilles.
import { projectsReady } from "./projects-data.js";

// SECTION 1 : conversion des categories en classes CSS et libelles reutilisables.
// Convertit une categorie en valeur stable utilisee par les filtres CSS et JavaScript.
const categoryToSlug = (category) =>
  category === "Site web" ? "site-web" : category.toLowerCase();

// Associe une couleur de presentation a chaque identifiant de projet.
const categoryToColor = (projectId) =>
  ({ 1: "indigo", 2: "rose", 3: "cyan", 4: "rose", 5: "indigo", 6: "indigo" })[
    projectId
  ] || "indigo";

// Renvoie la classe du badge partagee par les etiquettes de categorie.
const categoryToBadgeClass = (category) =>
  category === "3D" ? "3d" : category === "Site web" ? "site" : "2d";

// Genere les badges de technologie pour la carte de detail du catalogue.
const technologiesMarkup = (project, className) =>
  project.technologies
    .map((technology) => `<span class="${className}">${technology}</span>`)
    .join("");

// SECTION 2 : fabrique les deux variantes de carte utilisees dans le portfolio.
// Construit un lien compact utilise dans le carousel de la page d'accueil.
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

// Construit une carte complete, avec les attributs requis par les filtres.
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

// Remplace les cartes de secours uniquement dans les grilles presentes sur la page.
const renderProjectCards = (projects) => {
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
