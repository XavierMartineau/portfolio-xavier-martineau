// =========================================================================
// 1. LISTE DES PROJETS
// Contient toutes les données, descriptions, technologies et médias de chaque projet.
// =========================================================================
const projects = {
  1: {
    name: "Animation & 3D",
    category: "3D",
    year: "2025",
    image: "projet_01.webp",
    youtubeUrl: "https://www.youtube.com/watch?v=Bkvwrvg_bws",
    description:
      "Un générique de fin sombre où chaque élément renforce la tension et la dernière note dramatique de l'histoire.",
    technologies: ["3D", "Animation", "MAYA", "Rendu"],
  },
  2: {
    name: "La Maison",
    category: "Site web",
    year: "2024",
    image: "Projet_02.png",
    description:
      "Une maison mystérieuse à explorer, où chaque chemin mène à un choix qui change la suite de l'histoire.",
    technologies: ["Web", "UX/UI", "Design", "Responsive"],
  },
  3: {
    name: "Stitch",
    category: "2D",
    year: "2025",
    image: "Projet_03.jpg",
    description:
      "Une direction artistique colorée construite autour de formes vectorielles, de textures et d'une énergie pop assumée.",
    technologies: ["Vectoriel", "Illustration", "Couleur", "Composition"],
  },
  4: {
    name: "Logo-bouclier",
    category: "2D",
    year: "2026",
    image: "Projet_04.png",
    description:
      "Une identité graphique précise qui rassemble rythme, contraste et supports numériques dans un univers cohérent.",
    technologies: ["Identité", "Direction artistique", "Print", "Digital"],
  },
  5: {
    name: "Noël vectoriel",
    category: "2D",
    year: "2024",
    image: "Projet_05.png",
    secondaryImage: "Projet_05_2.png",
    description:
      "Une composition pensée pour raconter une histoire forte avec une image, une typographie et des détails soigneusement hiérarchisés.",
    technologies: [
      "Direction artistique",
      "Composition",
      "Typographie",
      "Image",
    ],
  },
  6: {
    name: "Jeu vidéo",
    category: "Jeu vidéo",
    year: "2025",
    image: "Projet_06.png",
    description:
      "Une expérience interactive fluide qui met l'utilisateur au cœur du parcours et donne du relief à chaque interaction.",
    technologies: ["Interface", "Interaction", "Web", "Expérience"],
  },
  7: {
    name: "Palette de couleurs",
    category: "Site web",
    year: "2025-2026",
    image: "Projet_07.png",
    description:
      "Un projet digital immersif où la lumière, le mouvement et la composition créent une expérience mémorable.",
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

setText("#project-index", `[${String(projectId).padStart(2, "0")}] / 07`);
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
    ["Animation", 70],
    ["MAYA et rendu", 65],
  ],
  "2D": [
    ["Illustration", 85],
    ["Composition", 80],
    ["Couleur et image", 85],
  ],
  "Site web": [
    ["HTML, CSS et JavaScript", 90],
    ["Interface adaptative", 85],
    ["Conception visuelle", 80],
  ],
  "Jeu vidéo": [
    ["Interface", 75],
    ["Interaction", 70],
    ["Expérience utilisateur", 65],
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
  "Jeu vidéo": {
    className: "category-game",
    color: "#63ff9b",
    rgb: "99, 255, 155",
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
    case "Jeu vidéo":
      categoryElement.classList.add("couleur-categorie--jeu");
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
  6: {
    src: "https://xaviermartineau.github.io/martineau_xavier_Tp4/",
    title: "Jeu vidéo interactif",
  },
  7: {
    src: "https://mycolorpalet.netlify.app/",
    title: "Palette de couleurs interactive",
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

if (projectId === 6 && isMobileScreen) {
  if (visual) {
    visual.classList.add("project-visual-interactive", "is-game-project");
  }
  if (interactive) {
    interactive.hidden = false;
    if (projectImage) projectImage.hidden = true;
    interactive.innerHTML = `
      <div class="interactive-game mobile-warning-view" style="padding: 1.5rem; text-align: center; overflow-y: auto; max-height: 100%;">
        <span class="interactive-kicker">// NOTICE MOBILE</span>
        <strong style="font-size: 1.2rem; margin-bottom: 1rem; display: block;">CECI EST EN CONSTRUCTION</strong>
      </div>`;
  }
} else if (projectId === 6 && !isMobileScreen) {
  if (visual) {
    visual.classList.add("project-visual-interactive", "is-game-project");
  }
  if (interactive) {
    interactive.hidden = false;
    if (projectImage) projectImage.hidden = true;

    interactive.innerHTML = `
      <div class="interactive-game" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 2rem;">
        <span class="interactive-kicker" style="margin-bottom: 1rem;">// JOUER AU JEU VIDÉO</span>
        <strong style="font-size: 1.3rem; margin-bottom: 0.5rem; color: #ffffff;">${project.name}</strong>
        <p style="color: #b7b7c9; margin-bottom: 1.5rem; max-width: 400px;">Clique sur le bouton ci-dessous pour charger et lancer le jeu interactif directement dans le navigateur.</p>
        <p class="game-warning" role="alert">Bug majeur présent : après la mort, il n'est pas possible de revenir dans le jeu.</p>
        <button id="load-game-btn" class="interactive-action" type="button" style="padding: 12px 28px; font-size: 0.9rem; cursor: pointer;">Lancer la partie</button>
      </div>`;

    const loadBtn = interactive.querySelector("#load-game-btn");
    if (loadBtn && projectEmbed && embeddedProjects[6]) {
      loadBtn.addEventListener("click", () => {
        activeEmbedSource = embeddedProjects[6].src;
        interactive.hidden = true;

        setEmbedLoading(true);
        projectEmbed.hidden = false;
        projectEmbed.src = embeddedProjects[6].src;
        projectEmbed.title = embeddedProjects[6].title;
        projectEmbed.classList.add("project-embed-active");
      });
    }
  }
} else if (embeddedProjects[projectId] && projectEmbed) {
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
  "Jeu vidéo": "couleur-categorie--jeu",
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
    const match = indexEl.textContent.match(/\d+/);
    if (match) {
      let currentNum = parseInt(match[0], 10);
      const totalProjects = 7;

      if (nextLinkEl) {
        if (currentNum < totalProjects) {
          let nextNum = currentNum + 1;
          nextLinkEl.href = `page_de_projets.html?project=${nextNum}`;
          nextLinkEl.classList.remove("is-hidden");
        } else {
          nextLinkEl.classList.add("is-hidden");
        }
      }

      if (prevLinkEl) {
        if (currentNum > 1) {
          let prevNum = currentNum - 1;
          prevLinkEl.href = `page_de_projets.html?project=${prevNum}`;
          prevLinkEl.classList.remove("is-hidden");
        } else {
          prevLinkEl.classList.add("is-hidden");
        }
      }
    }
  }
});

// =========================================================================
// 15. PAUSE AUTOMATIQUE AU SCROLL (OOPS! CONTACT PERDU) - UNIQUEMENT PROJET [06]
// Coupe l'iframe et affiche l'écran de pause si l'utilisateur s'éloigne du projet 06.
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Cible uniquement le conteneur visuel du projet [06] (ajustez le sélecteur si besoin, ex: #projet-06 .project-visual)
  const visualContainer = document.querySelector(
    "#projet-06 .project-visual, .project-visual.is-game-project",
  );
  if (!visualContainer) return;

  // Création dynamique de l'overlay d'avertissement "OOPS!"
  const oopsOverlay = document.createElement("div");
  oopsOverlay.id = "oops-overlay";
  oopsOverlay.className = "game-contact-lost";
  oopsOverlay.innerHTML = `
    <span class="game-contact-kicker">// CONNEXION INTERROMPUE</span>
    <strong>Le contact avec le jeu a été perdu</strong>
    <p>Le jeu a été mis en pause pour réduire le chargement.</p>
    <button id="resume-btn" class="interactive-action" type="button">Reprendre</button>
  `;
  visualContainer.appendChild(oopsOverlay);

  let manualPause = false;

  // Observer de visibilité de l'écran lors du scroll pour le projet [06]
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Si le projet [06] sort de l'écran et qu'une source active tourne
        if (
          !entry.isIntersecting &&
          activeEmbedSource &&
          projectEmbed &&
          projectEmbed.getAttribute("src") !== "about:blank" &&
          !manualPause
        ) {
          projectEmbed.src = "about:blank"; // Stoppe net le jeu et le son du projet 06
          oopsOverlay.classList.add("is-visible"); // Affiche l'écran de perte de contact
        }
      });
    },
    { threshold: 0.2 },
  );

  scrollObserver.observe(visualContainer);

  // Gestion du clic sur le bouton "Reprendre"
  const resumeBtn = oopsOverlay.querySelector("#resume-btn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", () => {
      oopsOverlay.classList.remove("is-visible");
      manualPause = true;

      if (projectEmbed && activeEmbedSource) {
        setEmbedLoading(true);
        projectEmbed.src = activeEmbedSource; // Relance le jeu et le son
      }

      // Ramène doucement le projet [06] en vue
      visualContainer.scrollIntoView({ behavior: "smooth", block: "center" });

      // Réinitialise le verrou après un court moment
      setTimeout(() => {
        manualPause = false;
      }, 1500);
    });
  }
});
