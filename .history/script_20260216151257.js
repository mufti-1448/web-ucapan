let jumlahKlik = 0;

const tombol = document.getElementById("btnMulai");
const teksCounter = document.getElementById("counter");
const ucapan = document.getElementById("ucapan");
const musik = document.getElementById("bgm");

tombol.addEventListener("click", function () {
  jumlahKlik++;

  // putar musik saat klik pertama
  if (jumlahKlik === 1) {
    musik.play();
  }

  // vibrate saat klik
  navigator.vibrate(100);

  teksCounter.textContent = "Klik: " + jumlahKlik;

  if (jumlahKlik === 5) {
    navigator.vibrate([200, 100, 200]);
    ucapan.style.display = "block";
    tombol.style.display = "none";
    teksCounter.style.display = "none";

    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.textContent = "🎉";
      confetti.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 2000);
    }

  }
});
