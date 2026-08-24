// --- DOM Elements ---
const menuBtn = document.getElementById("menu-btn");
const exitBtn = document.getElementById("exitBtn"); 
const mobileMenu = document.getElementById("mobile-menu");
const navMobileLinks = document.querySelectorAll(".Sub-Menu-Mobile");

const popUpEvent = document.querySelector(".pop-up-detailEvent");
const popUpDaftar = document.querySelector(".pop-up-detailDaftar");
const closingEventbtn = document.querySelector(".exitEvent");
const closingDaftarbtn = document.querySelector(".exitDaftar");

const openingEventBtn = document.querySelector(".event-details-cta");
const openingDaftarBtn = document.querySelector(".daftar-cta");

// --- Modal Controls ---
if(openingEventBtn) {
    openingEventBtn.addEventListener('click', () => {
        popUpEvent.classList.remove("closingEvent");
        popUpEvent.classList.add("openingEvent");
    });
}

if(closingEventbtn) {
    closingEventbtn.addEventListener('click', () => {
        popUpEvent.classList.remove("openingEvent");
        popUpEvent.classList.add("closingEvent");
    });
}

if(openingDaftarBtn) {
    openingDaftarBtn.addEventListener('click', () => {
        popUpDaftar.classList.remove("closingEvent");
        popUpDaftar.classList.add("openingEvent");
    });
}

if(closingDaftarbtn) {
    closingDaftarbtn.addEventListener('click', () => {
        popUpDaftar.classList.remove("openingEvent");
        popUpDaftar.classList.add("closingEvent");
    });
}

// --- Mobile Navigation Menu ---
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove("hidingMenu"); 
});

exitBtn.addEventListener('click', () => {
    mobileMenu.classList.add("hidingMenu"); 
});

navMobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add("hidingMenu");
    });
});

// --- Form & Google Apps Script Handler ---
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyAv9M1KvqhF0yDUBTYbBicB_vSUfENuxPdYfxEU44vQmiVAIUUkd1Y4H2SSb3GQGUG/exec";

const alertBox = document.getElementById("customAlert");
const alertMsg = document.getElementById("alertMsg");
const closeAlertBtn = document.getElementById("closeAlertBtn");

function showAlert(message) {
    alertMsg.textContent = message;
    alertBox.classList.remove("hide");
    alertBox.classList.add("show");
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        hideAlert();
    }, 4000);
}

function hideAlert() {
    alertBox.classList.remove("show");
    alertBox.classList.add("hide");
}

closeAlertBtn.addEventListener("click", hideAlert);

document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".submit");
    submitBtn.textContent = "Sending...";
    submitBtn.style.opacity = "0.7";
    submitBtn.disabled = true;

    const fullname = document.getElementById("fullname").value;
    const kelas = document.getElementById("kelas").value;

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname: fullname, kelas: kelas }),
        });

        showAlert("Berhasil terdaftar!");
        
        popUpDaftar.classList.remove("openingEvent");
        popUpDaftar.classList.add("closingEvent");
        e.target.reset();
    } catch (err) {
        console.error(err);
        showAlert("Gagal mengirim data.");
    } finally {
        submitBtn.textContent = "Submit";
        submitBtn.style.opacity = "1";
        submitBtn.disabled = false;
    }
});