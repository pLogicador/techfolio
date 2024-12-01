/*=== MENU SHOW Y HIDDEN ===*/
const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close');

// SHOW
toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// HIDDEN
closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('show');
});

/*=== REMOVE MENU ===*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=== SCROLL SECTIONS ACTIVE LINK ===*/
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', scrollActive);

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id');

        // Select the corresponding link
        const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

// Text animate - Typewrite
const text = document.querySelector(".home__profession");

const textLoad = () => {
    // Array with professions
    const professions = ["Web Developer", "Backend Developer", "Software developer"];
    let index = 0;

    // Function to change the text
    setInterval(() => {
        text.textContent = professions[index];
        // Change the index between 0 and 1
        index = (index + 1) % professions.length; 
    }, 4000); // Change text every 4 seconds
}

textLoad();
setTimeout(textLoad, 12000);

// Contact Form Submission
document.querySelector('.contact__form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collecting field values
    let fullName = document.querySelector('[placeholder="Name"]').value;
    let emailAddress = document.querySelector('[placeholder="Email"]').value;
    let project = document.querySelector('[placeholder="Project"]').value;
    let message = document.querySelector('[placeholder="Message"]').value;

    // Validating if all fields were filled in
    if (!fullName || !emailAddress || !project || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Email validation using a simple regex
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(emailAddress)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Configuration for Formspree
    let formSpreeEndpoint = 'https://formspree.io/mayrqzov'; // Replace with your Formspree endpoint

    fetch(formSpreeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName: fullName,
            emailAddress: emailAddress,
            project: project,
            message: message
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Logic after successful form submission
        console.log('Formspree Response:', data);
        alert('Form submitted successfully!');
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form. Please try again later.');
    });
});
