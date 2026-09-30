// Role : chargement asynchrone des donnees partagees par les pages de projets.
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

// Une seule requete est partagee par les cartes, les filtres et la page detail.
export const projectsReady = loadProjects();
