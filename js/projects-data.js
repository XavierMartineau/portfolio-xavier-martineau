// Role : chargement asynchrone des donnees partagees par les pages de projets.
// Cette fonction centralise la lecture du JSON et signale explicitement une erreur HTTP.
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
