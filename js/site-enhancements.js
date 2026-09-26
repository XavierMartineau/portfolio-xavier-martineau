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
