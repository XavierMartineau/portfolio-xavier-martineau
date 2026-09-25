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
      <h3 class="about-info-label">${item.label}</h3>
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
    year: "2023",
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
        <h3 class="about-timeline-role">${item.role}</h3>
        <span class="about-timeline-company">@ ${item.company}</span>
        <p class="about-timeline-description">${item.description}</p>
      </div>
    `;
    timelineContainer.appendChild(timelineItem);
  });
}

// La liste des maquettes est stockée dans data/projects.json.
let CREATION_PROCESS_IMAGES = [];

const shuffleImages = (images) => {
  const shuffledImages = [...images];

  for (let index = shuffledImages.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledImages[index], shuffledImages[randomIndex]] = [
      shuffledImages[randomIndex],
      shuffledImages[index],
    ];
  }

  return shuffledImages;
};

const creationProcessStack = document.querySelector("#creation-process-stack");
const creationProcessCurrent = document.querySelector(
  "#creation-process-current",
);
const creationProcessTotal = document.querySelector("#creation-process-total");
const creationProcessPrevious = document.querySelector(
  "#creation-process-previous",
);
const creationProcessNext = document.querySelector("#creation-process-next");
const creationLightbox = document.querySelector("#creation-lightbox");
const creationLightboxImage = document.querySelector(
  "#creation-lightbox-image",
);
const creationLightboxCaption = document.querySelector(
  "#creation-lightbox-caption",
);
const creationLightboxClose = document.querySelector(
  "#creation-lightbox-close",
);
const creationLightboxPrevious = document.querySelector(
  "#creation-lightbox-previous",
);
const creationLightboxNext = document.querySelector("#creation-lightbox-next");

const closeCreationLightbox = () => {
  if (creationLightbox?.open) creationLightbox.close();
};

const initializeCreationProcess = (images) => {
  if (!creationProcessStack) return;

  CREATION_PROCESS_IMAGES = shuffleImages(images);
  const creationProcessBoxes = CREATION_PROCESS_IMAGES.map((image) => [image]);

  let activeCreationBox = 0;
  let activeLightboxImage = 0;

  const updateCreationLightbox = () => {
    const filename = CREATION_PROCESS_IMAGES[activeLightboxImage];
    creationLightboxImage.src = encodeURI(`../processus_creation/${filename}`);
    creationLightboxImage.alt = `Étape ${activeLightboxImage + 1} du processus de création`;
    if (creationLightboxCaption) {
      creationLightboxCaption.textContent = `Étape ${String(activeLightboxImage + 1).padStart(2, "0")} / ${String(CREATION_PROCESS_IMAGES.length).padStart(2, "0")}`;
    }
  };

  creationProcessBoxes.forEach((box, boxIndex) => {
    const imageCard = document.createElement("figure");
    imageCard.className = "creation-process-card";
    imageCard.dataset.index = String(boxIndex);
    imageCard.innerHTML = `
      <div class="creation-process-image-grid">
        ${box
          .map(
            (filename, imageIndex) => `
              <div class="creation-process-frame">
                <img
                  src="${encodeURI(`../processus_creation/${filename}`)}"
                  alt="Étape ${boxIndex + imageIndex + 1} du processus de création"
                  ${boxIndex === 0 ? "" : 'loading="lazy"'}
                />
              </div>
            `,
          )
          .join("")}
      </div>
      <button
        class="creation-process-expand"
        type="button"
        data-image-index="${boxIndex}"
        aria-label="Agrandir ce box"
      >
        <span aria-hidden="true">↗</span>
      </button>
    `;
    creationProcessStack.appendChild(imageCard);

    imageCard.querySelectorAll(".creation-process-expand").forEach((button) => {
      button.addEventListener("click", () => {
        if (!creationLightbox || !creationLightboxImage) return;
        activeLightboxImage = Number(button.dataset.imageIndex);
        activeCreationBox = activeLightboxImage;
        updateCreationStack();
        updateCreationLightbox();
        creationLightbox.showModal();
      });
    });
  });

  const updateCreationStack = (direction = "next") => {
    const cards = [...creationProcessStack.children];
    const totalImages = cards.length;

    cards.forEach((card, index) => {
      const distance = (index - activeCreationBox + totalImages) % totalImages;
      card.className = "creation-process-card";

      if (distance === 0) card.classList.add("is-active");
      if (distance === 1) card.classList.add("is-next");
      if (distance === 2) card.classList.add("is-next-two");
      if (distance === totalImages - 1) card.classList.add("is-previous");
      if (distance > 2 && distance !== totalImages - 1) {
        card.classList.add("is-hidden");
      }
    });

    creationProcessStack.dataset.direction = direction;
    creationProcessCurrent.textContent = String(activeCreationBox + 1).padStart(
      2,
      "0",
    );
    creationProcessTotal.textContent = String(totalImages).padStart(2, "0");
  };

  const changeCreationLightboxImage = (direction) => {
    activeLightboxImage =
      (activeLightboxImage + direction + CREATION_PROCESS_IMAGES.length) %
      CREATION_PROCESS_IMAGES.length;
    activeCreationBox = activeLightboxImage;
    updateCreationStack(direction < 0 ? "previous" : "next");
    updateCreationLightbox();
  };

  creationLightboxPrevious?.addEventListener("click", () => {
    changeCreationLightboxImage(-1);
  });

  creationLightboxNext?.addEventListener("click", () => {
    changeCreationLightboxImage(1);
  });

  creationProcessPrevious?.addEventListener("click", () => {
    activeCreationBox =
      (activeCreationBox - 1 + creationProcessBoxes.length) %
      creationProcessBoxes.length;
    activeLightboxImage = activeCreationBox;
    updateCreationStack("previous");
  });

  creationProcessNext?.addEventListener("click", () => {
    activeCreationBox = (activeCreationBox + 1) % creationProcessBoxes.length;
    activeLightboxImage = activeCreationBox;
    updateCreationStack("next");
  });

  updateCreationStack();
};

fetch("../data/projects.json")
  .then((response) => {
    if (!response.ok) throw new Error("Impossible de charger les images");
    return response.json();
  })
  .then((data) => initializeCreationProcess(data.creationProcess.images))
  .catch((error) => {
    console.error("Processus de création :", error);
  });

creationLightboxClose?.addEventListener("click", closeCreationLightbox);
creationLightbox?.addEventListener("click", (event) => {
  if (event.target === creationLightbox) closeCreationLightbox();
});

window.translatePortfolio?.();
