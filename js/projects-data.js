// Role : fournit une source de donnees unique aux pages qui affichent les projets.
// Parcours : charge le JSON, signale les reponses HTTP invalides, puis partage la promesse resolue.
export const loadProjects = async () => {
  // Resout le JSON depuis l'emplacement du module, sans dependre de la page courante.
  const response = await fetch(
    new URL("../data/projects.json", import.meta.url),
  );

  if (!response.ok) {
    // Signale explicitement une reponse HTTP invalide au lieu de fournir des donnees vides.
    throw new Error(`Impossible de charger les projets (${response.status}).`);
  }

  // Renvoie uniquement l'objet projects utilise par les pages du portfolio.
  const data = await response.json();
  return data.projects;
};

// Une seule promesse est partagee par les cartes, les filtres et la page detail.
export const projectsReady = loadProjects();
