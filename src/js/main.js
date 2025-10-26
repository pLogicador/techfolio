/*=== MENU SHOW Y HIDDEN ===*/
const navMenu = document.getElementById("nav-menu"),
  toggleMenu = document.getElementById("nav-toggle"),
  closeMenu = document.getElementById("nav-close");

// SHOW
toggleMenu.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// HIDDEN
closeMenu.addEventListener("click", () => {
  navMenu.classList.remove("show");
});

/*=== REMOVE MENU ===*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=== SCROLL SECTIONS ACTIVE LINK ===*/
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", scrollActive);

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");

    // Select the corresponding link
    const navLink = document.querySelector(
      `.nav__menu a[href*="${sectionId}"]`
    );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add("active");
    } else {
      navLink?.classList.remove("active");
    }
  });
}

// Typewriter effect para home__profession
const textElement = document.querySelector(".home__profession");
const professions = [
  "Web Developer",
  "Backend Developer",
  "Software Developer",
];

let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 150; // velocidade de digitação
const pauseDelay = 2000; // pausa ao finalizar cada palavra

function typeWriter() {
  const currentText = professions[professionIndex];

  if (isDeleting) {
    charIndex--;
    textElement.textContent = currentText.slice(0, charIndex);
  } else {
    charIndex++;
    textElement.textContent = currentText.slice(0, charIndex);
  }

  let delay = typingSpeed;

  if (!isDeleting && charIndex === currentText.length) {
    delay = pauseDelay; // pausa ao terminar a palavra
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    professionIndex = (professionIndex + 1) % professions.length;
    delay = 500; // pausa antes de digitar a próxima palavra
  }

  setTimeout(typeWriter, delay);
}

// Inicia a animação
typeWriter();

// Contact Form Submission
document
  .querySelector(".contact__form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Collecting field values
    let fullName = document.querySelector('[placeholder="Name"]').value;
    let emailAddress = document.querySelector('[placeholder="Email"]').value;
    let project = document.querySelector('[placeholder="Project"]').value;
    let message = document.querySelector('[placeholder="Message"]').value;

    // Validating if all fields were filled in
    if (!fullName || !emailAddress || !project || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Email validation using a simple regex
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(emailAddress)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Configuration for Formspree
    let formSpreeEndpoint = "https://formspree.io/mayrqzov"; // Replace with your Formspree endpoint

    fetch(formSpreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        emailAddress: emailAddress,
        project: project,
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Logic after successful form submission
        console.log("Formspree Response:", data);
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert(
          "There was an error submitting the form. Please try again later."
        );
      });
  });
