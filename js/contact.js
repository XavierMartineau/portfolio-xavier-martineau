// Role : gestion de la soumission et de l'etat de succes du formulaire de contact.
const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");

if (contactForm && contactSuccess) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.style.display = "none";
    contactSuccess.classList.add("is-visible");
  });
}
