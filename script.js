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
const info = document.getElementById("info");
const _originalInfoText = info ? info.textContent : "";

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

  // vibrate saat klik - gunakan helper untuk pengecekan dan fallback
  vibrateIfSupported(50);

  // Fallback CSS vibration jika API tidak support
  tombol.classList.add("vibrate-btn");
  setTimeout(() => tombol.classList.remove("vibrate-btn"), 500);

  teksCounter.textContent = "Klik: " + jumlahKlik;

  if (jumlahKlik === 5) {
    // pola getar yang tersusun dari pulsa singkat (lebih kompatibel)
    vibrateIfSupported([80, 40, 80, 40, 80]);

    // CSS fallback vibration
    document.body.classList.add("vibrate-body");
    setTimeout(() => document.body.classList.remove("vibrate-body"), 1000);
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

function canVibrate() {
  return typeof navigator !== "undefined" && "vibrate" in navigator && typeof navigator.vibrate === "function";
}

function vibrateIfSupported(pattern) {
  try {
    if (canVibrate()) {
      const ok = navigator.vibrate(pattern);
      console.log("vibrate invoked", pattern, "returned", ok);
      return true;
    } else {
      showVibrateUnsupported();
      console.warn("Vibration API not supported or available");
      return false;
    }
  } catch (e) {
    console.error("vibrate error", e);
    showVibrateUnsupported();
    return false;
  }
}

function showVibrateUnsupported() {
  if (!info) return;
  info.textContent = "Perangkat/browser Anda tidak mendukung getaran";
  info.classList.add("vibrate-warning");
  setTimeout(() => {
    info.textContent = _originalInfoText;
    info.classList.remove("vibrate-warning");
  }, 3500);
}

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
