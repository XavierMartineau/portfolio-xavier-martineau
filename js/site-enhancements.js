const revealTargets = document.querySelectorAll(
  "main > section:not(.project-content-grid), .about-card, .about-timeline-section, .creation-process-section, .featured-card",
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  revealTargets.forEach((target) => {
    target.classList.add("reveal-on-scroll");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-revealed"));
}

const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.type = "button";
backToTop.textContent = "↑";
document.body.appendChild(backToTop);

const updateBackToTopLabel = () => {
  const label =
    document.documentElement.lang === "en" ? "Back to top" : "Retour en haut";
  backToTop.setAttribute("aria-label", label);
  backToTop.title = label;
};

updateBackToTopLabel();
new MutationObserver(updateBackToTopLabel).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["lang"],
});

const updateBackToTop = () => {
  backToTop.classList.toggle("is-visible", window.scrollY > 500);
};

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
});

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();
