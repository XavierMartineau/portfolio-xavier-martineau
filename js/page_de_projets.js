// Role : selectionne un projet et configure son contenu, ses medias et ses controles.
// Les donnees sont centralisees dans projects-data.js pour eviter les copies entre pages.
// Parcours : lit l'identifiant d'URL, prepare le theme et les contenus, puis active medias et navigation.
import { projectsReady } from "./projects-data.js";

const projects = await projectsReady;

// SECTION 1 : determine le projet courant et prepare les reperes d'affichage.
// =========================================================================
// 2. RÉCUPÉRATION DE L’ID DU PROJET DANS L'URL
// =========================================================================
const requestedId = Number.parseInt(
  new URLSearchParams(window.location.search).get("project"),
  10,
);
const projectId = projects[requestedId] ? requestedId : 1;
const project = projects[projectId];

// Garde l'URL active pour suspendre et restaurer le media integre si necessaire.
let activeEmbedSource = null;
let projectMuted = false;

// Insere un texte uniquement si l'element correspondant existe sur cette page.
const setText = (selector, value) => {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
};

const projectOrder = Object.keys(projects)
  .map(Number)
  .sort((a, b) => a - b);
// Affiche la position du projet selon la liste reelle, meme si ses identifiants changent.
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

const projectChallenges = {
  1: "Le principal défi était de créer une animation 3D fluide en maîtrisant la modélisation, l'éclairage et le rendu de chaque plan.",
  2: "Le principal défi était de concevoir une navigation interactive où chaque choix modifie le parcours tout en restant claire et intuitive.",
  3: "Le principal défi était de créer les dégradés vectoriels dans les yeux de Stitch, tout en conservant un rendu naturel et expressif.",
  4: "Le principal défi était de composer les multiples formes courbes du bouclier et de maîtriser les multiples dégradés pour créer un rendu harmonieux et reconnaissable.",
  5: "Le principal défi était d'équilibrer les formes, les couleurs et la typographie pour créer une composition festive et lisible.",
  6: "Le principal défi était de créer une interface interactive où les couleurs et les formes restent lisibles et harmonieuses sur chaque écran.",
};
// Associe chaque projet a son defi; le texte generique couvre les ajouts futurs.
setText(
  "#project-challenge",
  projectChallenges[projectId] ||
    "Le principal défi était d'assurer une fluidité optimale et une cohérence visuelle parfaite pour chaque interaction utilisateur.",
);

const externalProjectLinks = {
  2: "https://xaviermartineau.github.io/La_Maison_xavier/",
  6: "https://xaviermartineau.github.io/Atelier-chromatique-XM/",
};
// Memorise les controles du lien sortant pour gerer la confirmation et son accessibilite.
const externalProjectLink = document.querySelector("#external-project-link");
const externalProjectModal = document.querySelector("#external-project-modal");
const externalProjectCancel = document.querySelector(
  "#external-project-cancel",
);
const externalProjectContinue = document.querySelector(
  "#external-project-continue",
);

if (project.category !== "Site web") {
  // Les projets non web n'ont pas de site externe a ouvrir.
  externalProjectLink?.remove();
  externalProjectModal?.remove();
}

if (externalProjectLink && externalProjectLinks[projectId]) {
  // Configure la destination et n'ouvre le site qu'apres confirmation explicite.
  externalProjectLink.href = externalProjectLinks[projectId];
  externalProjectLink.hidden = false;
  externalProjectLink.addEventListener("click", (event) => {
    event.preventDefault();
    externalProjectModal?.removeAttribute("hidden");
    externalProjectContinue?.focus();
  });

  externalProjectCancel?.addEventListener("click", () => {
    externalProjectModal?.setAttribute("hidden", "");
    externalProjectLink.focus();
  });

  externalProjectContinue?.addEventListener("click", () => {
    externalProjectModal?.setAttribute("hidden", "");
    window.open(externalProjectLink.href, "_blank", "noopener,noreferrer");
  });

  externalProjectModal?.addEventListener("click", (event) => {
    // Un clic sur le voile ferme le dialogue; un clic dans son contenu le conserve.
    if (event.target === externalProjectModal) {
      externalProjectCancel?.click();
    }
  });

  document.addEventListener("keydown", (event) => {
    // Echap annule la confirmation comme le bouton Annuler.
    if (event.key === "Escape" && externalProjectModal?.hidden === false) {
      externalProjectCancel?.click();
    }
  });
}

const projectResults = {
  1: "Un générique de fin sombre et cohérent, où le mouvement, la lumière et le rythme renforcent la tension.",
  2: "Une expérience web narrative qui transforme l'exploration en une suite de choix engageants.",
  3: "Une illustration vectorielle expressive de Stitch, finalisée avec des couleurs vives et des dégradés précis dans les yeux.",
  4: "Une identité visuelle forte, reconnaissable et suffisamment flexible pour accompagner différents supports.",
  5: "Une illustration vectorielle festive où le sapin, le renne, les couleurs et la typographie forment un ensemble chaleureux.",
  6: "Un site web expérimental qui transforme l'exploration des couleurs en une expérience visuelle interactive.",
};
setText(
  "#project-result",
  projectResults[projectId] ||
    "Un projet abouti, performant et prêt pour l'intégration en production au sein du portfolio.",
);

// Precise si le projet est personnel ou scolaire et distingue les deux versions de La Maison.
const realizationDetails =
  projectId === 1
    ? {
        status: "Projet scolaire — réalisé en équipe.",
      }
    : projectId === 2
      ? {
          status: "Projet scolaire réalisé en équipe avec Marc et Antoine.",
          year2024:
            "En 2024, mon rôle était de créer la structure du site, d’assurer la fluidité de la navigation et de concevoir les pages.",
          year2026:
            "En 2026, j’ai réalisé une refonte personnelle complète du projet, entièrement par moi-même.",
        }
      : {
          status: "Projet personnel — réalisé seul.",
        };

// Rend visibles uniquement les precisions d'annee fournies pour La Maison.
setText("#project-realization-status", realizationDetails.status);
if (realizationDetails.year2024) {
  setText("#project-realization-2024", realizationDetails.year2024);
  document.querySelector("#project-realization-2024").hidden = false;
}
if (realizationDetails.year2026) {
  setText("#project-realization-2026", realizationDetails.year2026);
  document.querySelector("#project-realization-2026").hidden = false;
}

// SECTION 2 : affiche les competences pertinentes pour la categorie selectionnee.
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
  // Cree les jauges depuis les competences associees a la categorie du projet.
  categorySkillsContainer.innerHTML = selectedCategorySkills
    .map(
      ([label, level]) => `
        <div class="project-skill skill-level-${level}">
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
// Applique la couleur de categorie aux composants qui utilisent les variables CSS.
document.body.classList.add(categoryTheme.className);
document.body.style.setProperty("--project-accent", categoryTheme.color);
document.body.style.setProperty("--project-rgb", categoryTheme.rgb);

if (categoryElement) {
  // Ajoute une classe specifique pour styliser le badge de categorie courant.
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
// References aux medias et messages de chargement manipules plus bas.
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
const projectFallbackMark = document.querySelector("#project-fallback-mark");
const projectFallbackLink = document.querySelector("#project-youtube");
let mediaFallbackTimer = null;

// Affiche le lien de secours adapte au media externe du projet.
const showMediaFallback = () => {
  const fallbackUrl =
    project.youtubeUrl || "https://xaviermartineau.github.io/portfolio-xavier-martineau/";
  if (
    !projectMediaFallback ||
    !projectMediaFallbackMessage ||
    !projectFallbackLink ||
    !fallbackUrl
  ) {
    // Ne presente pas de bouton si le media ou sa destination de secours manque.
    return;
  }

  // Utilise YouTube pour la video et le portfolio GitHub pour les demos web.
  const isVideo = Boolean(project.youtubeUrl);
  const message = isVideo
    ? "Cette vidéo est disponible sur YouTube."
    : "Ce projet ne s’affiche pas correctement.";
  const linkLabel = isVideo
    ? "Regarder la vidéo sur YouTube"
    : "Voir le projet officiel";

  projectMediaFallbackMessage.dataset.i18n = message;
  projectMediaFallbackMessage.textContent = message;
  projectFallbackLink.dataset.i18n = linkLabel;
  projectFallbackLink.textContent = `${linkLabel} ↗`;
  projectFallbackLink.href = fallbackUrl;
  projectFallbackMark.textContent = isVideo ? "▶" : "↗";
  projectMediaFallback.classList.toggle(
    "project-media-fallback--project",
    !isVideo,
  );
  projectMediaFallback.classList.add("project-media-fallback--card");
  projectMediaFallback.hidden = false;
  window.translatePortfolio?.();
};

// Affiche une solution de rechange si un embed reste bloque au chargement.
const resetMediaFallbackTimer = () => {
  // Annule le compte a rebours precedent pour eviter un affichage concurrent.
  if (mediaFallbackTimer) {
    window.clearTimeout(mediaFallbackTimer);
  }

  if (project.youtubeUrl || externalProjectLinks[projectId]) {
    mediaFallbackTimer = window.setTimeout(showMediaFallback, 10000);
  }
};

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

// Termine le chargement visuel lorsque le projet utilise une image locale.
const finishStaticMediaLoading = () => {
  if (!activeEmbedSource) {
    setEmbedLoading(false);
  }
};

if (projectEmbed) {
  projectEmbed.addEventListener("load", () => {
    // Cache le chargement et annule le secours des qu'un embed termine sa navigation.
    setEmbedLoading(false);
    if (mediaFallbackTimer) {
      window.clearTimeout(mediaFallbackTimer);
      mediaFallbackTimer = null;
    }
  });
  // Affiche le lien de secours si le navigateur signale une erreur de chargement.
  projectEmbed.addEventListener("error", showMediaFallback);
}

// SECTION 6 : injecte une image secondaire seulement pour les projets qui en ont une.
if (project.secondaryImage) {
  // Regroupe les deux vues dans un conteneur afin de les presenter ensemble.
  let imagesContainer = visual.querySelector(".images-container");
  if (!imagesContainer) {
    imagesContainer = document.createElement("div");
    imagesContainer.className = "images-container";
    visual.prepend(imagesContainer);
  }

  if (projectImage) {
    // Prepare et deplace l'image principale avant d'ajouter sa vue secondaire.
    projectImage.addEventListener("load", markImageAsLoaded, { once: true });
    projectImage.src = `../assets/images/${project.image}`;
    projectImage.alt = `${project.name} - ${project.description}`;
    projectImage.hidden = false;
    imagesContainer.appendChild(projectImage);
  }

  if (!secondaryImage) {
    // Cree l'emplacement secondaire si le HTML initial ne l'a pas fourni.
    secondaryImage = document.createElement("img");
    secondaryImage.id = "project-secondary-image";
  }
  secondaryImage.src = `../assets/images/${project.secondaryImage}`;
  secondaryImage.alt = `${project.name}, vue secondaire`;
  secondaryImage.hidden = false;
  secondaryImage.classList.remove("is-secondary");
  imagesContainer.appendChild(secondaryImage);
} else {
  // Les projets a une seule image gardent le rendu simple et retirent l'emplacement inutile.
  if (projectImage) {
    projectImage.addEventListener("load", markImageAsLoaded, { once: true });
    projectImage.src = `../assets/images/${project.image}`;
    projectImage.alt = `${project.name} - ${project.description}`;
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
// Choisit le mode de presentation selon les medias disponibles et le type de projet.
const isMobileScreen = window.matchMedia("(max-width: 768px)").matches;

if (embeddedProjects[projectId] && projectEmbed) {
  // Charge le site ou la video integree, avec un lien alternatif si le chargement echoue.
  const embeddedProject = embeddedProjects[projectId];
  activeEmbedSource = embeddedProject.src;

  setEmbedLoading(true);
  if (projectId === 1 && window.location.protocol === "file:") {
    // Sur file://, YouTube ne recoit pas de referer valide; proposer tout de suite le lien direct.
    showMediaFallback();
  } else {
    resetMediaFallbackTimer();
  }
  projectEmbed.hidden = false;
  projectEmbed.src = embeddedProject.src;
  projectEmbed.title = embeddedProject.title;
  projectEmbed.classList.add("project-embed-active");
  if (projectImage) projectImage.hidden = true;

  if (visual) {
    // Le media adapte la hauteur du cadre selon qu'il s'agit d'un site ou d'une video.
    if (project.category === "Site web") {
      visual.classList.add("project-visual-interactive");
    } else {
      visual.classList.add("project-visual-media");
    }
  }
} else if (project.category === "Site web") {
  // Affiche la maquette interactive locale pour les sites sans embed dedie.
  if (visual) visual.classList.add("project-visual-interactive");
  renderInteractive();
} else if (project.category === "3D") {
  // Laisse le lien video disponible si aucun lecteur integre n'est configure.
  if (visual) visual.classList.add("project-visual-media");
  if (youtubeLink) {
    youtubeLink.hidden = false;
    youtubeLink.href = project.youtubeUrl;
  }
} else {
  // Les projets visuels simples utilisent leur image locale en plein cadre.
  if (visual) {
    visual.classList.add(
      "stitch-mode",
      "project-visual-media",
      "project-visual-2d",
    );
  }
  if (projectImage) {
    projectImage.src = `../assets/images/${project.image}`;
    projectImage.alt = `${project.name} - ${project.description}`;
    projectImage.classList.add("project-image-full");
    if (projectImage.complete) {
      finishStaticMediaLoading();
    }
  }
}

// Revele les panneaux a l'approche de l'ecran, avec affichage immediat en repli.
const detailPanels = document.querySelectorAll(
  ".project-content-grid > *, .project-navigation-footer",
);

if ("IntersectionObserver" in window) {
  // Revele chaque colonne lorsqu'elle approche de l'ecran.
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
  // Sans IntersectionObserver, ne laisse pas les panneaux masques par leur etat initial.
  detailPanels.forEach((panel) => panel.classList.add("is-content-ready"));
}

// SECTION 10 : suspend l'iframe hors de la page et la restaure au retour.
const stopEmbeddedProject = () => {
  if (!activeEmbedSource || !projectEmbed) {
    // Les pages sans embed n'ont aucune ressource externe a suspendre.
    return;
  }
  // Libere la ressource du lecteur quand l'onglet quitte le premier plan.
  projectEmbed.src = "about:blank";
  setEmbedLoading(false);
};

const resumeEmbeddedProject = () => {
  if (projectMuted || !projectEmbed) {
    // Ne relance pas un lecteur absent ou explicitement mis en pause.
    return;
  }

  if (activeEmbedSource && projectEmbed.getAttribute("src") === "about:blank") {
    // Recharge uniquement les embeds qui ont ete suspendus.
    setEmbedLoading(true);
    projectEmbed.src = activeEmbedSource;
    projectEmbed.hidden = false;
    if (projectImage) projectImage.hidden = true;
  }
};

document.addEventListener("visibilitychange", () => {
  // Suspend les medias en arriere-plan pour limiter leur consommation de ressources.
  if (document.hidden) {
    stopEmbeddedProject();
  } else {
    resumeEmbeddedProject();
  }
});

window.addEventListener("pagehide", stopEmbeddedProject);

// SECTION 11 : synchronise l'agrandissement du media et l'etat accessible du bouton.
const expandBtn = document.querySelector("#project-expand");
const projectVisual = document.querySelector(".project-visual");

if (expandBtn && projectVisual) {
  // Bascule le media en plein ecran et maintient l'etat du bouton synchronise.
  expandBtn.addEventListener("click", () => {
    const isExpanded = projectVisual.classList.toggle("is-expanded");
    expandBtn.setAttribute("aria-pressed", String(isExpanded));
    expandBtn.querySelector("[data-i18n]").textContent = isExpanded
      ? "× Fermer"
      : "⛶ Agrandir";
    document.body.classList.toggle("project-view-expanded", isExpanded);
  });
}

// SECTION 12 : construit les tags de technologies avec la couleur de categorie.
const technologyCategoryClasses = {
  "3D": "couleur-categorie--3d",
  "2D": "couleur-categorie--2d",
  "Site web": "couleur-categorie--site",
};

// Remplace le contenu du conteneur indique par les technologies du projet courant.
const renderTechnologyTags = (selector) => {
  const technologies = document.querySelector(selector);
  if (!technologies || !project.technologies) {
    // Ignore les emplacements absents ou les projets sans liste de technologies.
    return;
  }

  // Reconstruit les etiquettes pour eviter de conserver celles d'un autre projet.
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
  // Garantit que le bouton de retour pointe toujours vers le catalogue local.
  returnProjectBtn.href = "projets.html";
}

// SECTION 14 : configure les liens precedent/suivant selon l'ordre numerique des projets.
{
  const indexEl = document.getElementById("project-index");
  const nextLinkEl = document.getElementById("next-project-link");
  const prevLinkEl = document.getElementById("prev-project-link");

  if (indexEl) {
    // Trie les identifiants disponibles plutot que de supposer une suite sans trou.
    const activeProjectIds = Object.keys(projects)
      .map(Number)
      .sort((a, b) => a - b);
    const currentIndex = activeProjectIds.indexOf(projectId);

    if (currentIndex !== -1) {
      // Les extremites de la liste n'ont pas de lien precedent ou suivant.
      const nextNum = activeProjectIds[currentIndex + 1];
      const prevNum = activeProjectIds[currentIndex - 1];

      if (nextLinkEl) {
        if (nextNum) {
          // Relie au prochain projet existant et rend le bouton visible.
          nextLinkEl.href = `page_de_projets.html?project=${nextNum}`;
          nextLinkEl.classList.remove("is-hidden");
        } else {
          // Cache le lien suivant quand le projet courant est le dernier.
          nextLinkEl.classList.add("is-hidden");
        }
      }

      if (prevLinkEl) {
        if (prevNum) {
          // Relie au projet precedent disponible.
          prevLinkEl.href = `page_de_projets.html?project=${prevNum}`;
          prevLinkEl.classList.remove("is-hidden");
        } else {
          // Cache le lien precedent pour le premier projet de la liste.
          prevLinkEl.classList.add("is-hidden");
        }
      }
    }
  }
}

window.translatePortfolio?.();
