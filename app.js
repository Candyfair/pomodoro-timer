const ring = document.querySelector('.ring');
const minutes = document.querySelector('.minutes > input[type="text"]');
const seconds = document.querySelector('.seconds > input[type="text"]');
const startButton = document.querySelector('.start');
const settingsButton = document.querySelector('.settings');
const settingsImage = document.getElementById('settings');

let running = false;
let timer = null;
let startTime = 0;
let originalMinutes = 0;
let originalSeconds = 0;
let modify = false;

startButton.addEventListener('click', () => {
  if (!running) {
    startTimer();
  } else {
    pauseTimer();
  }
});

const startTimer = () => {
  // Mettre le timer à true
  running = true;

  // Changer le texte du bouton
  startButton.innerText = 'Pause';

  // Récupérer la date actuelle pour le calcul d'intervalle
  startTime = Date.now();

  // Récupérer les valeurs des inputs min et sec
  const minutesValue = parseInt(minutes.value);
  const secondsValue = parseInt(seconds.value);

  // Récupérer le nombre total de secondes
  const totalSeconds = secondsValue + minutesValue * 60;

  timer = setInterval(() => {
    // Récupérer la date actuelle
    const currentTime = Date.now();

    // Calculer la différence (diff) entre maintenant et le temps de début
    const diff = currentTime - startTime;

    // Calculer le nombre de secondes restantes (secondsLeft)
    const secondsLeft = totalSeconds - Math.floor(diff / 1000);
    const minutesLeft = Math.floor(secondsLeft / 60);

    // Mettre les nouvelles valeurs dans le champ input
    minutes.value = padNumber(minutesLeft);
    seconds.value = padNumber(secondsLeft);

    // Si le timer a fini, appeler la fonction finishTimer
    if (minutesLeft === 0 && secondsLeft <= 0) {
      finishTimer();
    }

  }, 1000);
};

const setOriginalTime = () => {
  originalMinutes = padNumber(parseInt(minutes.value));
  originalSeconds = padNumber(parseInt(seconds.value));
}

const pauseTimer = () => {
  // Changer le statut et le texte du bouton
  running = false;
  startButton.innerText = 'Start';

  // Réinitialiser l'intervalle en cours
  clearInterval(timer);
}

const finishTimer = () => {
  // Changer la couleur de l'anneau
  ring.classList.add('ending');

  // Réinitialiser l'intervalle en cours
  clearInterval(timer);

  setTimeout(() => {
    alert('Time\s up');

    // Lancer la fonction resetTimer
    resetTimer();
  }, 0);
}

const resetTimer = () => {
  // Réinitialiser l'intervalle en cours
  clearInterval(timer);

  // Remettre les valeurs originales
  minutes.value = originalMinutes;
  seconds.value = originalSeconds;

  // Changer le bouton du texte en START
  startButton.innerText = 'Start';

  // Remettre l'anneau à vert
  ring.classList.remove('ending');

  // Dire que le timer ne tourne plus
  running = false;
}

const padNumber = (number) => {
  if (number < 10) {
    number = '0' + number;
  }
  return number;
}

settingsButton.addEventListener('click', () => {
  console.log('Clic sur settings');
  // Si l'app tourne, on  la met en pause
  if (running) {
    pauseTimer();
  }

  if (!modify) {
    modify = true;

    // Annuler le 'disabled' des champs input
    minutes.removeAttribute('disabled');
    seconds.removeAttribute('disabled');
  } else {
    modify = false;

    // Remettre le disabled
    minutes.disabled = true;
    seconds.disabled = true;
  }

  // modifier l'image de l'icône
  toggleImage(settingsImage);
  console.log(modify);
})

const toggleImage = (image) => {
  console.log(image.src);

  if (image.getAttribute('src') == 'images/check.svg') {
    image.setAttribute('src', 'images/gear.svg');
  } else {
    image.setAttribute('src', 'images/check.svg');
  }
}

const disableInputs = () => {
  minutes.disabled = true;
  seconds.disabled = true;
}

setOriginalTime();
resetTimer();