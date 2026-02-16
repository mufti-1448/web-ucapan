const params = new URLSearchParams(window.location.search);
const nama = params.get("from") || "Seseorang";

let jumlahKlik = 0;

const tombol = document.getElementById("btnMulai");
const teksCounter = document.getElementById("counter");
const ucapan = document.getElementById("ucapan");
const musik = document.getElementById("bgm");
const btnWa = document.getElementById("btnWa");
const namaPengirim = document.getElementById("namaPengirim");
namaPengirim.textContent = nama;

const btnKamera = document.getElementById("btnKamera");
const kameraBox = document.getElementById("kameraBox");
const video = document.getElementById("video");
const btnFoto = document.getElementById("btnFoto");
const canvas = document.getElementById("canvas");
const hasilFoto = document.getElementById("hasilFoto");

let stream;


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
    btnWa.style.display = "inline-block";
    btnKamera.style.display = "inline-block";


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

btnWa.addEventListener("click", function () {
  const pesan = `Terima kasih ya ${nama} 💖 Aku sudah lihat ucapannya dan ini fotoku 😄`;
  const url = "https://wa.me/?text=" + encodeURIComponent(pesan);
  window.location.href = url;
});


btnKamera.addEventListener("click", async function () {
  kameraBox.style.display = "block";

  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" },
    audio: false,
  });

  video.srcObject = stream;
});

btnFoto.addEventListener("click", function () {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const foto = canvas.toDataURL("image/png");
  hasilFoto.src = foto;

  hasilFoto.style.display = "block";
  kameraBox.style.display = "none";

  stream.getTracks().forEach((track) => track.stop());
});

