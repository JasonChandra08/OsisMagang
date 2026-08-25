// URL SCRIPT GOOGLE SHEETS
// Ganti URL di bawah dengan Web App URL dari Google Apps Script Anda
const scriptURL = 'https://script.google.com/macros/s/AKfycbyAv9M1KvqhF0yDUBTYbBicB_vSUfENuxPdYfxEU44vQmiVAIUUkd1Y4H2SSb3GQGUG/exec';

// FUNGSI MODAL DILETAKKAN DI GLOBAL SCOPE
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('closingEvent');
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('closingEvent');
        document.body.style.overflow = 'auto';
    }
};

// HANDLER SUBMIT FORM DENGAN FORMAT JSON (SESUAI APPS SCRIPT KAMU)
window.handleFormSubmit = function(event) {
    event.preventDefault();
    
    const form = document.forms['google-sheet'];
    const submitBtn = document.getElementById('btnSubmitForm');
    const fullname = document.getElementById('fullname')?.value;
    const kelas = document.getElementById('kelas')?.value;

    if (!fullname || !kelas) return;

    // Tampilan Loading pada Tombol
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim Data...';
    }

    // Mengirim Data ke Google Sheets dalam format JSON
    fetch(scriptURL, { 
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8' // Menggunakan text/plain agar tidak terkena kendala CORS di Apps Script
        },
        body: JSON.stringify({
            fullname: fullname,
            kelas: kelas
        })
    })
    .then(response => response.json())
    .then(data => {
        // Tutup Modal Pendaftaran
        window.closeModal('modalDaftar');

        // Buka Pop-Up Modal Sukses
        const msgText = document.getElementById('successMessageText');
        if (msgText) {
            msgText.innerHTML = `Terima kasih <strong>${fullname}</strong> (${kelas})!<br>Pendaftaran Anda telah berhasil disimpan di sistem. Silakan unduh Surat Izin Orang Tua.`;
        }
        window.openModal('modalSukses');

        // Reset Formulir
        form.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    })
    .finally(() => {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>KIRIM PENDAFTARAN</span>';
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {

    // 1. AUTOPLAY BUGFIX UNTUK BANNER VIDEO
    const bannerVideo = document.getElementById('bannerVideo');
    if (bannerVideo) {
        bannerVideo.muted = true;
        bannerVideo.play().catch(error => {
            console.log("Autoplay tercegah browser, fallback ke muted play:", error);
        });
    }

    // 2. NAVIGASI MOBILE MENU
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('active'));
        });
    }

    // 3. FAQ ACCORDION INTERACTION
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) item.classList.remove('active');
            });
            faqItem.classList.toggle('active');
        });
    });

    // 4. HITUNG MUNDUR EVENT
    const targetDate = new Date('April 9, 2027 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days < 10 ? '0' + days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 5. TUTUP MODAL SAAT KLIK DI LUAR CARD (OVERLAY)
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            event.target.classList.add('closingEvent');
            document.body.style.overflow = 'auto';
        }
    });
});