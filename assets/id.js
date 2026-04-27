document.addEventListener("DOMContentLoaded", () => {
    console.log("Skrypt id.js wczytany poprawnie!");

    // 1. OBSŁUGA PRZYCISKU LOGOWANIA (Najważniejsza)
    // Szukamy wszystkich możliwych klas, których mogłeś użyć
    const loginBtn = document.querySelector(".error_button") || 
                     document.querySelector(".login") || 
                     document.querySelector(".error_button.retry");

    if (loginBtn) {
        console.log("Znaleziono przycisk logowania. Dodaję obsługę kliknięcia.");
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Zapobiega przeładowaniu strony
            console.log("Przycisk kliknięty! Przekierowuję...");
            window.location.href = "home.html";
        });
    } else {
        console.error("Błąd: Nie znaleziono przycisku logowania w HTML.");
    }

    // 2. BEZPIECZNE ŁADOWANIE DANYCH (Jeśli czegoś braknie, reszta działa)
    try {
        const name = localStorage.getItem('name');
        const surname = localStorage.getItem('surname');
        const photo = localStorage.getItem('image');

        if (name && surname) {
            const display = document.querySelector(".name_text");
            if (display) display.innerHTML = name + " " + surname;
        }
        
        if (photo) {
            const img = document.querySelector(".user_photo");
            if (img) img.src = photo;
        }
    } catch (err) {
        console.warn("Problem z ładowaniem danych z pamięci:", err);
    }

    // 3. BEZPIECZNA OBSŁUGA OKA (Jeśli eye.png brakuje, nie wywali błędu)
    const eye = document.querySelector(".eye");
    const input = document.querySelector(".password_input");
    if (eye && input) {
        eye.addEventListener("click", () => {
            eye.classList.toggle("eye_close");
            input.type = input.type === "password" ? "text" : "password";
        });
    }
});
