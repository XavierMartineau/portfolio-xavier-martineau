// Génère les cartes d'informations personnelles de la page À propos.
const ABOUT_INFO = [
  { label: "Localisation", value: "Montréal, QC", icon: "📍" },
  { label: "Disponibilité", value: "Projets multimédias", icon: "⚡" },
  { label: "Expérience", value: "4 ans", icon: "✦" },
  { label: "Langues", value: "Français / Anglais", icon: "◎" },
];

const infoContainer = document.querySelector("#info-container");

if (infoContainer) {
  ABOUT_INFO.forEach((item) => {
    const card = document.createElement("article");
    card.className = "about-info-card";
    card.innerHTML = `
      <div class="about-info-icon" aria-hidden="true">${item.icon}</div>
      <div class="about-info-label">${item.label}</div>
      <div class="about-info-value">${item.value}</div>
    `;
    infoContainer.appendChild(card);
  });
}

// Construit le parcours à partir d'une seule source de données.
const ABOUT_TIMELINE = [
  {
    year: "2026",
    role: "Projets multimédias",
    company: "Portfolio personnel",
    description: "Création de projets web, 2D, 3D et interactifs.",
  },
  {
    year: "2025",
    role: "Création de projets numériques",
    company: "Développement et design",
    description:
      "Mise en pratique du responsive, du JavaScript et de la conception visuelle.",
  },
  {
    year: "2024",
    role: "Développement et création",
    company: "Apprentissage multimédia",
    description:
      "Exploration du web, de l'illustration, de la 3D et des outils de création.",
  },
  {
    year: "2022",
    role: "Début du parcours multimédia",
    company: "Projets personnels",
    description:
      "Premières réalisations et découverte des métiers de la création numérique.",
  },
];

const timelineContainer = document.querySelector("#timeline-container");

if (timelineContainer) {
  ABOUT_TIMELINE.forEach((item) => {
    const timelineItem = document.createElement("article");
    timelineItem.className = "about-timeline-item";
    timelineItem.innerHTML = `
      <div class="about-timeline-year">${item.year}</div>
      <div class="about-timeline-dot" aria-hidden="true"></div>
      <div class="about-timeline-card">
        <div class="about-timeline-role">${item.role}</div>
        <span class="about-timeline-company">@ ${item.company}</span>
        <p class="about-timeline-description">${item.description}</p>
      </div>
    `;
    timelineContainer.appendChild(timelineItem);
  });
}
