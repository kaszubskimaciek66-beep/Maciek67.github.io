function sendTo(page) {
    const pages = {
        'home': 'home.html',
        'documents': 'documents.html',
        'services': 'services.html',
        'qr': 'qr.html',
        'more': 'more.html',
        'card': 'card.html',
        'scan': 'scan.html',
        'document': 'document.html',
        'pesel': 'pesel.html',
        'shortcuts': 'shortcuts.html'
    };

    const target = pages[page];
    if (target) {
        window.location.href = target;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Nawigacja dolna
    document.querySelectorAll(".bottom_element_grid").forEach((element) => {
        element.addEventListener('click', () => {
            sendTo(element.getAttribute("send"));
        });
    });

    // Obsługa zdjęcia na kafelku w home.html
    const photo = localStorage.getItem('image');
    const humanImg = document.querySelector(".human");
    if (photo && humanImg) {
        humanImg.src = photo;
    }
});
