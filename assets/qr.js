document.addEventListener("DOMContentLoaded", () => {
    const errorModal = document.querySelector(".error");

    // Szukamy wszystkich kafelków z klasą "action" (Zeskanuj / Pokaż kod QR)
    const actionButtons = document.querySelectorAll(".action");

    actionButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            // Po kliknięciu dodajemy klasę otwierającą okno
            if (errorModal) {
                errorModal.classList.add("error_open");
            }
        });
    });

    // Szukamy przycisków do zamykania (tło i przycisk "Rozumiem")
    const closeButtons = document.querySelectorAll(".close");
    closeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (errorModal) {
                errorModal.classList.remove("error_open");
            }
        });
    });
});
