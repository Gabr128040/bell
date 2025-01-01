// Lógica para o carrossel de imagens
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
let index = 0;

document.getElementById('next').addEventListener('click', () => {
  index = (index + 1) % images.length;
  slides.style.transform = `translateX(${-index * 100}%)`;
});

document.getElementById('prev').addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  slides.style.transform = `translateX(${-index * 100}%)`;
});

// Lógica para o contador
const startDate = new Date('2024-06-27T00:00:00'); // Data do relacionamento
setInterval(() => {
  const now = new Date();
  const diff = now - startDate;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('years').textContent = years.toString().padStart(2, '0');
  document.getElementById('months').textContent = months.toString().padStart(2, '0');
  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}, 1000);

// Selecionando os elementos
const progressBar = document.getElementById("progress-bar-modern");
const currentTimeElem = document.getElementById("current-time");
const totalDurationElem = document.getElementById("total-duration");

// Função Play/Pause
const playPauseBtn = document.getElementById("play-pause-btn");
const playPauseIcon = document.getElementById("play-pause-icon");
const audio = document.getElementById("audio-modern");

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseIcon.textContent = "pause"; // Altera para o ícone de pausa
  } else {
    audio.pause();
    playPauseIcon.textContent = "play_arrow"; // Altera para o ícone de play
  }
});

// Opcional: Atualizar o ícone automaticamente se o áudio terminar
audio.addEventListener("ended", () => {
  playPauseIcon.textContent = "play_arrow";
});

// Atualizando a barra de progresso
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;

  // Atualiza os tempos
  const currentTime = formatTime(audio.currentTime);
  const totalDuration = formatTime(audio.duration);
  currentTimeElem.textContent = currentTime;
  totalDurationElem.textContent = totalDuration || "0:00";
});

// Permite ao usuário ajustar o progresso
progressBar.addEventListener("input", () => {
  const newTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

// Formata o tempo para mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
