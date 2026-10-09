// Role : gere le retour visuel lors de la soumission du formulaire de contact.
// Parcours : verifie la presence du formulaire et de son message de succes avant de relier l'envoi.
const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");

// Remplace le formulaire par la confirmation sans navigation ni rechargement.
if (contactForm && contactSuccess) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.style.display = "none";
    contactSuccess.classList.add("is-visible");
  });
}
