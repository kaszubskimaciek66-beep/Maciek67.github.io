// 1. Pobieramy dane z pamięci (LocalStorage)
const name = localStorage.getItem('name');
const surname = localStorage.getItem('surname');
const photo = localStorage.getItem('image');
const pesel = localStorage.getItem('pesel');

// 2. Wstawiamy je do odpowiednich elementów na stronie id.html
// Musisz się upewnić, że w pliku id.html masz elementy z takimi klasami lub ID

if (name && surname) {
    // Przykładowo szukamy elementu, gdzie ma być imię i nazwisko
    const nameDisplay = document.querySelector(".name_text"); // zmień klasę na taką, jaką masz w HTML
    if (nameDisplay) {
        nameDisplay.innerHTML = name + " " + surname;
    }
}

if (photo) {
    const userPhoto = document.querySelector(".user_photo"); // Twoja klasa zdjęcia w id.html
    if (userPhoto) {
        userPhoto.src = photo;
    }
}

if (pesel) {
    const peselDisplay = document.querySelector(".pesel_number");
    if (peselDisplay) {
        peselDisplay.innerHTML = pesel;
    }
}

// Reszta Twojego kodu id.js (np. obsługa logowania, animacje itp.)

var params = new URLSearchParams(window.location.search);

document.querySelector(".login").addEventListener("click", () => {
  toHome();
});

var welcome = "Dzień dobry!";

var date = new Date();
if (date.getHours() >= 18) {
  welcome = "Dobry wieczór!";
}
document.querySelector(".welcome").innerHTML = welcome;

function toHome() {
  location.href = "/home?" + params;
}

var input = document.querySelector(".password_input");
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    document.activeElement.blur();
  }
});

var dot = "•";
var original = "";
var eye = document.querySelector(".eye");

input.addEventListener("input", () => {
  var value = input.value.toString();
  var char = value.substring(value.length - 1);
  if (value.length < original.length) {
    original = original.substring(0, original.length - 1);
  } else {
    original = original + char;
  }

  if (!eye.classList.contains("eye_close")) {
    var dots = "";
    for (var i = 0; i < value.length - 1; i++) {
      dots = dots + dot;
    }
    input.value = dots + char;
    delay(3000).then(() => {
      value = input.value;
      if (value.length != 0) {
        input.value = value.substring(0, value.length - 1) + dot;
      }
    });
    console.log(original);
  }
});

function delay(time, length) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

eye.addEventListener("click", () => {
  var classlist = eye.classList;
  if (classlist.contains("eye_close")) {
    classlist.remove("eye_close");
    var dots = "";
    for (var i = 0; i < input.value.length - 1; i++) {
      dots = dots + dot;
    }
    input.value = dots;
  } else {
    classlist.add("eye_close");
    input.value = original;
  }
});

console.log("Skrypt id.js wczytany poprawnie z folderu assets!");

document.addEventListener("DOMContentLoaded", () => {
    // W Twoim qr.css przycisk logowania to .error_button
    const loginButton = document.querySelector(".error_button");

    if (loginButton) {
        loginButton.addEventListener("click", () => {
            console.log("Przycisk kliknięty! Przenoszę do home.html...");
            window.location.href = "home.html";
        });
    } else {
        console.error("BŁĄD: Nie znaleziono elementu .error_button. Sprawdź klasy w id.html");
    }
});
