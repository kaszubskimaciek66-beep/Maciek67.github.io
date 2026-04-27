var selector = document.querySelector(".selector_box");
selector.addEventListener("click", () => {
  if (selector.classList.contains("selector_open")) {
    selector.classList.remove("selector_open");
  } else {
    selector.classList.add("selector_open");
  }
});

document.querySelectorAll(".date_input").forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector(".date").classList.remove("error_shown");
  });
});

var sex = "m";

document.querySelectorAll(".selector_option").forEach((option) => {
  option.addEventListener("click", () => {
    sex = option.id;
    document.querySelector(".selected_text").innerHTML = option.innerHTML;
  });
});

var upload = document.querySelector(".upload");

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {
  var input = element.querySelector(".input");
  input.addEventListener("click", () => {
    element.classList.remove("error_shown");
  });
});

upload.addEventListener("click", () => {
  imageInput.click();
  upload.classList.remove("error_shown");
});

imageInput.addEventListener('change', (event) => {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");
    upload.removeAttribute("selected");

    var file = imageInput.files[0];
    if (!file) {
        upload.classList.remove("upload_loading");
        return;
    }

    var data = new FormData();
    data.append("image", file);

    // USUNIĘTO "/" Z KOŃCA URL
    fetch("https://api.imgur.com/3/image", { 
        method: 'POST',
        headers: {
            // UŻYTO DZIAŁAJĄCEGO CLIENT-ID
            'Authorization': 'Client-ID c27369172c61327' 
        },
        body: data
    })
    .then(result => {
        if (!result.ok) throw new Error('Błąd serwera Imgur');
        return result.json();
    })
    .then(response => {
        if (response.success) {
            var url = response.data.link;
            upload.classList.remove("error_shown");
            upload.setAttribute("selected", url);
            upload.classList.add("upload_loaded");
            upload.classList.remove("upload_loading");
            upload.querySelector(".upload_uploaded").src = url;
        } else {
            console.error("Imgur error:", response);
            upload.classList.remove("upload_loading");
        }
    })
    .catch(err => {
        console.error("Fetch error:", err);
        alert("Nie udało się wysłać zdjęcia. Sprawdź konsolę (F12).");
        upload.classList.remove("upload_loading");
    });
});

// Ta sekcja obsługuje kliknięcie przycisku "Dalej" na samym dole formularza
document.querySelector(".go").addEventListener("click", () => {
    let empty = [];
    let dataToSave = {};

    // 1. Zapisujemy płeć (zmiennej 'sex' używasz już wcześniej w kodzie)
    dataToSave.sex = sex;

    // 2. Sprawdzamy czy zdjęcie jest wgrane
    if (!upload.hasAttribute("selected")) {
        empty.push(upload);
        upload.classList.add("error_shown");
    } else {
        dataToSave.image = upload.getAttribute("selected");
    }

    // 3. Pobieramy datę urodzenia z pól tekstowych
    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const year = document.getElementById("year");

    let dateEmpty = false;
    if (day && month && year) {
        if (isEmpty(day.value) || isEmpty(month.value) || isEmpty(year.value)) {
            dateEmpty = true;
        } else {
            dataToSave.day = day.value;
            dataToSave.month = month.value;
            dataToSave.year = year.value;
        }
    }

    if (dateEmpty) {
        const dateElement = document.querySelector(".date");
        if (dateElement) {
            dateElement.classList.add("error_shown");
            empty.push(dateElement);
        }
    }

    // 4. Pobieramy pozostałe dane (imię, nazwisko, PESEL itp.)
    document.querySelectorAll(".input_holder").forEach((element) => {
        let input = element.querySelector(".input");
        if (input && isEmpty(input.value)) {
            empty.push(element);
            element.classList.add("error_shown");
        } else if (input) {
            // Tutaj id inputa (np. "name") staje się kluczem w pamięci
            dataToSave[input.id] = input.value;
        }
    });

    // 5. Jeśli są puste pola - przewiń do pierwszego błędu. Jeśli nie - leć dalej!
    if (empty.length != 0) {
        empty[0].scrollIntoView({ behavior: 'smooth' });
    } else {
        saveAndForward(dataToSave);
    }
});

// Funkcja pomocnicza do sprawdzania czy pole jest puste
function isEmpty(value) {
    let pattern = /^\s*$/;
    return pattern.test(value);
}

// KLUCZOWA FUNKCJA: Zapisuje dane w pamięci przeglądarki i przenosi do id.html
function saveAndForward(data) {
    // Czyścimy starą pamięć, żeby dane się nie mieszały
    localStorage.clear();

    // Zapisujemy każdą daną z obiektu do localStorage
    for (const key in data) {
        localStorage.setItem(key, data[key]);
    }

    // Przekierowanie na stronę logowania/dowodu
    location.href = "id.html";
}

// Obsługa rozwijania instrukcji na dole strony (Guide)
var guide = document.querySelector(".guide_holder");
if (guide) {
    guide.addEventListener("click", () => {
        if (guide.classList.contains("unfolded")) {
            guide.classList.remove("unfolded");
        } else {
            guide.classList.add("unfolded");
        }
    });
}
