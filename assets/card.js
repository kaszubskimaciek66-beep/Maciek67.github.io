// Konfiguracja czasu i daty
const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
var date = new Date();

// Funkcja pomocnicza do HTML
function htmlEncode(s) {
    return s ? s.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : "";
}

// 1. ŁADOWANIE DANYCH Z LOCALSTORAGE
function loadDataFromStorage() {
    // Pobieramy dane zapisane w index.js
    const name = localStorage.getItem('name') || "JAN";
    const surname = localStorage.getItem('surname') || "KOWALSKI";
    const pesel = localStorage.getItem('pesel') || "00000000000";
    const photo = localStorage.getItem('image');
    const day = localStorage.getItem('day') || "01";
    const month = localStorage.getItem('month') || "01";
    const year = localStorage.getItem('year') || "1990";
    const sex = localStorage.getItem('sex') || "m";

    // Wstawianie do HTML (używając Twoich ID z card.html)
    document.getElementById("name").innerHTML = htmlEncode(name.toUpperCase());
    document.getElementById("surname").innerHTML = htmlEncode(surname.toUpperCase());
    document.getElementById("pesel").innerHTML = htmlEncode(pesel);
    document.getElementById("birthday").innerHTML = `${day}.${month}.${year}`;
    document.getElementById("nationality").innerHTML = "POLSKIE";
    
    // Płeć
    document.getElementById("sex").innerHTML = (sex === "m") ? "Mężczyzna" : "Kobieta";

    // Zdjęcie profilowe
    if (photo) {
        document.querySelector(".id_own_image").style.backgroundImage = `url(${photo})`;
    }

    // Generowanie numeru dowodu (jeśli nie ma w pamięci)
    let seriesAndNumber = localStorage.getItem("seriesAndNumber");
    if (!seriesAndNumber) {
        seriesAndNumber = "ABC " + Math.floor(10000 + Math.random() * 90000);
        localStorage.setItem("seriesAndNumber", seriesAndNumber);
    }
    document.getElementById("seriesAndNumber").innerHTML = seriesAndNumber;

    // Przykładowe daty wydania i ważności
    document.getElementById("expiryDate").innerHTML = `24.12.2034`;
    document.getElementById("givenDate").innerHTML = `24.12.2024`;
}

// 2. OBSŁUGA ZEGARA
function setClock() {
    date = new Date();
    const timeElement = document.getElementById("time");
    if (timeElement) {
        timeElement.innerHTML = "Czas: " + date.toLocaleTimeString("pl-PL", optionsTime) + " " + date.toLocaleDateString("pl-PL", options);
    }
    setTimeout(setClock, 1000);
}

// 3. ROZWIJANIE DODATKOWYCH DANYCH
var unfold = document.querySelector(".info_holder");
if (unfold) {
    unfold.addEventListener("click", () => {
        unfold.classList.toggle("unfolded");
    });
}

// 4. AKTUALIZACJA DATY "Ostatnia aktualizacja"
var updateText = document.querySelector(".bottom_update_value");
if (updateText) {
    if (!localStorage.getItem("update")) localStorage.setItem("update", "24.12.2024");
    updateText.innerHTML = localStorage.getItem("update");
}

var updateBtn = document.querySelector(".update");
if (updateBtn) {
    updateBtn.addEventListener("click", () => {
        var newDate = new Date().toLocaleDateString("pl-PL", options);
        localStorage.setItem("update", newDate);
        if (updateText) updateText.innerHTML = newDate;
        window.scrollTo(0, 0);
    });
}

// INICJALIZACJA
document.addEventListener("DOMContentLoaded", () => {
    loadDataFromStorage();
    setClock();
});
