// Role : gestion de la soumission et de l'etat de succes du formulaire de contact.
const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");

// Remplace le formulaire par le message de confirmation sans recharger la page.
if (contactForm && contactSuccess) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.style.display = "none";
    contactSuccess.classList.add("is-visible");
  });
}
