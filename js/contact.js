// Role : gere le retour visuel lors de la soumission du formulaire de contact.
// Parcours : verifie la presence du formulaire et de son message de succes avant de relier l'envoi.
const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");

// N'installe le comportement que si le formulaire et sa confirmation sont tous deux presents.
if (contactForm && contactSuccess) {
  contactForm.addEventListener("submit", (event) => {
    // Evite le rechargement natif puis affiche l'etat de confirmation.
    event.preventDefault();
    contactForm.style.display = "none";
    contactSuccess.classList.add("is-visible");
  });
}
