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

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Pokazujemy ładowanie na chwilę, żeby wyglądało profesjonalnie
  upload.classList.add("upload_loading");
  upload.classList.remove("upload_loaded");

  const reader = new FileReader();

  reader.onload = (e) => {
    const base64Image = e.target.result;

    // "Zapisujemy" zdjęcie w atrybucie selected (tak jak wcześniej URL z Imgur)
    upload.setAttribute("selected", base64Image);
    
    // Ustawiamy podgląd
    upload.querySelector(".upload_uploaded").src = base64Image;

    // Ukrywamy ładowanie, pokazujemy zdjęcie
    upload.classList.remove("upload_loading");
    upload.classList.add("upload_loaded");
  };

  reader.onerror = () => {
    alert("Błąd podczas czytania pliku.");
    upload.classList.remove("upload_loading");
  };

  // Ta linia zamienia plik na tekst (Base64)
  reader.readAsDataURL(file);
});

document.querySelector(".go").addEventListener("click", () => {
  var empty = [];

  var params = new URLSearchParams();

  params.set("sex", sex);
  if (!upload.hasAttribute("selected")) {
    empty.push(upload);
    upload.classList.add("error_shown");
  } else {
    params.set("image", upload.getAttribute("selected"));
  }

  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  [day, month, year].forEach((input) => {
    if (isEmpty(input.value)) {
      dateEmpty = true;
    } else {
      params.set(input.id, input.value);
    }
  });

  document.querySelectorAll(".input_holder").forEach((element) => {
    var input = element.querySelector(".input");

    if (isEmpty(input.value)) {
      empty.push(element);
      element.classList.add("error_shown");
    } else {
      params.set(input.id, input.value);
    }
  });

  if (empty.length != 0) {
    empty[0].scrollIntoView();
  } else {
    forwardToId(params);
  }
});

function isEmpty(value) {
  let pattern = /^\s*$/;
  return pattern.test(value);
}

function forwardToId(params) {
  location.href = "/id?" + params;
}

var guide = document.querySelector(".guide_holder");
guide.addEventListener("click", () => {
  if (guide.classList.contains("unfolded")) {
    guide.classList.remove("unfolded");
  } else {
    guide.classList.add("unfolded");
  }
});
