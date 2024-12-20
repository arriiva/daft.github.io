// Слайдер
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let index = 0;

function showSlide(idx) {
  if (idx >= images.length) index = 0;
  if (idx < 0) index = images.length - 1;
  slides.style.transform = `translateX(${-index * 100}%)`;
}

next.addEventListener('click', () => {
  index++;
  showSlide(index);
});

prev.addEventListener('click', () => {
  index--;
  showSlide(index);
});

setInterval(() => {
  index++;
  showSlide(index);
}, 3000);

// Галерея
const galleryImages = document.querySelectorAll('.gallery-image');
const modal = document.querySelector('.modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');

galleryImages.forEach(image => {
  image.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImage.src = image.src;
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

function updateTime() {
    const timeWidget = document.getElementById('time-widget');
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    timeWidget.textContent = `Текущее время: ${timeString}`;
  }
  
  // Запуск функции обновления времени каждые 1 секунду
  setInterval(updateTime, 1000);
  
  // Обновление времени сразу при загрузке страницы
  updateTime();
  

const captchaText = document.getElementById("captcha");
const captchaInput = document.getElementById("captcha-input");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-message");
const captchaOverlay = document.getElementById("captcha-overlay");
const content = document.getElementById("content");
const refreshCaptchaBtn = document.getElementById("refresh-captcha");

let captchaValue = "";

// Генерация случайной капчи
function generateCaptcha() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

// Установка новой капчи
function setNewCaptcha() {
  captchaValue = generateCaptcha();
  captchaText.textContent = captchaValue;
  captchaInput.value = "";
  submitBtn.disabled = true;
  errorMessage.style.display = "none";
}

// Инициализация капчи
setNewCaptcha();

// Обновление капчи вручную
refreshCaptchaBtn.addEventListener("click", setNewCaptcha);

// Обработка ввода
captchaInput.addEventListener("input", () => {
  submitBtn.disabled = captchaInput.value.trim() === "";
});

// Обработка клика на кнопку
submitBtn.addEventListener("click", () => {
  if (captchaInput.value.trim() === captchaValue) {
      captchaOverlay.style.display = "none";
      content.style.display = "block";
  } else {
      errorMessage.textContent = "Капча введена неверно.";
      errorMessage.style.display = "block";
      setNewCaptcha();
  }
});

// Список песен
const songs = ["media/getlucky.mp3", "media/atw.mp3", "media/omt.mp3"];
let currentSongIndex = 0;

// Элементы плеера
const videoPlayer = document.getElementById("video-player");
const audioPlayer = document.getElementById("audio-player");
const audioSource = document.getElementById("audio-source");
const prevButton = document.getElementById("prev-song");
const nextButton = document.getElementById("next-song");

// Функция переключения песни
function changeSong(index) {
  if (index < 0) {
    currentSongIndex = songs.length - 1; // Переход к последней песне
  } else if (index >= songs.length) {
    currentSongIndex = 0; // Переход к первой песне
  } else {
    currentSongIndex = index;
  }

  // Обновляем источник аудио
  audioSource.src = songs[currentSongIndex];
  audioPlayer.load();
  audioPlayer.play();
}

// Обработчики событий для кнопок
prevButton.addEventListener("click", () => changeSong(currentSongIndex - 1));
nextButton.addEventListener("click", () => changeSong(currentSongIndex + 1));



// Когда видео начинает воспроизводиться
videoPlayer.addEventListener("play", () => {
  if (!audioPlayer.paused) {
    audioPlayer.pause(); // Ставим музыку на паузу
  }
});

// Если видео останавливается, можно снова включить музыку (опционально)
videoPlayer.addEventListener("pause", () => {
  if (audioPlayer.paused) {
    audioPlayer.play(); // Продолжаем музыку (опционально)
  }
});