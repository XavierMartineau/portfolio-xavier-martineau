// =========================================================================
// 1. LISTE DES PROJETS
// Contient toutes les données, descriptions, technologies et médias de chaque projet.
// =========================================================================
const projects = {
  1: {
    name: "Animation & 3D",
    category: "3D",
    year: "2025",
    image: "projet_01_anim_3d.webp",
    youtubeUrl: "https://www.youtube.com/watch?v=Bkvwrvg_bws",
    description:
      "Un générique de fin sombre où chaque élément renforce la tension et la dernière note dramatique de l'histoire.",
    technologies: ["3D", "Animation", "MAYA", "Rendu"],
  },
  2: {
    name: "La Maison",
    category: "Site web",
    year: "2024",
    image: "projet_02_La_Maison.png",
    description:
      "Un site web narratif qui plonge l'utilisateur dans une maison mystérieuse, où l'exploration et les choix déterminent le chemin à suivre.",
    technologies: ["Web", "UX/UI", "Design", "Responsive"],
  },
  3: {
    name: "Stitch",
    category: "2D",
    year: "2025",
    image: "projet_03_stich.jpg",
    description:
      "Une illustration vectorielle de Stitch aux couleurs vives, construite avec des formes simples, des lignes nettes et une composition expressive.",
    technologies: ["Vectoriel", "Illustration", "Couleur", "Composition"],
  },
  4: {
    name: "Logo-bouclier",
    category: "2D",
    year: "2026",
    image: "Projet_04_bouclier.png",
    description:
      "Un logo en forme de bouclier conçu pour créer une identité visuelle forte, reconnaissable et adaptable sur des supports imprimés et numériques.",
    technologies: ["Identité", "Direction artistique", "Print", "Digital"],
  },
  5: {
    name: "Noël vectoriel",
    category: "2D",
    year: "2024",
    image: "Projet_05_noel.png",
    secondaryImage: "Projet_05_2_noel.png",
    description:
      "Une illustration vectorielle festive qui met en scène un sapin de Noël dans une composition colorée, structurée par des formes, des contrastes et une typographie chaleureuse.",
    technologies: [
      "Direction artistique",
      "Composition",
      "Typographie",
      "Image",
    ],
  },
  7: {
    name: "Atelier chromatique",
    category: "Site web",
    year: "2025-2026",
    image: "projet_07_atelier_chromatique.png",
    description:
      "Un site web expérimental consacré à l’exploration des couleurs, des formes et des compositions, pensé comme un atelier interactif où chaque écran devient une nouvelle expérience visuelle.",
    technologies: ["Web", "UX/UI", "Design", "Responsive"],
  },
};

// =========================================================================
// 2. RÉCUPÉRATION DE L’ID DU PROJET DANS L'URL
// =========================================================================
const requestedId = Number.parseInt(
  new URLSearchParams(window.location.search).get("project"),
  10,
);
const projectId = projects[requestedId] ? requestedId : 1;
const project = projects[projectId];

let activeEmbedSource = null;
let projectMuted = false;

// =========================================================================
// 3. FONCTION UTILITAIRE POUR INSERER LES TEXTES
// =========================================================================
const setText = (selector, value) => {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
};

const projectOrder = Object.keys(projects)
  .map(Number)
  .sort((a, b) => a - b);
const projectPosition = projectOrder.indexOf(projectId) + 1;

setText(
  "#project-index",
  `[${String(projectPosition).padStart(2, "0")}] / ${String(projectOrder.length).padStart(2, "0")}`,
);
setText("#project-category", project.category);
setText("#project-year", project.year);
setText("#project-year-panel", project.year);
setText("#project-title", project.name);
setText("#project-description", project.description);
setText("#project-summary", project.description);
setText("#project-category-panel", project.category);

// Compétences affichées selon la catégorie du projet consulté.
const categorySkills = {
  "3D": [
    ["Modélisation 3D", 75],
    ["Animation", 65],
    ["MAYA et rendu", 60],
  ],
  "2D": [
    ["Illustration", 85],
    ["Composition", 80],
    ["Couleur et image", 85],
  ],
  "Site web": [
    ["HTML, CSS et JavaScript", 95],
    ["Interface adaptative", 95],
    ["Conception visuelle", 85],
  ],
};

const categorySkillsContainer = document.querySelector(
  "#project-category-skills",
);
const selectedCategorySkills = categorySkills[project.category] || [];

if (categorySkillsContainer) {
  categorySkillsContainer.innerHTML = selectedCategorySkills
    .map(
      ([label, level]) => `
        <div class="project-skill" style="--skill-level: ${level}%">
          <div class="project-skill-header">
            <span>${label}</span>
            <strong>${level}%</strong>
          </div>
          <div class="project-skill-bar" aria-label="${label}: ${level}%">
            <span></span>
          </div>
        </div>`,
    )
    .join("");

  requestAnimationFrame(() => {
    categorySkillsContainer.classList.add("is-loaded");
  });
}

// =========================================================================
// 4. ATTRIBUTION DES COULEURS DE CATÉGORIE
// =========================================================================
const categoryElement = document.querySelector("#project-category");
const categoryThemes = {
  "3D": {
    className: "category-3d",
    color: "#00f3ff",
    rgb: "0, 243, 255",
  },
  "2D": {
    className: "category-2d",
    color: "#ff00ea",
    rgb: "255, 0, 234",
  },
  "Site web": {
    className: "category-site",
    color: "#6366f1",
    rgb: "99, 102, 241",
  },
};

const categoryTheme = categoryThemes[project.category] || categoryThemes["3D"];
document.body.classList.add(categoryTheme.className);
document.body.style.setProperty("--project-accent", categoryTheme.color);
document.body.style.setProperty("--project-rgb", categoryTheme.rgb);

if (categoryElement) {
  categoryElement.classList.add("couleur-categorie");

  switch (project.category) {
    case "3D":
      categoryElement.classList.add("couleur-categorie--3d");
      break;
    case "2D":
      categoryElement.classList.add("couleur-categorie--2d");
      break;
    case "Site web":
      categoryElement.classList.add("couleur-categorie--site");
      break;
  }
}

document.title = `${project.name} – Xavier Martineau`;

// =========================================================================
// 5. SÉLECTION DES ÉLÉMENTS VISUELS ET DU DOM
// =========================================================================
const visual = document.querySelector(".project-visual");
const projectImage = document.querySelector("#project-image");
let secondaryImage = document.querySelector("#project-secondary-image");
const interactive = document.querySelector("#project-interactive");
const youtubeLink = document.querySelector("#project-youtube");
const expandButton = document.querySelector("#project-expand");
const projectEmbed = document.querySelector("#project-embed");
const projectLoading = document.querySelector("#project-loading");
const projectMediaFallback = document.querySelector("#project-media-fallback");
const projectMediaFallbackMessage = document.querySelector(
  "#project-media-fallback-message",
);
let mediaFallbackTimer = null;

const showMediaFallback = () => {
  if (projectMediaFallback && project.youtubeUrl) {
    projectMediaFallback.hidden = false;
  }
};

const resetMediaFallbackTimer = () => {
  if (mediaFallbackTimer) {
    window.clearTimeout(mediaFallbackTimer);
  }

  if (projectId === 1 && project.youtubeUrl) {
    mediaFallbackTimer = window.setTimeout(showMediaFallback, 8000);
  }
};

if (projectMediaFallback && project.youtubeUrl) {
  const fallbackLink = projectMediaFallback.querySelector("#project-youtube");
  if (fallbackLink) {
    fallbackLink.href = project.youtubeUrl;
  }

  if (projectMediaFallbackMessage && projectId !== 1) {
    projectMediaFallbackMessage.textContent =
      "Oups, le contenu du projet n'a pas pu être chargé.";
  }
}

// Affiche un état lisible uniquement pendant le chargement d'un embed externe.
const setEmbedLoading = (isLoading) => {
  if (projectLoading) {
    projectLoading.hidden = !isLoading;
  }

  if (projectEmbed) {
    projectEmbed.setAttribute("aria-busy", String(isLoading));
  }
};

// Retire le loader dès que l'image principale est réellement disponible.
const markImageAsLoaded = () => {
  if (!activeEmbedSource) {
    setEmbedLoading(false);
  }
};

// Termine immédiatement l'état de chargement pour les projets qui utilisent une image.
const finishStaticMediaLoading = () => {
  if (!activeEmbedSource) {
    setEmbedLoading(false);
  }
};

if (projectEmbed) {
  projectEmbed.addEventListener("load", () => {
    setEmbedLoading(false);
    if (mediaFallbackTimer) {
      window.clearTimeout(mediaFallbackTimer);
      mediaFallbackTimer = null;
    }
  });
  projectEmbed.addEventListener("error", showMediaFallback);
}

// =========================================================================
// 6. GESTION DE L'AFFICHAGE DES IMAGES
// =========================================================================
if (project.secondaryImage) {
  let imagesContainer = visual.querySelector(".images-container");
  if (!imagesContainer) {
    imagesContainer = document.createElement("div");
    imagesContainer.className = "images-container";
    visual.prepend(imagesContainer);
  }

  if (projectImage) {
    projectImage.addEventListener("load", markImageAsLoaded, { once: true });
    projectImage.src = `../assets/images/${project.image}`;
    projectImage.alt = project.name;
    projectImage.hidden = false;
    imagesContainer.appendChild(projectImage);
  }

  if (!secondaryImage) {
    secondaryImage = document.createElement("img");
    secondaryImage.id = "project-secondary-image";
  }
  secondaryImage.src = `../assets/images/${project.secondaryImage}`;
  secondaryImage.alt = `${project.name}, vue secondaire`;
  secondaryImage.hidden = false;
  secondaryImage.classList.remove("is-secondary");
  imagesContainer.appendChild(secondaryImage);
} else {
  if (projectImage) {
    projectImage.addEventListener("load", markImageAsLoaded, { once: true });
    projectImage.src = `../assets/images/${project.image}`;
    projectImage.alt = project.name;
    projectImage.hidden = false;
  }
  if (secondaryImage) {
    secondaryImage.remove();
  }
}

// =========================================================================
// 7. LISTE DES PROJETS AVEC IFRAME EMBED
// =========================================================================
const embeddedProjects = {
  1: {
    src: "https://www.youtube.com/embed/Bkvwrvg_bws?si=VICC3QMpiGek1nlQ",
    title: "Vidéo Animation 3D",
  },
  2: {
    src: "https://xaviermartineau.github.io/La_Maison_xavier/",
    title: "La Maison interactive",
  },
  7: {
    src: "https://xaviermartineau.github.io/Atelier-chromatique-XM/",
    title: "Atelier chromatique",
  },
};

// =========================================================================
// 8. MODE INTERACTIF POUR LES SITES WEB
// =========================================================================
const renderInteractive = () => {
  if (!interactive) return;
  interactive.hidden = false;
  if (projectImage) projectImage.hidden = true;

  interactive.innerHTML = `
    <div class="interactive-browser">
      <div class="browser-bar"><i></i><i></i><i></i><span>portfolio / ${project.name}</span></div>
      <div class="browser-content">
        <span class="interactive-kicker">// INTERACTIVE WEB EXPERIENCE</span>
        <strong>${project.name}</strong>
        <p>${project.description}</p>
        <div class="browser-controls">
          <button class="interactive-tab active" type="button">Accueil</button>
          <button class="interactive-tab" type="button">Projet</button>
          <button class="interactive-tab" type="button">Contact</button>
        </div>
        <div class="browser-message">Clique sur un onglet pour explorer.</div>
      </div>
    </div>`;

  const message = interactive.querySelector(".browser-message");
  interactive.querySelectorAll(".interactive-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      interactive.querySelectorAll(".interactive-tab").forEach((item) => {
        item.classList.remove("active");
      });
      tab.classList.add("active");
      if (message) {
        message.textContent = `${tab.textContent} : contenu interactif chargé.`;
      }
    });
  });
};

// =========================================================================
// 9. LOGIQUE PRINCIPALE D’AFFICHAGE DE LA PAGE
// =========================================================================
const isMobileScreen = window.matchMedia("(max-width: 768px)").matches;

if (embeddedProjects[projectId] && projectEmbed) {
  const embeddedProject = embeddedProjects[projectId];
  activeEmbedSource = embeddedProject.src;

  setEmbedLoading(true);
  resetMediaFallbackTimer();
  projectEmbed.hidden = false;
  projectEmbed.src = embeddedProject.src;
  projectEmbed.title = embeddedProject.title;
  projectEmbed.classList.add("project-embed-active");
  if (projectImage) projectImage.hidden = true;

  if (visual) {
    if (project.category === "Site web") {
      visual.classList.add("project-visual-interactive");
    } else {
      visual.classList.add("project-visual-media");
    }
  }
} else if (project.category === "Site web") {
  if (visual) visual.classList.add("project-visual-interactive");
  renderInteractive();
} else if (project.category === "3D") {
  if (visual) visual.classList.add("project-visual-media");
  if (youtubeLink) {
    youtubeLink.hidden = false;
    youtubeLink.href = project.youtubeUrl;
  }
} else {
  if (visual) {
    visual.classList.add(
      "stitch-mode",
      "project-visual-media",
      "project-visual-2d",
    );
  }
  if (projectImage) {
    projectImage.src = `../assets/images/${project.image}`;
    projectImage.alt = project.name;
    projectImage.classList.add("project-image-full");
    if (projectImage.complete) {
      finishStaticMediaLoading();
    }
  }
}

// Révèle les panneaux au fur et à mesure qu'ils approchent de la fenêtre.
const detailPanels = document.querySelectorAll(
  ".project-content-grid > *, .project-navigation-footer",
);

if ("IntersectionObserver" in window) {
  const detailObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-content-ready", entry.isIntersecting);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
  );

  detailPanels.forEach((panel) => detailObserver.observe(panel));
} else {
  detailPanels.forEach((panel) => panel.classList.add("is-content-ready"));
}

// =========================================================================
// 10. GESTION DES RESSOURCES DES IFRAMES (STOP / REPRENDRE)
// =========================================================================
const stopEmbeddedProject = () => {
  if (!activeEmbedSource || !projectEmbed) {
    return;
  }
  projectEmbed.src = "about:blank";
  setEmbedLoading(false);
};

const resumeEmbeddedProject = () => {
  if (projectMuted || !projectEmbed) {
    return;
  }

  if (activeEmbedSource && projectEmbed.getAttribute("src") === "about:blank") {
    setEmbedLoading(true);
    projectEmbed.src = activeEmbedSource;
    projectEmbed.hidden = false;
    if (projectImage) projectImage.hidden = true;
  }
};

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopEmbeddedProject();
  } else {
    resumeEmbeddedProject();
  }
});

window.addEventListener("pagehide", stopEmbeddedProject);

// =========================================================================
// 11. BOUTON AGRANDIR
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const expandBtn = document.querySelector("#project-expand");
  const vis = document.querySelector(".project-visual");

  if (expandBtn && vis) {
    expandBtn.addEventListener("click", () => {
      const isExpanded = vis.classList.toggle("is-expanded");
      expandBtn.setAttribute("aria-pressed", String(isExpanded));
      expandBtn.textContent = isExpanded ? "× Fermer" : "⛶ Agrandir";
      document.body.classList.toggle("project-view-expanded", isExpanded);
    });
  }
});

// =========================================================================
// 12. GÉNÉRATION DES TAGS DE TECHNOLOGIES
// =========================================================================
const technologyCategoryClasses = {
  "3D": "couleur-categorie--3d",
  "2D": "couleur-categorie--2d",
  "Site web": "couleur-categorie--site",
};

const renderTechnologyTags = (selector) => {
  const technologies = document.querySelector(selector);
  if (!technologies || !project.technologies) return;

  technologies.replaceChildren();
  const categoryClass = technologyCategoryClasses[project.category] || "";

  project.technologies.forEach((technology) => {
    const tag = document.createElement("span");
    tag.className = `tag couleur-categorie ${categoryClass}`.trim();
    tag.textContent = technology;
    technologies.append(tag);
  });
};

renderTechnologyTags("#project-technologies");
renderTechnologyTags("#project-full-stack");

// =========================================================================
// 13. LIEN DE RETOUR À LA LISTE DES PROJETS
// =========================================================================
const returnProjectBtn = document.querySelector("#return-project");
if (returnProjectBtn) {
  returnProjectBtn.href = "projets.html";
}

// =========================================================================
// 14. NAVIGATION DYNAMIQUE (PRÉCÉDENT / SUIVANT)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const indexEl = document.getElementById("project-index");
  const nextLinkEl = document.getElementById("next-project-link");
  const prevLinkEl = document.getElementById("prev-project-link");

  if (indexEl) {
    const activeProjectIds = Object.keys(projects)
      .map(Number)
      .sort((a, b) => a - b);
    const currentIndex = activeProjectIds.indexOf(projectId);

    if (currentIndex !== -1) {
      const nextNum = activeProjectIds[currentIndex + 1];
      const prevNum = activeProjectIds[currentIndex - 1];

      if (nextLinkEl) {
        if (nextNum) {
          nextLinkEl.href = `page_de_projets.html?project=${nextNum}`;
          nextLinkEl.classList.remove("is-hidden");
        } else {
          nextLinkEl.classList.add("is-hidden");
        }
      }

      if (prevLinkEl) {
        if (prevNum) {
          prevLinkEl.href = `page_de_projets.html?project=${prevNum}`;
          prevLinkEl.classList.remove("is-hidden");
        } else {
          prevLinkEl.classList.add("is-hidden");
        }
      }
    }
  }
});

window.translatePortfolio?.();
