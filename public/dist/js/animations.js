$(document).ready(function () {
    window.sr = ScrollReveal();

    sr.reveal('#HOME h1',{ origin: 'top', duration: 1000 });
    sr.reveal('#HOME h2',{ origin: 'left', duration: 1000 });
    sr.reveal('#HOME h3',{ origin: 'bottom', duration: 1000 });
    sr.reveal('.title h1',{ origin: 'left', duration: 1000 });
    sr.reveal('section .body h3',{ origin: 'left', duration: 1000 });
    sr.reveal('section .body h4',{ origin: 'left', duration: 1000 });
    sr.reveal('#about-phrase h2',{ origin: 'left', duration: 1000 });
    sr.reveal('#ABOUT img',{ origin: 'left', duration: 1000 });
    sr.reveal('p',{ origin: 'bottom', duration: 1000 });


});