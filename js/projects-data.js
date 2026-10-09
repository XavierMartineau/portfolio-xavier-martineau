// Role : fournit une source de donnees unique aux pages qui affichent les projets.
// Parcours : charge le JSON, signale les reponses HTTP invalides, puis partage la promesse resolue.
export const loadProjects = async () => {
  const response = await fetch(
    new URL("../data/projects.json", import.meta.url),
  );

  if (!response.ok) {
    throw new Error(`Impossible de charger les projets (${response.status}).`);
  }

  const data = await response.json();
  return data.projects;
};

// Une seule promesse est partagee par les cartes, les filtres et la page detail.
export const projectsReady = loadProjects();
