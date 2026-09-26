const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.type = "button";
backToTop.textContent = "↑";
document.body.appendChild(backToTop);

const updateBackToTop = () => {
  backToTop.classList.toggle("is-visible", window.scrollY > 400);
  backToTop.setAttribute(
    "aria-label",
    document.documentElement.lang === "en" ? "Back to top" : "Retour en haut",
  );
  const backToTopLabel =
    document.documentElement.lang === "en" ? "TOP ↑" : "HAUT ↑";
  backToTop.textContent = backToTopLabel;
  backToTop.title = backToTopLabel;
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
