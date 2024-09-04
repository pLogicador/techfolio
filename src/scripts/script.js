// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            //active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active section for animation on scroll
            sec.classList.add('show-animate');
        }
        // using animation that repeats on scroll
        else {
            sec.classList.remove('show-animate');

        }
    });

    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    //animation footer on scoll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let fullName = document.querySelector('[placeholder="Full Name"]').value;
    let emailAddress = document.querySelector('[placeholder="Email Address"]').value;
    let mobileNumber = document.querySelector('[placeholder="Mobile Number"]').value;
    let emailSubject = document.querySelector('[placeholder="Email Subject"]').value;
    let message = document.querySelector('[placeholder="Your Message"]').value;


    if (!fullName || !emailAddress || !mobileNumber || !emailSubject || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Configuração para Formspree
    let formSpreeEndpoint = 'https://formspree.io/mayrqzov';

    fetch(formSpreeEndpoint, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            fullName: fullName,
            emailAddress: emailAddress,
            mobileNumber: mobileNumber,
            emailSubject: emailSubject,
            message: message,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Lógica após o envio bem-sucedido do formulário
        console.log('Resposta do Formspree:', data);
        alert('Formulário enviado com sucesso!');
    })
    .catch(error => {
        console.error('Erro ao enviar o formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
    });
});
