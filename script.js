const upload = document.getElementById("upload");
const video = document.getElementById("video");

const sharpness = document.getElementById("sharpness");
const contrast = document.getElementById("contrast");
const brightness = document.getElementById("brightness");
const saturate = document.getElementById("saturate");

upload.addEventListener("change", e => {
  const file = e.target.files[0];
  video.src = URL.createObjectURL(file);
});

function updateFilters() {
  video.style.filter = `
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    saturate(${saturate.value}%)
    drop-shadow(0 0 ${sharpness.value / 20}px rgba(255,255,255,0.3))
  `;
}

sharpness.oninput = updateFilters;
contrast.oninput = updateFilters;
brightness.oninput = updateFilters;
saturate.oninput = updateFilters;

updateFilters();
