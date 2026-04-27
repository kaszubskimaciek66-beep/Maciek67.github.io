const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

// Funkcja pomocnicza do losowania liter i cyfr (inne niż ABC)
function generateDocumentNumber() {
    let series = "";
    const chars = "DEFGHIJKLMNOPQRSTUWXYZ"; // Pula liter bez A, B, C
    for (let i = 0; i < 3; i++) {
        series += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const numbers = Math.floor(100000 + Math.random() * 900000).toString().substring(0, 6);
    return series + " " + numbers;
}

function setClock() {
    const now = new Date();
    const timeEl = document.getElementById("time");
    if (timeEl) {
        timeEl.innerHTML = "Czas: " + now.toLocaleTimeString("pl-PL", optionsTime) + " " + now.toLocaleDateString("pl-PL", options);
    }
    setTimeout(setClock, 1000);
}

function loadCardData() {
    // 1. Pobieranie danych podstawowych
    const data = {
        name: localStorage.getItem('name') || "JAN",
        surname: localStorage.getItem('surname') || "KOWALSKI",
        pesel: localStorage.getItem('pesel') || "00000000000",
        image: localStorage.getItem('image'),
        day: localStorage.getItem('day') || "01",
        month: localStorage.getItem('month') || "01",
        year: localStorage.getItem('year') || "1995",
        sex: localStorage.getItem('sex') || "m",
        // Dodatkowe dane z index.html
        familyName: localStorage.getItem('familyName') || "---",
        fathersFamilyName: localStorage.getItem('fathersFamilyName') || "---",
        mothersFamilyName: localStorage.getItem('mothersFamilyName') || "---",
        birthPlace: localStorage.getItem('birthPlace') || "WARSZAWA",
        countryOfBirth: localStorage.getItem('countryOfBirth') || "POLSKA",
        adress1: localStorage.getItem('adress1') || "",
        adress2: localStorage.getItem('adress2') || "",
        city: localStorage.getItem('city') || ""
    };

    // 2. Wstrzykiwanie danych do HTML
    document.getElementById("name").innerHTML = data.name.toUpperCase();
    document.getElementById("surname").innerHTML = data.surname.toUpperCase();
    document.getElementById("pesel").innerHTML = data.pesel;
    document.getElementById("nationality").innerHTML = "POLSKIE";
    document.getElementById("birthday").innerHTML = `${data.day}.${data.month}.${data.year}`;
    
    // Imiona rodziców (zgodnie z prośbą)
    document.getElementById("fathersName").innerHTML = "ŁUKASZ";
    document.getElementById("mothersName").innerHTML = "MAŁGORZATA";

    // Dane rodowe i miejsce urodzenia (Zdjęcie 3)
    document.getElementById("familyName").innerHTML = data.familyName.toUpperCase();
    document.getElementById("sex").innerHTML = (data.sex === "m") ? "Mężczyzna" : "Kobieta";
    document.getElementById("fathersFamilyName").innerHTML = data.fathersFamilyName.toUpperCase();
    document.getElementById("mothersFamilyName").innerHTML = data.mothersFamilyName.toUpperCase();
    document.getElementById("birthPlace").innerHTML = data.birthPlace.toUpperCase();
    document.getElementById("countryOfBirth").innerHTML = data.countryOfBirth.toUpperCase();
    document.getElementById("adress").innerHTML = `ul. ${data.adress1}<br>${data.adress2} ${data.city}`.toUpperCase();

    // 3. Zdjęcie
    if (data.image) {
        document.querySelector(".id_own_image").style.backgroundImage = `url(${data.image})`;
    }

    // 4. Losowanie Serii i Numeru (jeśli nie ma w pamięci)
    if (!localStorage.getItem("seriesAndNumber")) {
        localStorage.setItem("seriesAndNumber", generateDocumentNumber());
    }
    document.getElementById("seriesAndNumber").innerHTML = localStorage.getItem("seriesAndNumber");

    // 5. Daty ważności
    document.getElementById("givenDate").innerHTML = `24.12.2024`;
    document.getElementById("expiryDate").innerHTML = `24.12.2034`;
    
    // 6. Data zameldowania (losowa raz na zawsze)
    if (!localStorage.getItem("homeDate")) {
        localStorage.setItem("homeDate", "12.05.2018");
    }
    document.querySelector(".home_date").innerHTML = localStorage.getItem("homeDate");
}

document.addEventListener("DOMContentLoaded", () => {
    loadCardData();
    setClock();

    // Rozwijanie "Twoje dodatkowe dane"
    const unfold = document.querySelector(".info_holder");
    if (unfold) {
        unfold.addEventListener('click', () => {
            unfold.classList.toggle("unfolded");
        });
    }

    // Aktualizacja
    const updateBtn = document.querySelector(".update");
    if (updateBtn) {
        updateBtn.addEventListener('click', () => {
            const newDate = new Date().toLocaleDateString("pl-PL", options);
            localStorage.setItem("update", newDate);
            document.querySelector(".bottom_update_value").innerHTML = newDate;
            window.scrollTo(0, 0);
        });
    }
});
