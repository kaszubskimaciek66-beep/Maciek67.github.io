// 1. Pobieramy dane z pamięci (LocalStorage) - to dane wysłane z index.js
const name = localStorage.getItem('name');
const surname = localStorage.getItem('surname');
const photo = localStorage.getItem('image');
const pesel = localStorage.getItem('pesel');

// 2. Czekamy na załadowanie strony i wstawiamy dane do HTML
document.addEventListener("DOMContentLoaded", () => {
    console.log("Skrypt id.js wczytany poprawnie z folderu assets!");

    // Wstawiamy Imię i Nazwisko
    if (name && surname) {
        const nameDisplay = document.querySelector(".name_text"); 
        if (nameDisplay) {
            nameDisplay.innerHTML = name + " " + surname;
        }
    }

    // Wstawiamy zdjęcie
    if (photo) {
        const userPhoto = document.querySelector(".user_photo"); 
        if (userPhoto) {
            userPhoto.src = photo;
        }
    }

    // Wstawiamy PESEL
    if (pesel) {
        const peselDisplay = document.querySelector(".pesel_number");
        if (peselDisplay) {
            peselDisplay.innerHTML = pesel;
        }
    }

    // Powitanie zależne od godziny
    let welcome = "Dzień dobry!";
    const date = new Date();
    if (date.getHours() >= 18) {
        welcome = "Dobry wieczór!";
    }
    const welcomeElement = document.querySelector(".welcome");
    if (welcomeElement) {
        welcomeElement.innerHTML = welcome;
    }

    // OBSŁUGA LOGOWANIA (Przycisk .error_button z Twojego qr.css)
    const loginButton = document.querySelector(".error_button");
    if (loginButton) {
        loginButton.addEventListener("click", () => {
            console.log("Przycisk kliknięty! Przenoszę do home.html...");
            window.location.href = "home.html";
        });
    }
});

// 3. Logika pola hasła (kropki i "oko")
var input = document.querySelector(".password_input");
var dot = "•";
var original = "";
var eye = document.querySelector(".eye");

if (input) {
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            document.activeElement.blur();
        }
    });

    input.addEventListener("input", () => {
        var value = input.value.toString();
        var char = value.substring(value.length - 1);
        if (value.length < original.length) {
            original = original.substring(0, original.length - 1);
        } else {
            original = original + char;
        }

        if (eye && !eye.classList.contains("eye_close")) {
            var dots = "";
            for (var i = 0; i < value.length - 1; i++) {
                dots = dots + dot;
            }
            input.value = dots + char;
            
            setTimeout(() => {
                let currentVal = input.value;
                if (currentVal.length != 0) {
                    input.value = currentVal.substring(0, currentVal.length - 1) + dot;
                }
            }, 3000);
        }
    });
}

if (eye && input) {
    eye.addEventListener("click", () => {
        if (eye.classList.contains("eye_close")) {
            eye.classList.remove("eye_close");
            var dots = "";
            for (var i = 0; i < input.value.length; i++) {
                dots = dots + dot;
            }
            input.value = dots;
        } else {
            eye.classList.add("eye_close");
            input.value = original;
        }
    });
}
