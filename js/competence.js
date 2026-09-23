/* Donnees de competences affichees dans la carte principale. */
const SKILLS = [
  {
    label: "Animation 3D",
    level: 75,
    items: ["3D", "Animation", "MAYA", "Rendu"],
  },
  {
    label: "Jeu vidéo",
    level: 70,
    items: ["Interface", "Interaction", "Web", "Expérience"],
  },
  {
    label: "Illustration 2D",
    level: 85,
    items: [
      "Vectoriel",
      "Illustration",
      "Illustrator",
      "Photoshop",
      "Couleur",
      "Composition",
    ],
  },
  {
    label: "Site web",
    level: 90,
    items: ["Web", "UX/UI", "Conception", "Adaptatif"],
  },
];

const skillsContainer = document.querySelector("#skills-container");
const skillsTrigger = document.querySelector("#skills-trigger");

if (skillsContainer) {
  SKILLS.forEach((skill) => {
    const block = document.createElement("div");
    block.className = "skill-block";
    block.innerHTML = `
      <div class="skill-header">
        <span class="skill-label">${skill.label}</span>
        <span class="skill-level">${skill.level}%</span>
      </div>
      <div class="skill-bar-bg" aria-label="Niveau ${skill.label}: ${skill.level}%">
        <div class="skill-bar-fill" data-level="${skill.level}"></div>
      </div>
      <div class="skill-tags">
        ${skill.items.map((item) => `<span class="skill-tag">${item}</span>`).join("")}
      </div>
    `;
    skillsContainer.appendChild(block);
  });
}

const animateSkillBars = () => {
  document.querySelectorAll(".skill-bar-fill").forEach((bar) => {
    bar.style.width = `${bar.dataset.level}%`;
  });
};

if (skillsTrigger && "IntersectionObserver" in window) {
  const skillsObserver = new IntersectionObserver(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.disconnect();
      }
    },
    { threshold: 0.2 },
  );

  skillsObserver.observe(skillsTrigger);
} else {
  animateSkillBars();
}
