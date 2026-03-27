// Блок 6 — отправка на почту

const form6 = document.getElementById("form6");

if (form6) {
  form6.addEventListener("submit", function(e){
    e.preventDefault();

    const formData = new FormData();

    const fio = form6.querySelector('[name="fio"]').value;
    const attendance = form6.querySelector('[name="attendance"]:checked')?.value;
    const food = form6.querySelector('[name="food"]:checked')?.value;

    const alcohol = [];
    form6.querySelectorAll('[name="alcohol"]:checked').forEach(el=>{
      alcohol.push(el.value);
    });

    formData.append("ФИО", fio);
    formData.append("Присутствие", attendance);
    formData.append("Еда", food);
    formData.append("Алкоголь", alcohol.join(", "));
    formData.append("_captcha", "false");

    fetch("https://formsubmit.co/ajax/trushnikova.lina97@mail.ru", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(() => {
      form6.reset();
    })
    .catch(err => console.log(err));
  });
}


const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const revealItems = document.querySelectorAll(".reveal");

let musicStarted = false;

/* музыка при первом касании */
function startMusic() {
  if (!musicStarted && bgMusic) {
    bgMusic.play().catch(() => {});
    musicBtn.classList.remove("off");
    musicStarted = true;
  }
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);

/* кнопка музыка */
if (musicBtn && bgMusic) {
  musicBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicBtn.classList.remove("off");
    } else {
      bgMusic.pause();
      musicBtn.classList.add("off");
    }
  });
}

/* плавное появление блоков */
if (revealItems.length) {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.15
  });

  revealItems.forEach(function(item) {
    observer.observe(item);
  });
}
