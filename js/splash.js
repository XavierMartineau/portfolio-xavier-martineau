// Role : initialisation, dessin et transition de l'ecran d'introduction.
// ==============================
// RÉFÉRENCES DE L'ÉCRAN D'INTRODUCTION
// ==============================
const canvas = document.getElementById("splash-canvas");
const ctx = canvas.getContext("2d");
const splash = document.getElementById("splash");
const enterBtn = document.getElementById("enter-btn");

// Position initiale de la souris, placée hors écran au chargement
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
resize();
window.addEventListener("resize", resize);

// Palette utilisée par les particules lumineuses
const colors = ["#6366f1", "#ff00ea", "#00f3ff", "#63ff9b"];

// Donnees et initialisation des particules.
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

// Boucle de rendu et interactions de la souris.
// ==============================
// BOUCLE DE DESSIN ET D'ANIMATION
// ==============================
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

  // Mise à jour de la position de chaque particule et affichage
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

  // Connexion par des lignes entre les particules qui sont proches les unes des autres
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
  requestAnimationFrame(draw);
}
draw();

// Suit la position de la souris pour déplacer le halo lumineux
window.addEventListener("mousemove", (e) => {
  mouse = { x: e.clientX, y: e.clientY };
});

// ==============================
// TRANSITION VERS LA PAGE D'ACCUEIL
// ==============================
enterBtn.addEventListener("click", () => {
  splash.style.opacity = "0"; // Fait disparaître la page en fondu
  setTimeout(() => {
    window.location.href = "./html/accueil.html"; // Redirige vers la page d'accueil après 0.6 seconde
  }, 600);
});
