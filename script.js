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

  videoEnhanced.style.display = 'block';
  videoOriginal.style.display = 'none';

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  videoOriginal.addEventListener('play', () => {
    const processFrame = () => {
      if (videoOriginal.paused || videoOriginal.ended) return;

      ctx.drawImage(videoOriginal, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      const input = tf.browser.fromPixels(imageData).toFloat().expandDims(0).div(tf.scalar(255));

      model.executeAsync(input).then((output) => {
        const enhancedImage = output.squeeze
