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

const btnShare = document.getElementById("btnShare");

tombol.addEventListener("click", function () {
  jumlahKlik++;

  // putar musik saat klik pertama
  if (jumlahKlik === 1) {
    musik.play();
  }

  // vibrate saat klik - diperpanjang agar lebih terasa
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }

  // Fallback CSS vibration jika API tidak support
  tombol.classList.add("vibrate-btn");
  setTimeout(() => tombol.classList.remove("vibrate-btn"), 200);

  teksCounter.textContent = "Klik: " + jumlahKlik;

  if (jumlahKlik === 5) {
    if (navigator.vibrate) {
      navigator.vibrate([300, 150, 300, 150, 300]);
    }

    // CSS fallback vibration
    document.body.classList.add("vibrate-body");
    setTimeout(() => document.body.classList.remove("vibrate-body"), 800);
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
  btnShare.style.display = "inline-block";

  stream.getTracks().forEach((track) => track.stop());
});

btnShare.addEventListener("click", async function () {
  if (!navigator.share) {
    alert("HP kamu belum support fitur share 😢");
    return;
  }

  const response = await fetch(hasilFoto.src);
  const blob = await response.blob();

  const file = new File([blob], "ucapan.png", { type: "image/png" });

  await navigator.share({
    title: "Ucapan Spesial",
    text: `Terima kasih ya ${nama} 💖`,
    files: [file],
  });
});
