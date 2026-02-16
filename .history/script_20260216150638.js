let jumlahKlik = 0;

const tombol = document.getElementById("btnMulai");
const teksCounter = document.getElementById("counter");
const ucapan = document.getElementById("ucapan");

tombol.addEventListener("click", function () {
  jumlahKlik++;

  navigator.vibrate(100);

  teksCounter.textContent = "Klik: " + jumlahKlik;

  if (jumlahKlik === 5) {
    ucapan.style.display = "block";
    tombol.style.display = "none";
    teksCounter.style.display = "none";
  }
});
