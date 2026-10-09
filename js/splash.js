// Role : anime le fond de l'introduction et ouvre la page d'accueil.
// Parcours : ajuste le canvas, dessine les particules et leur halo, puis redirige apres validation.
// ==============================
// RÉFÉRENCES DE L'ÉCRAN D'INTRODUCTION
// ==============================
const canvas = document.getElementById("splash-canvas");
const ctx = canvas.getContext("2d");
const splash = document.getElementById("splash");
const enterBtn = document.getElementById("enter-btn");

// Les coordonnees initiales hors canvas evitent d'afficher le halo avant un mouvement.

// SECTION 1 : conserve les particules et la position du pointeur qui pilote le halo.
// Le pointeur reste hors champ jusqu'au premier mouvement de la souris.
let mouse = { x: -1000, y: -1000 };
let particles = [];

// ==============================
// DIMENSIONS DU CANVAS
// ==============================
function resize() {
  // Aligne la surface de dessin sur la fenetre pour eviter un canvas flou ou tronque.
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
// Ajuste le canvas au chargement initial avant d'attacher les redimensionnements.
resize();
window.addEventListener("resize", resize);

// SECTION 2 : palette partagee par les points dessines sur le canvas.
const colors = ["#6366f1", "#ff00ea", "#00f3ff", "#63ff9b"];

// Cree les points une fois; leur position et leur apparence varient aleatoirement.
// ==============================
// INITIALISATION DES PARTICULES
// ==============================
particles = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.4, // Vitesse horizontale
  vy: (Math.random() - 0.5) * 0.4, // Vitesse verticale
  r: Math.random() * 1.7 + 0.4, // Rayon légèrement renforcé
  color: colors[Math.floor(Math.random() * colors.length)], // Couleur aléatoire dans la palette
  alpha: Math.random() * 0.38 + 0.14, // Contraste légèrement renforcé
}));

// Redessine le fond a chaque image et relance sa propre animation.
// ==============================
// BOUCLE DE DESSIN ET D'ANIMATION
// ==============================
// Dessine une image du fond; requestAnimationFrame relance ensuite cette meme fonction.
function draw() {
  // Une frame complete efface, redessine les particules et programme la suivante.
  // Efface le contenu précédent du canvas à chaque frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Création d'un dégradé radial interactif qui suit la position de la souris
  const grd = ctx.createRadialGradient(
    mouse.x,
    mouse.y,
    0,
    mouse.x,
    mouse.y,
    260,
  );
  grd.addColorStop(0, "rgba(255,255,255,0.018)");
  grd.addColorStop(0.35, "rgba(255,255,255,0.006)");
  grd.addColorStop(1, "transparent");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Deplace chaque point et le fait reapparaitre de l'autre cote apres un bord.
  particles.forEach((p) => {
    // Déplacement de la particule et boucle infinie sur les bords de l'écran
    p.x = (p.x + p.vx + canvas.width) % canvas.width;
    p.y = (p.y + p.vy + canvas.height) % canvas.height;

    // Dessin du point (cercle)
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.globalAlpha = 1; // Réinitialisation de l'opacité globale
  });

  // Relie uniquement chaque paire une fois; les lignes s'estompent avec la distance.
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy); // Calcul de la distance entre deux points

      // Si la distance est inférieure à 100 pixels, on trace une ligne
      if (d < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = "#ffffff";
        ctx.globalAlpha = (1 - d / 100) * 0.08; // Lignes blanches très discrètes
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }

  // Demande à la prochaine image de relancer la fonction draw (boucle d'animation)
  // La boucle d'animation se poursuit tant que l'ecran d'introduction est ouvert.
  requestAnimationFrame(draw);
}
draw();

// SECTION 3 : met a jour le centre du halo au mouvement de la souris.
window.addEventListener("mousemove", (e) => {
  // Le halo suit les coordonnees du pointeur dans la fenetre.
  mouse = { x: e.clientX, y: e.clientY };
});

// ==============================
// TRANSITION VERS LA PAGE D'ACCUEIL
// ==============================
enterBtn.addEventListener("click", () => {
  // Termine le fondu avant de naviguer vers le contenu principal.
  splash.style.opacity = "0"; // Fait disparaître la page en fondu
  setTimeout(() => {
    window.location.href = "./html/accueil.html"; // Redirige vers la page d'accueil après 0.6 seconde
  }, 600);
});
