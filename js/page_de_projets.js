// ===============================
// LISTE DES PROJETS
// ===============================
const projects = {
  1: {
    name: "Animation & 3D",
    category: "3D",
    year: "2025",
    image: "projet_01.webp",

    // Lien YouTube normal (pour le bouton "Voir sur YouTube")
    youtubeUrl: "https://www.youtube.com/watch?v=Bkvwrvg_bws",

    description:
      "Un générique de fin sombre où chaque élément renforce la tension et la dernière note dramatique de l'histoire.",
    technologies: ["3D", "Animation", "MAYA", "Rendu"],
  },

  // ... (les autres projets identiques)
  2: {
    /* ... */
  },
  3: {
    /* ... */
  },
  4: {
    /* ... */
  },
  5: {
    /* ... */
  },
  6: {
    /* ... */
  },
  7: {
    /* ... */
  },
};

// ===============================
// RÉCUPÉRATION DE L’ID DU PROJET
// ===============================
const requestedId = Number.parseInt(
  new URLSearchParams(window.location.search).get("project"),
  10,
);

// Si l’ID n’existe pas → on affiche le projet 1
const projectId = projects[requestedId] ? requestedId : 1;
const project = projects[projectId];

// ===============================
// FONCTION POUR REMPLIR LE TEXTE
// ===============================
const setText = (selector, value) => {
  document.querySelector(selector).textContent = value;
};

// Remplissage des infos du projet
setText("#project-index", `[${String(projectId).padStart(2, "0")}] / 07`);
setText("#project-category", project.category);
setText("#project-year", project.year);
setText("#project-title", project.name);
setText("#project-description", project.description);
setText("#project-summary", project.description);
setText("#project-category-panel", project.category);

// Titre de la page
document.title = `${project.name} – Xavier Martineau`;

// ===============================
// IMAGES PRINCIPALES
// ===============================
const projectImage = document.querySelector("#project-image");
const secondaryImage = document.querySelector("#project-secondary-image");

// Si une image secondaire existe → on l'affiche
if (project.secondaryImage) {
  secondaryImage.src = `../assets/images/${project.secondaryImage}`;
  secondaryImage.alt = `${project.name}, vue secondaire`;
} else {
  secondaryImage.remove(); // sinon on la supprime
}

// ===============================
// ÉLÉMENTS INTERACTIFS
// ===============================
const interactive = document.querySelector("#project-interactive");
const youtubeLink = document.querySelector("#project-youtube");
const visual = document.querySelector(".project-visual");
const expandButton = document.querySelector("#project-expand");
const projectEmbed = document.querySelector("#project-embed");
const muteButton = document.querySelector("#project-mute");
const muteMessage = document.querySelector("#project-mute-message");

let activeEmbedSource = "";
let projectMuted = false;

// ===============================
// PROJETS AVEC IFRAME EMBED
// ===============================
// 🔥 Ici tu mets les projets qui doivent afficher un iframe
// 🔥 Correction : lien YouTube embed correct
const embeddedProjects = {
  1: {
    // Lien embed YouTube compatible iframe
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
    title: "Color Palet interactif",
  },
};

// ===============================
// MODE INTERACTIF POUR LES PROJETS WEB / JEUX
// ===============================
const renderInteractive = () => {
  interactive.hidden = false;
  projectImage.hidden = true;

  // Mode jeu vidéo (mini-jeu)
  if (project.category === "Jeu vidéo") {
    interactive.innerHTML = `
      <div class="interactive-game">
        <span class="interactive-kicker">// GAME PREVIEW</span>
        <strong>${project.name}</strong>
        <p>Explore le prototype et trouve la cible lumineuse.</p>
        <button class="interactive-action" type="button">Lancer la partie</button>
        <div class="game-stage"><button class="game-target" type="button" aria-label="Cible"></button></div>
        <span class="game-score">Score : <b>0</b></span>
      </div>`;

    // Logique du mini-jeu
    const startButton = interactive.querySelector(".interactive-action");
    const target = interactive.querySelector(".game-target");
    const score = interactive.querySelector(".game-score b");
    let currentScore = 0;

    startButton.addEventListener("click", () => {
      currentScore = 0;
      score.textContent = currentScore;
      target.hidden = false;
      target.style.left = `${20 + Math.random() * 65}%`;
      target.style.top = `${20 + Math.random() * 55}%`;
    });

    target.addEventListener("click", () => {
      currentScore += 1;
      score.textContent = currentScore;
      target.style.left = `${10 + Math.random() * 75}%`;
      target.style.top = `${15 + Math.random() * 60}%`;
    });

    return;
  }

  // Mode site web interactif
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

  // Logique des onglets
  const message = interactive.querySelector(".browser-message");
  interactive.querySelectorAll(".interactive-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      interactive.querySelectorAll(".interactive-tab").forEach((item) => {
        item.classList.remove("active");
      });
      tab.classList.add("active");
      message.textContent = `${tab.textContent} : contenu interactif chargé.`;
    });
  });
};

// ===============================
// LOGIQUE PRINCIPALE D’AFFICHAGE
// ===============================
if (embeddedProjects[projectId]) {
  // Si le projet a un iframe → on l'affiche
  const embeddedProject = embeddedProjects[projectId];
  activeEmbedSource = embeddedProject.src;

  projectEmbed.hidden = false;
  projectEmbed.src = embeddedProject.src;
  projectEmbed.title = embeddedProject.title;
  projectEmbed.classList.add("project-embed-active");

  projectImage.hidden = true;

  // Cas spécial : projet jeu vidéo
  if (projectId === 6) {
    projectImage.src = `../assets/images/${project.image}`;
    projectImage.alt = project.name;
  }

  // Style visuel selon catégorie
  if (project.category === "Jeu vidéo" || project.category === "Site web") {
    visual.classList.add("project-visual-interactive");
  } else {
    visual.classList.add("project-visual-media");
  }

  interactive.remove();

  // 🔥 Bouton YouTube pour le projet 1
  if (projectId === 1) {
    youtubeLink.hidden = false;
    youtubeLink.href = "https://www.youtube.com/watch?v=Bkvwrvg_bws";
    youtubeLink.textContent = "Ouvrir la vidéo sur YouTube →";
  }

  // Bouton mute pour le jeu vidéo
  if (projectId === 6) {
    muteButton.hidden = false;
  }
} else if (
  project.category === "Jeu vidéo" ||
  project.category === "Site web"
) {
  // Mode interactif si pas d’iframe
  visual.classList.add("project-visual-interactive");
  renderInteractive();
} else if (project.category === "3D") {
  // Projets 3D → lien YouTube simple
  visual.classList.add("project-visual-media");
  youtubeLink.hidden = false;
  youtubeLink.href = project.youtubeUrl;
} else {
  // Projets 2D → image simple
  visual.classList.add("project-visual-media", "project-visual-2d");
  projectImage.src = `../assets/images/${project.image}`;
  projectImage.alt = project.name;
  projectImage.classList.add("project-image-full");
}

// ===============================
// GESTION DU STOP / RESUME IFRAME
// ===============================
const stopEmbeddedProject = () => {
  if (!activeEmbedSource) return;
  projectEmbed.src = "about:blank"; // stop
};

const sendAudioCommand = (muted) => {
  // Envoi d’un message au contenu de l’iframe (si compatible)
  if (projectEmbed.contentWindow && activeEmbedSource) {
    projectEmbed.contentWindow.postMessage(
      { type: muted ? "mute" : "unmute" },
      new URL(activeEmbedSource).origin,
    );
  }
};

const resumeEmbeddedProject = () => {
  if (projectMuted) return;

  if (activeEmbedSource && projectEmbed.getAttribute("src") === "about:blank") {
    projectEmbed.src = activeEmbedSource; // reprise
    projectEmbed.hidden = false;
    projectImage.hidden = true;
  }
};

// Pause automatique quand l’onglet perd le focus
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopEmbeddedProject();
  else resumeEmbeddedProject();
});

window.addEventListener("pagehide", stopEmbeddedProject);

// ===============================
// BOUTON MUTE
// ===============================
muteButton.addEventListener("click", () => {
  if (!activeEmbedSource) return;

  projectMuted = !projectMuted;

  if (projectMuted) {
    sendAudioCommand(true);
    muteButton.textContent = "🔇";
    muteMessage.hidden = false;
    muteButton.setAttribute("aria-label", "Réactiver le son du jeu");
  } else {
    sendAudioCommand(false);
    muteButton.textContent = "🔊";
    muteMessage.hidden = true;
    muteButton.setAttribute("aria-label", "Couper le son du jeu");
  }

  muteButton.setAttribute("aria-pressed", String(projectMuted));
});

// ===============================
// BOUTON AGRANDIR
// ===============================
expandButton.addEventListener("click", () => {
  const isExpanded = visual.classList.toggle("is-expanded");
  expandButton.setAttribute("aria-pressed", String(isExpanded));
  expandButton.textContent = isExpanded ? "× Fermer" : "⛶ Agrandir";
  document.body.classList.toggle("project-view-expanded", isExpanded);
});

// ===============================
// TAGS TECHNOLOGIES
// ===============================
const technologies = document.querySelector("#project-technologies");
project.technologies.forEach((technology) => {
  const tag = document.createElement("span");
  tag.textContent = technology;
  technologies.append(tag);
});

// ===============================
// LIEN RETOUR
// ===============================
document.querySelector("#return-project").href = "projets.html";
