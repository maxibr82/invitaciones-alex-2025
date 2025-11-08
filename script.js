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
    }, 1000); // Aumentado a 1 segundo para coincidir con la animación CSS
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

// Intentar reproducir el video con audio después de la interacción del usuario
let firstInteraction = true;
document.addEventListener('click', () => {
    if (firstInteraction && introVideo.paused) {
        introVideo.muted = false;
        introVideo.play().catch(e => {
            console.log('No se pudo reproducir con audio:', e);
        });
        firstInteraction = false;
    }
}, { once: true });

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
