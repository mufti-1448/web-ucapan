const tombol = document.getElementById("btnMulai");

tombol.addEventListener("click", function () {
  alert("Selamat datang di Website Ucapanku 💖");
  navigator.vibrate([100, 50, 100]);
});
