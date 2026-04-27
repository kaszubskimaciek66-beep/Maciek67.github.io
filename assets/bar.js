document.addEventListener("DOMContentLoaded", () => {
    // Pobranie zdjęcia z pamięci i wstawienie do kafelka mDowód
    const photo = localStorage.getItem('image');
    const humanImg = document.querySelector(".human");
    if (photo && humanImg) {
        humanImg.src = photo;
    }
    
    // Opcjonalnie zmiana napisu "mDowód" na Imię i Nazwisko
    const name = localStorage.getItem('name');
    const surname = localStorage.getItem('surname');
    const cardTitle = document.querySelector(".name");
    if (name && surname && cardTitle) {
        // cardTitle.innerHTML = name + " " + surname; // Odkomentuj jeśli chcesz nazwisko na kafelku
    }
});

// Ta funkcja obsługuje kliknięcia w kafelki (onclick="sendTo(...)")
function sendTo(page) {
    // Mapujemy nazwy z HTML na Twoje pliki .html
    const pages = {
       'home': 'home.html',
        'documents': 'documents.html', 
        'services': 'services.html',
        'qr': 'qr.html',
        'more': 'more.html',
        'card': 'card.html',
        'pesel': 'pesel.html',
        'scan': 'scan.html',        // Dodane
        'document': 'document.html', // Dodane (dane dowodu)
        'shortcuts': 'shortcuts.html' // Dodane
    };

    const target = pages[page];

    if (target) {
        window.location.href = target;
    } else {
        console.error("Nie znaleziono strony dla: " + page);
    }
}

// Obsługa dolnego paska (ikonki na dole)
document.addEventListener("DOMContentLoaded", () => {
    const bottomElements = document.querySelectorAll(".bottom_element_grid");

    bottomElements.forEach(element => {
        element.addEventListener("click", () => {
            const destination = element.getAttribute("send");
            if (destination) {
                sendTo(destination);
            }
        });
    });
    
    // Dodatkowo: Obsługa kafelków usług (Bezpiecznie w sieci, PESEL itd.)
    const serviceBoxes = document.querySelectorAll(".service_box");
    serviceBoxes.forEach(box => {
        box.addEventListener("click", () => {
            const name = box.querySelector(".service_box_name").innerText;
            if (name.includes("PESEL")) {
                window.location.href = "pesel.html";
            } else if (name.includes("pojazdu")) {
                window.location.href = "vehicle.html"; // Jeśli go masz
            }
        });
    });
});
