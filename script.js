let model;

// Charger le modèle IA
function loadModel() {
  tf.loadGraphModel('https://example.com/path/to/model/model.json').then((loadedModel) => {
    model = loadedModel;
  });
}

// Améliorer la vidéo avec les réglages
function enhanceVideo() {
  const videoOriginal = document.getElementById('video-original');
  const videoEnhanced = document.getElementById('video-enhanced');

  if (!model) {
    alert("Le modèle n'est pas encore chargé. Veuillez patienter.");
    return;
  }

  videoOriginal.style.display = 'none';
  videoEnhanced.style.display = 'block';

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  videoOriginal.addEventListener('play', () => {
    const processFrame = () => {
      if (videoOriginal.paused || videoOriginal.ended) return;

      ctx.drawImage(videoOriginal, 0, 0, canvas.width, canvas.height);
      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Ajustements selon les réglages utilisateur
      const sharpness = document.getElementById('sharpness').value / 100;
      const contrast = document.getElementById('contrast').value / 100;
      const brightness = document.getElementById('brightness').value / 100;
      const saturation = document.getElementById('saturate').value / 100;

      // Appliquer les réglages de contraste, luminosité et saturation
      for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = imageData.data[i] * contrast * brightness; // Rouge
        imageData.data[i + 1] = imageData.data[i + 1] * contrast * brightness; // Vert
        imageData.data[i + 2] = imageData.data[i + 2] * contrast * brightness; // Bleu

        // Appliquer la saturation
        const gray = 0.3 * imageData.data[i] + 0.59 * imageData.data[i + 1] + 0.11 * imageData.data[i + 2];
        imageData.data[i] = gray + (imageData.data[i] - gray) * saturation;
        imageData.data[i + 1] = gray + (imageData.data[i + 1] - gray) * saturation;
        imageData.data[i + 2] = gray + (imageData.data[i + 2] - gray) * saturation;
      }

      // Mettre à jour l'image
      ctx.putImageData(imageData, 0, 0);
      videoEnhanced.src = canvas.toDataURL();
    };

    videoOriginal.play();
    videoOriginal.addEventListener('timeupdate', processFrame);
  });
}

// Événements pour les boutons
document.getElementById('processButton').addEventListener('click', () => {
  enhanceVideo();
  document.getElementById('toggleComparison').style.display = 'block';
});

document.getElementById('toggleComparison').addEventListener('click', () => {
  const videoOriginal = document.getElementById('video-original');
  const videoEnhanced = document.getElementById('video-enhanced');

  if (videoEnhanced.style.display === 'none') {
    videoEnhanced.style.display = 'block';
    videoOriginal.style.display = 'none';
  } else {
    videoEnhanced.style.display = 'none';
    videoOriginal.style.display = 'block';
  }
});

// Charger le modèle au démarrage
loadModel();
// Gérer les pré-réglages
document.querySelectorAll('.preset').forEach(button => {
  button.addEventListener('click', (event) => {
    const sharpness = event.target.dataset.sharpness;
    const contrast = event.target.dataset.contrast;
    const brightness = event.target.dataset.brightness;
    const saturation = event.target.dataset.saturation;

    document.getElementById('sharpness').value = sharpness;
    document.getElementById('contrast').value = contrast;
    document.getElementById('brightness').value = brightness;
    document.getElementById('saturate').value = saturation;
  });
});

// Corriger l'importation de fichier
