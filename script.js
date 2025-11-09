// Elementos del DOM
const videoContainer = document.getElementById('video-container');
const introVideo = document.getElementById('intro-video');
const skipButton = document.getElementById('skip-button');
const cardContainer = document.getElementById('card-container');

// Función para mostrar la tarjeta
function showCard() {
    videoContainer.classList.add('fade-out');
    
    setTimeout(() => {
        videoContainer.style.display = 'none';
        cardContainer.classList.remove('hidden');
        document.body.style.overflow = 'auto';
    }, 1000);
}

// Event listener para cuando el video termine
introVideo.addEventListener('ended', showCard);

// Event listener para el botón de saltar
skipButton.addEventListener('click', showCard);

// Event listener para manejar errores del video
introVideo.addEventListener('error', () => {
    console.error('Error al cargar el video');
    showCard();
});

// Detectar si el video se quedó pausado y no puede reproducirse
let autoplayTimeout = setTimeout(() => {
    if (introVideo.paused) {
        console.log('Video no se reprodujo automáticamente, mostrando tarjeta');
        showCard();
    }
}, 1500);

// Limpiar timeout si el video empieza a reproducirse
introVideo.addEventListener('play', () => {
    clearTimeout(autoplayTimeout);
});

// Intentar forzar la reproducción del video
const playPromise = introVideo.play();
if (playPromise !== undefined) {
    playPromise.catch(error => {
        console.log('Autoplay bloqueado, mostrando tarjeta:', error);
        showCard();
    });
}

// Funcionalidad de la tarjeta - Solo toque/click para girar
const card = document.querySelector('.card');
let isFlipped = false;

// Función para girar la tarjeta
function flipCard() {
    if (isFlipped) {
        card.style.transform = 'rotateY(0deg)';
    } else {
        card.style.transform = 'rotateY(180deg)';
    }
    isFlipped = !isFlipped;
}

// Para dispositivos táctiles (móviles y tablets)
card.addEventListener('touchstart', (e) => {
    e.preventDefault();
    flipCard();
});

// Para desktop con click
card.addEventListener('click', flipCard);
