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

  // --- TUTAJ BYŁ BŁĄD - DODAJEMY TĘ LINIĘ ---
  let dateEmpty = false; 
  // ------------------------------------------

  // Sprawdzamy czy inputy istnieją, żeby nie wywaliło błędu
  if (day && month && year) {
    [day, month, year].forEach((input) => {
      if (isEmpty(input.value)) {
        dateEmpty = true;
      } else {
        params.set(input.id, input.value);
      }
    });
  }

  if (dateEmpty) {
      const dateElement = document.querySelector(".date");
      if (dateElement) {
          dateElement.classList.add("error_shown");
          empty.push(dateElement);
      }
  }

  document.querySelectorAll(".input_holder").forEach((element) => {
    var input = element.querySelector(".input");
    if (input && isEmpty(input.value)) {
      empty.push(element);
      element.classList.add("error_shown");
    } else if (input) {
      params.set(input.id, input.value);
    }
  });

  if (empty.length != 0) {
    empty[0].scrollIntoView({ behavior: 'smooth' });
  } else {
    forwardToId(params);
  }
});

function isEmpty(value) {
  let pattern = /^\s*$/;
  return pattern.test(value);
}

function forwardToId(params){

    location.href = "id.html?" + params.toString();

}


var guide = document.querySelector(".guide_holder");
guide.addEventListener("click", () => {
  if (guide.classList.contains("unfolded")) {
    guide.classList.remove("unfolded");
  } else {
    guide.classList.add("unfolded");
  }
});
