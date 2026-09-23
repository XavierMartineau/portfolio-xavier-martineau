/* Donnees de competences affichees dans la carte principale. */
const SKILLS = [
  {
    label: "Front-end",
    level: 95,
    items: ["React", "Next.js", "Tailwind", "Framer Motion", "TypeScript"],
  },
  {
    label: "Back-end",
    level: 90,
    items: ["Node.js", "Express", "PostgreSQL", "Redis", "Prisma"],
  },
  {
    label: "DevOps",
    level: 85,
    items: ["Docker", "Kubernetes", "CI/CD", "NGINX", "Cloudflare"],
  },
  {
    label: "IA / ML",
    level: 80,
    items: ["Python", "TensorFlow", "RAG", "Ajustement LLM"],
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
