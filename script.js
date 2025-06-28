
// script.js

let currentStep = 0;

const questions = [
  {
    text: "Vrei acest Porsche???",
    image: "pinkporsche.png"
  },
  {
    text: "Vrei aceste Gerbere?",
    image: "gerbere.png"
  },
  {
    text: "Vrei ciocolată?",
    image: "ciocolata.png"
  },
  {
    text: "Yeyeyey you are the best!!You are my favorite!!!MUAH!!",
    image: "cat-heart.gif",
    final: true
  }
];

function handleYes() {
  playSound();
  flashRainbowColors(() => {
    createHearts(15);
    currentStep++;
    if (currentStep < questions.length) {
      loadStep(currentStep);
    }
  });
}

function handleNo() {
  const noButton = document.getElementById('no-button');
  noButton.innerText = 'You sure?';
  const yesButton = document.getElementById('yes-button');
  const currentFontSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
  yesButton.style.fontSize = (currentFontSize * 1.8) + 'px';
}

function flashRainbowColors(callback) {
  const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
  let i = 0;
  const interval = setInterval(() => {
    document.body.style.backgroundColor = colors[i];
    i = (i + 1) % colors.length;
  }, 200);

  setTimeout(() => {
    clearInterval(interval);
    document.body.style.backgroundColor = '#FADADD';
    if (callback) callback();
  }, 2000);
}

function loadStep(step) {
  const question = document.getElementById('question');
  const imageContainer = document.getElementById('image-container');
  const options = document.getElementById('options');
  const yesButton = document.getElementById('yes-button');
  const noButton = document.getElementById('no-button');

  const current = questions[step];
  question.innerText = current.text;

  imageContainer.innerHTML = '';
  if (current.image) {
    const img = new Image();
    img.src = current.image;
    img.alt = 'image';
    img.onload = () => imageContainer.appendChild(img);
  }

  if (current.final) {
    options.style.display = 'none';
  } else {
    options.style.display = 'block';
    yesButton.style.fontSize = '26px';
    noButton.innerText = 'No';
  }
}

function createHearts(count) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerText = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
  }
}

function playSound() {
  const audio = new Audio('cute.mp3'); // Pune tu fișierul în folder și redenumește-l "cute.mp3"
  audio.play();
}

window.onload = () => loadStep(currentStep);
