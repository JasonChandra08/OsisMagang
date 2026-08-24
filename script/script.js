const menuBtn = document.getElementById("menu-btn");
const exitBtn = document.getElementById("exitBtn"); 
const mobileMenu = document.getElementById("mobile-menu");
const navMobile1 = document.querySelector(".Sub-Menu-Mobile1")
const navMobile2 = document.querySelector(".Sub-Menu-Mobile2")
const navMobile3 = document.querySelector(".Sub-Menu-Mobile3")
const popUpEvent = document.querySelector(".pop-up-detailEvent")
const closingEventbtn = document.querySelector(".exitEvent")
const openingEventBtn = document.querySelector(".event-details-cta")

closingEventbtn.addEventListener('click', () => {
    popUpEvent.classList.add("closingEvent")
    popUpEvent.classList.remove("openingEvent")
})
openingEventBtn.addEventListener('click', () => {
    popUpEvent.classList.remove("closingEvent");
    popUpEvent.classList.add("openingEvent");
})


menuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove("hidingMenu"); 
});

exitBtn.addEventListener('click', () => {
    mobileMenu.classList.add("hidingMenu"); 
});

navMobile1.addEventListener('click', () => {
    mobileMenu.classList.remove("hidingMenu"); 
});

navMobile1.addEventListener('click', () => {
    mobileMenu.classList.add("hidingMenu"); 
});
navMobile2.addEventListener('click', () => {
    mobileMenu.classList.remove("hidingMenu"); 
});

navMobile2.addEventListener('click', () => {
    mobileMenu.classList.add("hidingMenu"); 
});
navMobile3.addEventListener('click', () => {
    mobileMenu.classList.remove("hidingMenu"); 
});

navMobile3.addEventListener('click', () => {
    mobileMenu.classList.add("hidingMenu"); 
});



const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyAv9M1KvqhF0yDUBTYbBicB_vSUfENuxPdYfxEU44vQmiVAIUUkd1Y4H2SSb3GQGUG/exec";

      const alertBox = document.getElementById("customAlert");
      const alertMsg = document.getElementById("alertMsg");
      const closeAlertBtn = document.getElementById("closeAlertBtn");

      function showAlert(message) {
        alertMsg.textContent = message;
        alertBox.classList.remove("hide");
        alertBox.classList.add("show");
      }

      function hideAlert() {
        alertBox.classList.remove("show");
        alertBox.classList.add("hide");
      }

      closeAlertBtn.addEventListener("click", hideAlert);

      document
        .getElementById("registerForm")
        .addEventListener("submit", async function (e) {
          e.preventDefault();

          const fullname = document.getElementById("fullname").value;
          const kelas = document.getElementById("kelas").value;

          try {
            await fetch(SCRIPT_URL, {
              method: "POST",
              mode: "no-cors", // penting karena Apps Script tidak set CORS header
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ fullname: fullname, kelas: kelas }),
            });

            showAlert("Berhasil terdaftar!");
            e.target.reset();
          } catch (err) {
            console.error(err);
            showAlert("Gagal mengirim data.");
          }
        });